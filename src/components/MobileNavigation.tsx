
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileNavigationProps {
  navItems: Array<{ name: string; href: string }>;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const MobileNavigation = ({ navItems, isMenuOpen, setIsMenuOpen }: MobileNavigationProps) => {
  const isMobile = useIsMobile();
  
  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen, setIsMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleItemClick = () => {
    setIsMenuOpen(false);
  };

  if (!isMobile) return null;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-3 text-foreground hover:text-purple-400 transition-colors duration-300 touch-manipulation active:scale-95"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 glass-premium border-l border-purple-500/20 transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-premium rounded-lg flex items-center justify-center neon-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient font-inter">AIGenerate</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-foreground/60 hover:text-purple-400 transition-colors touch-manipulation active:scale-95"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-6 space-y-2">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className="block p-4 text-foreground/80 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-200 touch-manipulation active:scale-98 font-inter text-lg"
              onClick={handleItemClick}
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
        </nav>

        {/* Mobile CTA Buttons */}
        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <Button 
            variant="outline" 
            className="w-full glass border-purple-500/30 font-inter text-lg py-4 touch-manipulation active:scale-98"
            onClick={handleItemClick}
          >
            Sign In
          </Button>
          <Button 
            className="w-full bg-gradient-premium text-white neon-glow font-inter text-lg py-4 touch-manipulation active:scale-98"
            onClick={handleItemClick}
          >
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
