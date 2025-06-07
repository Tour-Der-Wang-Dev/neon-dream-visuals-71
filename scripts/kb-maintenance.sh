
#!/bin/bash

# Knowledge Base Maintenance Script
# Automates common maintenance tasks for the knowledge base

set -e

# Configuration
KB_DIR="docs"
BACKUP_DIR="docs/archive/backups"
LOG_FILE="docs/maintenance.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
    echo -e "$1"
}

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Function to check for broken links
check_links() {
    log "${YELLOW}Checking for broken links...${NC}"
    
    if command -v markdown-link-check >/dev/null 2>&1; then
        find "$KB_DIR" -name "*.md" -exec markdown-link-check {} \; | tee -a "$LOG_FILE"
        log "${GREEN}Link check completed${NC}"
    else
        log "${RED}markdown-link-check not installed. Run: npm install -g markdown-link-check${NC}"
    fi
}

# Function to update last-modified dates
update_dates() {
    log "${YELLOW}Updating last-modified dates...${NC}"
    
    find "$KB_DIR" -name "*.md" -type f | while read -r file; do
        # Check if file has been modified in git
        if git diff --name-only HEAD~1 2>/dev/null | grep -q "$file"; then
            # Update the modified date in YAML frontmatter
            sed -i "s/^modified: .*/modified: \"$(date '+%Y-%m-%d')\"/" "$file"
            log "Updated modified date for $file"
        fi
    done
    
    log "${GREEN}Date updates completed${NC}"
}

# Function to generate documentation index
generate_index() {
    log "${YELLOW}Generating documentation index...${NC}"
    
    # Create temporary index file
    temp_index=$(mktemp)
    
    echo "# Generated Documentation Index" > "$temp_index"
    echo "" >> "$temp_index"
    echo "Generated on: $(date)" >> "$temp_index"
    echo "" >> "$temp_index"
    
    # List all KB files with their metadata
    find "$KB_DIR" -name "KB_*.md" | sort | while read -r file; do
        title=$(grep "^title:" "$file" | cut -d'"' -f2 2>/dev/null || echo "No title")
        category=$(grep "^category:" "$file" | cut -d'"' -f2 2>/dev/null || echo "uncategorized")
        
        echo "- [$title]($file) (Category: $category)" >> "$temp_index"
    done
    
    mv "$temp_index" "$KB_DIR/generated_index.md"
    log "${GREEN}Documentation index generated${NC}"
}

# Function to validate YAML frontmatter
validate_frontmatter() {
    log "${YELLOW}Validating YAML frontmatter...${NC}"
    
    required_fields=("title" "author" "created" "modified" "version" "status" "tags" "category" "audience")
    
    find "$KB_DIR" -name "KB_*.md" | while read -r file; do
        log "Checking $file..."
        
        # Extract YAML frontmatter
        if ! grep -q "^---$" "$file"; then
            log "${RED}Missing YAML frontmatter in $file${NC}"
            continue
        fi
        
        for field in "${required_fields[@]}"; do
            if ! grep -q "^$field:" "$file"; then
                log "${RED}Missing required field '$field' in $file${NC}"
            fi
        done
    done
    
    log "${GREEN}Frontmatter validation completed${NC}"
}

# Function to backup knowledge base
backup_kb() {
    log "${YELLOW}Creating knowledge base backup...${NC}"
    
    backup_name="kb_backup_$(date '+%Y%m%d_%H%M%S').tar.gz"
    tar -czf "$BACKUP_DIR/$backup_name" "$KB_DIR"/*.md
    
    log "${GREEN}Backup created: $backup_name${NC}"
    
    # Keep only last 10 backups
    cd "$BACKUP_DIR" && ls -t kb_backup_*.tar.gz | tail -n +11 | xargs -r rm
    log "Cleaned up old backups"
}

# Function to lint markdown files
lint_markdown() {
    log "${YELLOW}Linting markdown files...${NC}"
    
    if command -v markdownlint >/dev/null 2>&1; then
        markdownlint "$KB_DIR"/*.md | tee -a "$LOG_FILE"
        log "${GREEN}Markdown linting completed${NC}"
    else
        log "${RED}markdownlint not installed. Run: npm install -g markdownlint-cli${NC}"
    fi
}

# Function to check for outdated content
check_outdated() {
    log "${YELLOW}Checking for outdated content...${NC}"
    
    # Find files older than 90 days
    find "$KB_DIR" -name "KB_*.md" -type f | while read -r file; do
        modified_date=$(grep "^modified:" "$file" | cut -d'"' -f2 2>/dev/null)
        if [ -n "$modified_date" ]; then
            # Calculate days since last modification
            days_old=$(( ($(date +%s) - $(date -d "$modified_date" +%s)) / 86400 ))
            if [ "$days_old" -gt 90 ]; then
                log "${YELLOW}Warning: $file is $days_old days old${NC}"
            fi
        fi
    done
    
    log "${GREEN}Outdated content check completed${NC}"
}

# Main execution
main() {
    log "${GREEN}Starting knowledge base maintenance...${NC}"
    
    case "${1:-all}" in
        "links")
            check_links
            ;;
        "dates")
            update_dates
            ;;
        "index")
            generate_index
            ;;
        "validate")
            validate_frontmatter
            ;;
        "backup")
            backup_kb
            ;;
        "lint")
            lint_markdown
            ;;
        "outdated")
            check_outdated
            ;;
        "all")
            backup_kb
            validate_frontmatter
            check_links
            update_dates
            generate_index
            lint_markdown
            check_outdated
            ;;
        *)
            echo "Usage: $0 {links|dates|index|validate|backup|lint|outdated|all}"
            echo "  links    - Check for broken links"
            echo "  dates    - Update last-modified dates"
            echo "  index    - Generate documentation index"
            echo "  validate - Validate YAML frontmatter"
            echo "  backup   - Create knowledge base backup"
            echo "  lint     - Lint markdown files"
            echo "  outdated - Check for outdated content"
            echo "  all      - Run all maintenance tasks"
            exit 1
            ;;
    esac
    
    log "${GREEN}Knowledge base maintenance completed${NC}"
}

# Run main function with all arguments
main "$@"
