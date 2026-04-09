import React, { useState, useEffect } from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="flex justify-between items-center mb-8 animate-slide-up">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-medicore-primary" />
        </div>
        <input
          type="text"
          placeholder="Search patients, appointments..."
          className="w-full glass-card pl-12 pr-4 py-3 outline-none focus:border-medicore-primary/50 focus:shadow-[0_0_20px_rgba(47,158,143,0.15)] text-text-primary placeholder:text-text-secondary bg-[var(--card)]"
        />
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full glass-card text-text-secondary hover:text-medicore-primary transition-colors flex items-center justify-center w-10 h-10"
          title="Toggle Dark Mode"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="relative p-2 rounded-full glass-card text-text-secondary hover:text-medicore-primary transition-colors flex items-center justify-center w-10 h-10">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-400 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer group glass-card p-1.5 pr-4">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop" 
            alt="Dr. Sarah" 
            className="w-10 h-10 rounded-full object-cover shadow-sm border border-white/50 group-hover:border-medicore-primary/50 transition-colors"
          />
          <div className="hidden md:block">
            <p className="text-sm font-bold text-text-primary">Dr. Sarah L.</p>
            <p className="text-xs text-text-secondary font-medium">Head Physician</p>
          </div>
        </div>
      </div>
    </header>
  );
}
