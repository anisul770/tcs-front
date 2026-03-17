import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  // Initialize state from localStorage or default to 'dark'
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark'
  );

  // Update the <html> tag whenever the theme state changes
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <label className="btn btn-ghost btn-circle swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input 
        type="checkbox" 
        onChange={toggleTheme} 
        checked={theme === 'dark'} 
      />
      
      {/* sun icon */}
      <Sun className="swap-on text-yellow-400 fill-current" size={24} />
      
      {/* moon icon */}
      <Moon className="swap-off text-primary" size={24} />
    </label>
  );
};

export default ThemeToggle;