import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Users, UserPlus, TrendingUp, 
  Activity, AlertCircle, CheckCircle, Clock,
  Settings, Database, Lock, Server
} from 'lucide-react';
import Header from '../components/Header';
import { fetchDoctors, fetchPatients, fetchDashboardData } from '../services/api';

export default function Admin() {
  const [stats, setStats] = useState({ doctors: 0, patients: 0, activeUsers: 0, systemHealth: 'Optimal' });
  const [recentLogs, setRecentLogs] = useState([
    { id: 1, action: 'Security Protocol Updated', user: 'System', time: '10 mins ago' },
    { id: 2, action: 'New Doctor Registered', user: 'Admin', time: '25 mins ago' },
    { id: 3, action: 'Database Backup Completed', user: 'System', time: '1 hour ago' },
  ]);

  useEffect(() => {
    // Simulated fetching of admin-specific stats
    Promise.all([fetchDoctors(), fetchPatients()])
      .then(([doctors, patients]) => {
        setStats(prev => ({
          ...prev,
          doctors: doctors.length,
          patients: patients.length,
          activeUsers: doctors.length + 5 // Simulated
        }));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />

      {/* Admin Hero */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-3xl p-8 bg-gradient-to-r from-medicore-primary/20 to-transparent border-medicore-primary/30"
      >
        <div className="flex items-center gap-6">
          <div className="p-4 bg-medicore-primary rounded-2xl shadow-[0_0_30px_rgba(47,158,143,0.5)]">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-2">System Administration</h1>
            <p className="text-text-secondary">Comprehensive control center for MediCore infrastructure and personnel management.</p>
          </div>
        </div>
      </motion.div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Total Personnel', value: stats.doctors, icon: Users, color: 'text-medicore-primary' },
          { label: 'Total Patients', value: stats.patients, icon: UserPlus, color: 'text-blue-400' },
          { label: 'System Uptime', value: '99.98%', icon: Server, color: 'text-green-400' },
          { label: 'Database Status', value: stats.systemHealth, icon: Database, color: 'text-purple-400' },
        ].map((item, i) => (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: i * 0.1 }}
            key={item.label} 
            className="glass-card rounded-3xl p-6 border-white/5 hover:border-white/10 transition-colors"
          >
            <div className={`p-3 bg-white/5 rounded-2xl w-fit mb-4 ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <p className="text-text-secondary text-sm font-bold uppercase tracking-widest mb-1">{item.label}</p>
            <h3 className="text-3xl font-bold text-white">{item.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 pb-6">
        
        {/* System Settings Quick Access */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 glass-card rounded-3xl p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">System Configuration</h3>
            <Settings className="w-5 h-5 text-text-secondary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               { title: 'Identity Management', desc: 'Manage roles and permissions', icon: Lock },
               { title: 'Data Retention', desc: 'Configure backup and archival', icon: Database },
               { title: 'API Integrations', desc: 'External laboratory & pharmacy links', icon: Activity },
               { title: 'Audit Chains', desc: 'Verify immutable activity logs', icon: Shield },
             ].map((opt) => (
               <button key={opt.title} className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 transition-all group">
                  <div className="flex items-center gap-4 mb-3">
                     <div className="p-2.5 bg-medicore-primary/10 rounded-xl text-medicore-primary group-hover:scale-110 transition-transform">
                        <opt.icon className="w-5 h-5" />
                     </div>
                     <h4 className="text-white font-bold">{opt.title}</h4>
                  </div>
                  <p className="text-text-secondary text-xs">{opt.desc}</p>
               </button>
             ))}
          </div>
        </motion.div>

        {/* Security Logs */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-3xl p-8 flex flex-col"
        >
          <h3 className="text-xl font-bold text-white mb-8">Security Events</h3>
          <div className="space-y-6 flex-1">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex flex-shrink-0 items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">{log.action}</h4>
                  <p className="text-text-secondary text-[10px] uppercase font-bold tracking-widest">{log.time} · by {log.user}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-bold transition-all">
            View All Security Logs
          </button>
        </motion.div>

      </div>
    </div>
  );
}
