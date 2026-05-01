import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, UserPlus, FileText, Calendar, 
  Settings, Shield, LogOut, Search, Filter,
  Clock, CheckCircle2, AlertCircle, RefreshCw
} from 'lucide-react';
import Header from '../components/Header';

const activities = [
  { id: 1, user: 'Admin', action: 'New patient registered', detail: 'Alice Walker', time: '5 mins ago', icon: UserPlus, color: 'text-medicore-primary', bg: 'bg-medicore-primary/10' },
  { id: 2, user: 'Dr. Sarah L.', action: 'Medical report updated', detail: 'Blood Test #8821', time: '12 mins ago', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 3, user: 'System', action: 'Database backup completed', detail: '1.2 GB stored in Cloud', time: '45 mins ago', icon: Shield, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { id: 4, user: 'Dr. Mark R.', action: 'Schedule changed', detail: 'Consultation with Robert Fox', time: '1 hour ago', icon: Calendar, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { id: 5, user: 'Admin', action: 'System settings modified', detail: 'Updated security protocols', time: '3 hours ago', icon: Settings, color: 'text-red-400', bg: 'bg-red-400/10' },
  { id: 6, user: 'Nurse Amy', action: 'New appointment booked', detail: 'Jenny Wilson - Dec 24', time: '5 hours ago', icon: Clock, color: 'text-green-400', bg: 'bg-green-400/10' },
];

export default function ActivityLog() {
  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />

      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-3xl p-8 flex-1 flex flex-col overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Activity Log</h2>
            <p className="text-text-secondary text-sm">Real-time audit trail of all system and clinical actions</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search logs..." 
                  className="pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50"
                />
             </div>
             <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-text-primary text-sm hover:bg-white/10 transition">
                <RefreshCw className="w-4 h-4" /> Refresh
             </button>
             <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-text-primary text-sm hover:bg-white/10 transition">
                <Filter className="w-4 h-4" /> Filter
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
           <div className="relative space-y-6 before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
              {activities.map((log, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={log.id} 
                  className="flex gap-6 relative"
                >
                  <div className={`relative z-10 w-12 h-12 flex-shrink-0 rounded-2xl ${log.bg} flex items-center justify-center border border-white/5`}>
                     <log.icon className={`w-5 h-5 ${log.color}`} />
                  </div>
                  <div className="flex-1 pt-1">
                     <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                        <h4 className="text-white font-bold text-sm">
                           {log.action} <span className="text-medicore-primary mx-1">·</span> <span className="text-text-secondary font-medium">{log.detail}</span>
                        </h4>
                        <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">{log.time}</span>
                     </div>
                     <p className="text-text-secondary text-xs">Performed by: <span className="text-white/80">{log.user}</span></p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
           <p className="text-xs text-text-secondary italic flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" /> Immutable logs secured via audit-chain protocol
           </p>
           <button className="text-xs font-bold text-medicore-primary hover:text-white transition">
              Download Full Export
           </button>
        </div>
      </motion.div>
    </div>
  );
}
