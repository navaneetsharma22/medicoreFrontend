import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Bell, Shield, Palette, 
  Globe, Lock, Mail, Phone,
  Check, Save, RefreshCw, Moon
} from 'lucide-react';
import Header from '../components/Header';

export default function Settings() {
  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />

      <div className="flex flex-col xl:flex-row gap-6 flex-1 pb-6 overflow-hidden">
        
        {/* Sidebar Tabs */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          className="xl:w-64 flex flex-col gap-2"
        >
          {[
            { id: 'profile', label: 'Profile', icon: User, active: true },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'language', label: 'Language', icon: Globe },
          ].map((tab) => (
            <button 
              key={tab.id}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                tab.active 
                  ? 'bg-medicore-primary text-white shadow-lg' 
                  : 'text-text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-bold text-sm">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content Area */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 overflow-y-auto custom-scrollbar"
        >
          <div className="glass-card rounded-3xl p-8 space-y-10">
            
            {/* Profile Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Profile Information</h3>
                <button className="text-medicore-primary hover:text-white transition flex items-center gap-2 text-sm font-bold">
                  <RefreshCw className="w-4 h-4" /> Reset Changes
                </button>
              </div>

              <div className="flex items-center gap-8 mb-8 pb-8 border-b border-white/5">
                <div className="relative group">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" className="w-24 h-24 rounded-3xl border-2 border-white/10 object-cover" alt="" />
                  <button className="absolute inset-0 bg-black/60 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-[10px] font-bold uppercase">Change</span>
                  </button>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Hospital Administrator</h4>
                  <p className="text-text-secondary text-sm mb-4">Super Admin Access · New York, USA</p>
                  <div className="flex gap-3">
                    <span className="bg-medicore-primary/10 text-medicore-primary px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">Active</span>
                    <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">Verified</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest px-1">Full Name</label>
                  <input type="text" defaultValue="Johnathan Doe" className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-text-primary outline-none focus:border-medicore-primary/50 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest px-1">Professional Title</label>
                  <input type="text" defaultValue="Chief Medical Officer" className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-text-primary outline-none focus:border-medicore-primary/50 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest px-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input type="email" defaultValue="admin@medicore.com" className="w-full pl-12 pr-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-text-primary outline-none focus:border-medicore-primary/50 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest px-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input type="tel" defaultValue="+1 (555) 000-1234" className="w-full pl-12 pr-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-text-primary outline-none focus:border-medicore-primary/50 transition-all" />
                  </div>
                </div>
              </div>
            </section>

            {/* Notification Toggles */}
            <section className="pt-10 border-t border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">Security & Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account', active: true, icon: Shield },
                  { label: 'Login Alerts', desc: 'Get notified of new logins from unknown devices', active: true, icon: Bell },
                  { label: 'Dark Mode', desc: 'Use a darker theme for the dashboard', active: true, icon: Moon },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-white/5 rounded-xl text-text-secondary">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{item.label}</h4>
                        <p className="text-text-secondary text-xs">{item.desc}</p>
                      </div>
                    </div>
                    <button className={`w-12 h-6 rounded-full relative transition-all duration-300 ${item.active ? 'bg-medicore-primary' : 'bg-white/10'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${item.active ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-6 flex justify-end gap-4">
               <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold transition-all">
                  Cancel
               </button>
               <button className="px-10 py-4 bg-medicore-primary hover:bg-medicore-dark text-white rounded-2xl font-bold shadow-lg transition-all flex items-center gap-2">
                  <Save className="w-5 h-5" /> Save Changes
               </button>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
