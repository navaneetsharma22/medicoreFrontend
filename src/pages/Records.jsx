import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, HardDrive, Folder, FileText, 
  MoreHorizontal, Download, Eye, Plus,
  Shield, Cloud, Clock, Star
} from 'lucide-react';
import Header from '../components/Header';

const files = [
  { id: 1, name: 'Radiology_Scan_Dec23.pdf', type: 'PDF', size: '4.2 MB', date: '2 hours ago', icon: FileText, color: 'text-red-400' },
  { id: 2, name: 'Patient_Consents_Archive', type: 'Folder', size: '12 Files', date: 'Yesterday', icon: Folder, color: 'text-blue-400' },
  { id: 3, name: 'Insurance_Contract_v2.docx', type: 'DOCX', size: '1.5 MB', date: 'Dec 12, 2023', icon: FileText, color: 'text-blue-500' },
  { id: 4, name: 'MRI_Visuals_Raw.zip', type: 'ZIP', size: '840 MB', date: 'Dec 10, 2023', icon: Cloud, color: 'text-purple-400' },
];

const storageStats = [
  { label: 'Documents', size: '12.5 GB', color: 'bg-blue-500' },
  { label: 'Images / MRI', size: '45.2 GB', color: 'bg-medicore-primary' },
  { label: 'System Backup', size: '2.1 GB', color: 'bg-amber-500' },
];

export default function Records() {
  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1 pb-6">
        
        {/* Storage Summary */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="xl:col-span-1 flex flex-col gap-6"
        >
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Storage Info</h3>
            
            <div className="relative w-40 h-40 mx-auto mb-8">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                 <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-medicore-primary" strokeDasharray="440" strokeDashoffset="110" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-3xl font-bold text-white">75%</span>
                 <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Used</span>
               </div>
            </div>

            <div className="space-y-4">
              {storageStats.map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-text-primary">{stat.label}</span>
                    <span className="text-text-secondary">{stat.size}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${stat.color} rounded-full`} style={{ width: '60%' }} />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-2xl font-bold transition-all">
              Upgrade Storage
            </button>
          </div>

          <div className="glass-card rounded-3xl p-6 bg-medicore-primary/10 border-medicore-primary/20">
            <Shield className="w-10 h-10 text-medicore-primary mb-4" />
            <h4 className="text-white font-bold mb-2">End-to-End Encryption</h4>
            <p className="text-text-secondary text-xs leading-relaxed">All medical records are secured with AES-256 bank-grade encryption protocols.</p>
          </div>
        </motion.div>

        {/* File Explorer */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="xl:col-span-3 flex flex-col gap-6"
        >
          <div className="glass-card rounded-3xl p-8 h-full flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold text-white">Medical Cloud</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input 
                    type="text" 
                    placeholder="Search files..." 
                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50"
                  />
                </div>
                <button className="bg-medicore-primary hover:bg-medicore-dark text-white p-2.5 rounded-xl shadow-lg transition">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
              <button className="text-sm font-bold text-medicore-primary border-b-2 border-medicore-primary pb-4">All Files</button>
              <button className="text-sm font-bold text-text-secondary hover:text-white pb-4 transition">Recent</button>
              <button className="text-sm font-bold text-text-secondary hover:text-white pb-4 transition">Starred</button>
              <button className="text-sm font-bold text-text-secondary hover:text-white pb-4 transition">Shared</button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((file, i) => {
                  const Icon = file.icon;
                  return (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      key={file.id} 
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 bg-white/5 rounded-xl ${file.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white"><Star className="w-4 h-4" /></button>
                          <button className="p-1.5 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <h4 className="text-white font-bold text-sm truncate mb-1 group-hover:text-medicore-primary transition-colors">{file.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">{file.size}</span>
                        <span className="text-[10px] text-text-secondary font-medium">{file.date}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center py-10 group cursor-pointer hover:border-medicore-primary/50 transition-all">
               <div className="w-12 h-12 bg-medicore-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cloud className="w-6 h-6 text-medicore-primary" />
               </div>
               <p className="text-white font-bold text-sm mb-1">Drag and drop files to upload</p>
               <p className="text-text-secondary text-xs">Maximum file size: 2GB</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
