
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full hover:bg-transparent hover:text-gatherly-neon"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-gatherly-white" />
      ) : (
        <Moon className="h-5 w-5 text-gatherly-purple" />
      )}
    </Button>
  );
};

export default ThemeToggle;
