
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          {/* Logo */}
          <div className="flex items-center space-x-2 fade-in-up">
            <div className="w-8 h-8 bg-gradient-premium rounded-lg flex items-center justify-center neon-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient font-inter">AIGenerate</span>
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

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4 fade-in-up-delay">
            <Button variant="outline" className="glass border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 font-inter">
              Sign In
            </Button>
            <Button className="bg-gradient-premium hover:opacity-90 text-white font-medium neon-glow transition-all duration-300 font-inter">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-purple-400 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 glass-premium rounded-lg mt-2 border border-purple-500/20">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-foreground/80 hover:text-purple-400 transition-colors duration-200 py-2 px-4 font-inter"
                onClick={() => setIsMenuOpen(false)}
                style={{ 
                  animation: `fadeInUp 0.3s ease-out forwards`,
                  animationDelay: `${0.1 * index}s`,
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-2 px-4">
              <Button variant="outline" className="w-full glass border-purple-500/30 font-inter">
                Sign In
              </Button>
              <Button className="w-full bg-gradient-premium text-white neon-glow font-inter">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
