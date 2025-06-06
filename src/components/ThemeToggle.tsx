
import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // In a real app, you'd update the theme context/localStorage here
    document.documentElement.classList.toggle('light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="glass border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
    >
      {isDark ? (
        <Sun className="w-5 h-5 transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300 rotate-90 scale-0" />
      )}
    </Button>
  );
};

export default ThemeToggle;
