
# Development Tools & Scripts Guide

## Table of Contents
- [Build Scripts](#build-scripts)
- [Development Tools](#development-tools)
- [Testing Utilities](#testing-utilities)
- [Deployment Scripts](#deployment-scripts)
- [Maintenance Commands](#maintenance-commands)
- [Troubleshooting](#troubleshooting)

## Build Scripts

### `npm run build`
**Purpose**: Creates optimized production build

**Syntax**: 
```bash
npm run build
```

**Process**:
1. TypeScript compilation and type checking
2. Vite build optimization with tree shaking
3. Tailwind CSS purging and minification
4. Asset optimization and compression
5. Bundle splitting and code splitting
6. Source map generation

**Output Location**: `dist/`

**Expected Outcome**:
- Bundle size < 500KB gzipped
- All assets optimized and compressed
- Source maps for debugging
- Build time < 60 seconds

**Common Issues**:
```bash
# TypeScript errors
npm run build -- --mode development  # Skip type checking

# Memory issues
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Clear cache if build fails
rm -rf node_modules/.vite && npm run build
```

### `npm run preview`
**Purpose**: Preview production build locally

**Syntax**:
```bash
npm run preview [-- --port 4173]
```

**Prerequisites**: Must run `npm run build` first

**Expected Outcome**: Local server running production build at http://localhost:4173

**Performance Considerations**: Uses production optimizations, perfect for final testing

## Development Tools

### `npm run dev`
**Purpose**: Start development server with hot module replacement

**Syntax**:
```bash
npm run dev [-- --port 8080] [-- --host 0.0.0.0]
```

**Features**:
- Hot Module Replacement (HMR)
- TypeScript compilation
- Tailwind CSS compilation
- Error overlay
- Fast refresh for React components

**Environmental Prerequisites**:
- Node.js 18+
- Available port (default: 8080)
- Write permissions in project directory

**Expected Outcome**:
- Development server at http://localhost:8080
- Automatic browser refresh on changes
- TypeScript error reporting in terminal
- Build time < 5 seconds for initial start

**Performance Optimization**:
```bash
# Enable faster builds
VITE_LEGACY_BUILD=false npm run dev

# Reduce memory usage
NODE_OPTIONS="--max-old-space-size=2048" npm run dev
```

### `npm run type-check`
**Purpose**: Run TypeScript compiler without emitting files

**Syntax**:
```bash
npm run type-check [-- --watch]
```

**Expected Outcome**: Type safety verification without build artifacts

**Common Errors**:
- Missing type definitions: Install `@types/*` packages
- Strict mode violations: Update code or adjust `tsconfig.json`
- Import path errors: Verify file paths and extensions

### `npm run lint`
**Purpose**: Code quality and consistency checking

**Syntax**:
```bash
npm run lint [-- --fix] [-- --cache]
```

**Checks**:
- ESLint rules compliance
- TypeScript style guidelines
- React best practices
- Import/export organization
- Unused variables and imports

**Auto-fix Options**:
```bash
npm run lint -- --fix  # Fix automatically fixable issues
npm run lint -- --cache  # Use cache for faster subsequent runs
```

## Testing Utilities

### `npm run test`
**Purpose**: Run unit and integration tests

**Syntax**:
```bash
npm run test [-- --coverage] [-- --watch]
```

**Test Categories**:
- Unit tests: Individual component testing
- Integration tests: Component interaction testing
- Snapshot tests: UI regression prevention
- Accessibility tests: WCAG compliance verification

**Coverage Requirements**:
- Functions: > 80%
- Statements: > 85%
- Branches: > 75%
- Lines: > 85%

**Watch Mode**:
```bash
npm run test -- --watch  # Auto-run tests on file changes
npm run test -- --watchAll  # Watch all files, not just tracked
```

### `npm run test:e2e`
**Purpose**: End-to-end testing with real browser automation

**Syntax**:
```bash
npm run test:e2e [-- --headed] [-- --browser=chrome]
```

**Prerequisites**:
- Development server running (`npm run dev`)
- Browser dependencies installed
- Test environment configured

**Test Scenarios**:
- User registration and authentication
- Image generation workflow
- Gallery management features
- Payment processing (sandbox)
- Mobile responsive behavior

**Browser Options**:
```bash
npm run test:e2e -- --browser=chrome    # Chrome testing
npm run test:e2e -- --browser=firefox   # Firefox testing
npm run test:e2e -- --browser=safari    # Safari testing (macOS only)
```

### `npm run test:coverage`
**Purpose**: Generate comprehensive test coverage report

**Syntax**:
```bash
npm run test:coverage [-- --reporter=html]
```

**Output**: `coverage/` directory with detailed HTML report

**Expected Metrics**:
- Overall coverage > 80%
- Critical path coverage > 95%
- Component coverage > 85%
- Utility function coverage > 90%

## Deployment Scripts

### `npm run deploy:staging`
**Purpose**: Deploy to staging environment

**Syntax**:
```bash
npm run deploy:staging
```

**Process**:
1. Run full test suite
2. Build production bundle
3. Upload to staging CDN
4. Update staging environment variables
5. Run smoke tests
6. Notify team of deployment

**Prerequisites**:
- Staging credentials configured
- All tests passing
- Clean git working directory

**Rollback Command**:
```bash
npm run deploy:staging -- --rollback
```

### `npm run deploy:production`
**Purpose**: Deploy to production environment

**Syntax**:
```bash
npm run deploy:production [-- --dry-run]
```

**Safety Checks**:
- Staging deployment successful
- Performance benchmarks met
- Security scan passed
- Manual QA approval
- Database migrations ready

**Dry Run**:
```bash
npm run deploy:production -- --dry-run  # Simulate deployment
```

**Monitoring Post-Deployment**:
- Automated health checks
- Performance metric collection
- Error rate monitoring
- User experience tracking

## Maintenance Commands

### `npm run clean`
**Purpose**: Clean build artifacts and temporary files

**Syntax**:
```bash
npm run clean [-- --deep]
```

**Removes**:
- `dist/` directory
- `node_modules/.cache/`
- TypeScript build cache
- Test coverage reports
- Log files

**Deep Clean**:
```bash
npm run clean -- --deep  # Also removes node_modules
```

### `npm run update-deps`
**Purpose**: Update project dependencies safely

**Syntax**:
```bash
npm run update-deps [-- --major]
```

**Process**:
1. Check for outdated packages
2. Update minor and patch versions
3. Run test suite
4. Generate update report
5. Create git commit with changes

**Major Updates**:
```bash
npm run update-deps -- --major  # Include major version updates
```

### `npm run analyze-bundle`
**Purpose**: Analyze bundle size and composition

**Syntax**:
```bash
npm run analyze-bundle
```

**Output**:
- Interactive bundle analyzer
- Size comparison reports
- Dependency tree visualization
- Optimization recommendations

**Performance Targets**:
- Initial bundle < 300KB
- Vendor bundle < 200KB
- Code splitting efficiency > 80%
- Unused code < 5%

## Troubleshooting

### Common Script Failures

#### Build Failures
```bash
# Clear all caches
npm run clean && npm install

# Check TypeScript configuration
npm run type-check

# Verify dependencies
npm ls --depth=0
```

#### Test Failures
```bash
# Update snapshots
npm run test -- --updateSnapshot

# Clear test cache
npm run test -- --clearCache

# Run specific test
npm run test -- ComponentName.test.tsx
```

#### Development Server Issues
```bash
# Port conflict resolution
lsof -ti:8080 | xargs kill -9

# Network interface issues
npm run dev -- --host 0.0.0.0

# Memory issues
NODE_OPTIONS="--max-old-space-size=4096" npm run dev
```

### Performance Optimization

#### Faster Builds
```bash
# Enable experimental features
VITE_EXPERIMENTAL_FEATURES=true npm run build

# Parallel processing
npm run build -- --parallel

# Skip unnecessary checks in development
SKIP_TYPE_CHECK=true npm run dev
```

#### Memory Management
```bash
# Monitor memory usage
NODE_ENV=development node --trace-gc --max-old-space-size=4096

# Optimize for CI environments
CI=true npm run build
```

### Debugging Commands

#### Verbose Output
```bash
# Detailed build information
DEBUG=vite:* npm run build

# TypeScript compiler details
npm run type-check -- --verbose

# Test debugging
npm run test -- --verbose --no-cache
```

#### Profiling
```bash
# Build performance profiling
npm run build -- --profile

# Bundle analysis
npm run analyze-bundle -- --mode production
```

---

*Last Updated: December 2024 | Version: 1.0.0 | Review Cycle: Monthly*
