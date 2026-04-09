import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import Header from '../components/Header';

export default function PlaceholderPage({ title }) {
  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col">
      <Header />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 flex flex-col items-center justify-center text-center glass-card mt-8 p-12"
      >
        <div className="bg-medicore-primary/10 p-6 rounded-full mb-6">
          <Construction className="w-16 h-16 text-medicore-primary" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">{title} Page</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          This section is currently under development. The detailed layout for {title.toLowerCase()} will be available in the next update.
        </p>
      </motion.div>
    </div>
  );
}
