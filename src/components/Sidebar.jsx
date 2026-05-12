import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, Users, Calendar, Activity, Settings, TrendingUp, Heart, 
  MessageSquare, CreditCard, ShieldCheck, HardDrive, HelpCircle, Shield,
  ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { useUI } from '../context/UIContext';
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
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, toggleCollapse } = useUI();
  const location = useLocation();

  const sidebarVariants = {
    open: { x: 0, width: '280px' },
    closed: { x: '-100%', width: '280px' },
    collapsed: { x: 0, width: '88px' }
  };

  const SidebarContent = (
    <div className={`h-full flex flex-col transition-all duration-300 bg-gradient-to-b from-[#3DB6A3] to-[#1F7A6B] dark:from-[#132724] dark:to-[#0F1E1B] text-white ${sidebarCollapsed ? 'p-4' : 'p-6'}`}>
      
      {/* Header */}
      <div className={`flex items-center gap-3 mb-10 mt-2 ${sidebarCollapsed ? 'justify-center' : 'px-2'}`}>
        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md flex-shrink-0">
          <Heart className="w-6 h-6 text-white fill-white/20" />
        </div>
        {!sidebarCollapsed && (
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold tracking-tight text-white dark:text-text-primary">
            mediBuddy
          </motion.h1>
        )}
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto p-2 hover:bg-white/10 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-1 scrollbar-hide">
        {navSections.map((section) => (
          <div key={section.title}>
            {!sidebarCollapsed && (
              <p className="text-[10px] uppercase font-bold text-white/40 dark:text-text-secondary/50 tracking-[2px] mb-4 px-4">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    to={item.path}
                    key={item.id}
                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                    className={({ isActive }) => `w-full flex items-center gap-3 rounded-xl transition-all duration-300 relative group ${
                      sidebarCollapsed ? 'justify-center p-3' : 'px-4 py-2.5'
                    } ${
                      isActive 
                        ? 'bg-mediBuddy-primary/80 dark:bg-mediBuddy-primary-hover shadow-[0_0_20px_rgba(47,158,143,0.3)] dark:shadow-none text-white dark:text-[#3DB6A3]' 
                        : 'hover:bg-white/10 dark:hover:bg-mediBuddy-primary/5 text-white/60 dark:text-text-secondary hover:text-white dark:hover:text-text-primary'
                    }`}
                    title={sidebarCollapsed ? item.label : ''}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`transition-colors ${sidebarCollapsed ? 'w-5 h-5' : 'w-4.5 h-4.5'} ${isActive ? 'text-white dark:text-[#3DB6A3]' : 'text-white/60 dark:text-text-secondary group-hover:text-white dark:group-hover:text-text-primary'}`} />
                        {!sidebarCollapsed && (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm font-medium transition-colors ${isActive ? 'text-white dark:text-[#3DB6A3]' : 'text-white/60 dark:text-text-secondary group-hover:text-white dark:group-hover:text-text-primary'}`}>
                            {item.label}
                          </motion.span>
                        )}
                        
                        {!sidebarCollapsed && item.badge && (
                          <span className="ml-auto bg-mediBuddy-primary dark:bg-[#3DB6A3] text-white dark:text-mediBuddy-bg text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                            {item.badge}
                          </span>
                        )}

                        {isActive && (
                           <motion.div 
                             layoutId="active-navIndicator" 
                             className={`absolute left-0 w-1 bg-white dark:bg-[#3DB6A3] rounded-r-full ${sidebarCollapsed ? 'h-4' : 'h-6'}`}
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

      {/* Bottom Actions */}
      <div className="mt-auto space-y-4 pt-6 border-t border-white/10">
        {!sidebarCollapsed && <ProCard />}
        <button 
          onClick={toggleCollapse}
          className={`hidden lg:flex items-center gap-3 w-full p-3 hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white ${sidebarCollapsed ? 'justify-center' : ''}`}
        >
          {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium text-white/80">Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-screen w-[280px] z-[101] lg:hidden shadow-2xl"
            >
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block fixed left-0 top-0 h-screen transition-all duration-300 z-50 ${sidebarCollapsed ? 'w-[88px]' : 'w-[280px]'}`}>
        {SidebarContent}
      </aside>
    </>
  );
}

