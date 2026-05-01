import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  Home, Users, Calendar, Activity, Settings, TrendingUp, Heart, 
  MessageSquare, CreditCard, ShieldCheck, HardDrive, HelpCircle, Shield
} from 'lucide-react';

import ProCard from './ProCard';

const navSections = [
  {
    title: 'Menu',
    items: [
      { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: Home },
      { id: 'patients', path: '/patients', label: 'Patients', icon: Users },
      { id: 'schedule', path: '/schedule', label: 'Schedule', icon: Calendar },
      { id: 'messages', path: '/messages', label: 'Messages', icon: MessageSquare, badge: 4 },
    ]
  },
  {
    title: 'Management',
    items: [
      { id: 'analytics', path: '/analytics', label: 'Analytics', icon: TrendingUp },
      { id: 'records', path: '/records', label: 'Medical Cloud', icon: HardDrive },
      { id: 'billing', path: '/billing', label: 'Billing', icon: CreditCard },
      { id: 'staff', path: '/staff', label: 'Staff Team', icon: ShieldCheck },
    ]
  },
  {
    title: 'System',
    items: [
      { id: 'activity', path: '/activity', label: 'Activity Log', icon: Activity },
      { id: 'admin', path: '/admin', label: 'Admin Panel', icon: Shield },
      { id: 'settings', path: '/settings', label: 'Settings', icon: Settings },
      { id: 'support', path: '/support', label: 'Support', icon: HelpCircle },
    ]
  }
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
      <nav className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-1">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="text-[10px] uppercase font-bold text-white/40 dark:text-text-secondary/50 tracking-[2px] mb-4 px-4">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    to={item.path}
                    key={item.id}
                    className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 relative group ${
                      isActive 
                        ? 'bg-medicore-primary/80 dark:bg-medicore-primary-hover shadow-[0_0_20px_rgba(47,158,143,0.3)] dark:shadow-none text-white dark:text-[#3DB6A3]' 
                        : 'hover:bg-white/10 dark:hover:bg-medicore-primary/5 text-white/60 dark:text-text-secondary hover:text-white dark:hover:text-text-primary'
                    }`}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? 'text-white dark:text-[#3DB6A3]' : 'text-white/60 dark:text-text-secondary group-hover:text-white dark:group-hover:text-text-primary'}`} />
                        <span className={`text-sm font-medium transition-colors ${isActive ? 'text-white dark:text-[#3DB6A3]' : 'text-white/60 dark:text-text-secondary group-hover:text-white dark:group-hover:text-text-primary'}`}>
                          {item.label}
                        </span>
                        
                        {item.badge && (
                          <span className="ml-auto bg-medicore-primary dark:bg-[#3DB6A3] text-white dark:text-medicore-bg text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                            {item.badge}
                          </span>
                        )}

                        {isActive && (
                           <motion.div 
                             layoutId="active-navIndicator" 
                             className="absolute left-0 w-1 h-6 bg-white dark:bg-[#3DB6A3] rounded-r-full"
                             initial={false}
                             transition={{ type: "spring", stiffness: 300, damping: 30 }}
                           />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom CTA Card */}
      <div className="mt-auto">
        <ProCard />
      </div>
    </div>
  );
}
