import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './Button';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      size="small"
      onClick={toggleTheme}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
};