import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Home, Users, Calendar, Activity, Settings, TrendingUp, Heart } from 'lucide-react';
import ProCard from './ProCard';

const navItems = [
  { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: Home },
  { id: 'patients', path: '/patients', label: 'Patients', icon: Users },
  { id: 'schedule', path: '/schedule', label: 'Schedule', icon: Calendar },
  { id: 'analytics', path: '/analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'activity', path: '/activity', label: 'Activity', icon: Activity },
  { id: 'settings', path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 p-6 hidden lg:flex flex-col transition-colors duration-500 bg-gradient-to-b from-[#3DB6A3] to-[#1F7A6B] dark:from-[#132724] dark:to-[#0F1E1B] text-white">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-10 mt-2">
        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
          <Heart className="w-6 h-6 text-white fill-white/20" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white dark:text-text-primary">MediCore</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              to={item.path}
              key={item.id}
              className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 relative group ${
                isActive 
                  ? 'bg-medicore-primary/80 dark:bg-medicore-primary-hover shadow-[0_0_20px_rgba(47,158,143,0.5)] dark:shadow-none text-white dark:text-[#3DB6A3]' 
                  : 'hover:bg-white/10 dark:hover:bg-medicore-primary/10 text-white/70 dark:text-text-secondary hover:text-white dark:hover:text-text-primary dark:hover:shadow-[0_0_25px_rgba(47,158,143,0.35)]'
              }`}
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white dark:text-[#3DB6A3]' : 'text-white/70 dark:text-text-secondary group-hover:text-white dark:group-hover:text-text-primary'}`} />
                  <span className={`font-medium transition-colors ${isActive ? 'text-white dark:text-[#3DB6A3]' : 'text-white/70 dark:text-text-secondary group-hover:text-white dark:group-hover:text-text-primary'}`}>
                    {item.label}
                  </span>
                  
                  {isActive && (
                     <motion.div 
                       layoutId="active-navIndicator" 
                       className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                       initial={false}
                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
                     />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom CTA Card */}
      <div className="mt-auto">
        <ProCard />
      </div>
    </div>
  );
}
