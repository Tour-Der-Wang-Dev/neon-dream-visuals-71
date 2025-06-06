
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileNavigation from '@/components/MobileNavigation';
import SearchBar from '@/components/SearchBar';
import UserAccountDropdown from '@/components/UserAccountDropdown';
import NotificationBell from '@/components/NotificationBell';
import ThemeToggle from '@/components/ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-premium border-b border-purple-500/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with enhanced animation */}
          <div className="flex items-center space-x-2 fade-in-up">
            <div className="w-8 h-8 bg-gradient-premium rounded-lg flex items-center justify-center neon-glow floating-element">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient font-inter animate-gradient">
              AIGenerate
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 fade-in-up-delay">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-all duration-300 hover:text-purple-400 relative group font-medium font-inter"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Action Items */}
          <div className="hidden md:flex items-center space-x-2 fade-in-up-delay">
            <SearchBar />
            <NotificationBell />
            <ThemeToggle />
            <UserAccountDropdown />
            <Button 
              variant="outline" 
              className="glass border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 font-inter ml-2"
            >
              Sign In
            </Button>
            <Button className="bg-gradient-premium hover:opacity-90 text-white font-medium neon-glow transition-all duration-300 font-inter">
              Get Started
            </Button>
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation
            navItems={navItems}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
