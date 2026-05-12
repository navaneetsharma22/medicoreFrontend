import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import Header from '../components/Header';

export default function PlaceholderPage({ title }) {
  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col">
      <Header />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center text-center glass-card mt-8 p-12 border-dashed border-white/10"
      >
        <div className="bg-mediBuddy-primary/10 p-8 rounded-3xl mb-8 relative group">
          <div className="absolute inset-0 bg-mediBuddy-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <Construction className="w-20 h-20 text-mediBuddy-primary relative z-10 animate-bounce" />
        </div>
        <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">{title} Section</h2>
        <p className="text-text-secondary max-w-md mx-auto text-lg leading-relaxed">
          The <span className="text-mediBuddy-primary font-bold">{title.toLowerCase()}</span> module is currently being calibrated with our latest clinical intelligence. Check back shortly for the full release.
        </p>
        
        <div className="mt-12 flex gap-4">
           <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 text-text-secondary text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-mediBuddy-primary rounded-full animate-pulse" />
              Development in Progress
           </div>
        </div>
      </motion.div>
    </div>
  );
}
