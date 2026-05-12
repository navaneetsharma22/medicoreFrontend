import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ title, value, trend, trendValue, icon: Icon, delay = 0 }) {
  const isPositive = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, translateY: -5 }}
      className="glass-card p-6 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-1 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-20 h-20 text-mediBuddy-primary" />
      </div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-text-secondary font-bold text-xs uppercase tracking-widest mb-1 group-hover:text-mediBuddy-primary transition-colors">{title}</p>
          <h4 className="text-3xl font-extrabold text-white">{value}</h4>
        </div>
        <div className="p-3 bg-mediBuddy-primary/10 rounded-2xl group-hover:bg-mediBuddy-primary group-hover:text-white transition-all duration-300">
          <Icon className="w-6 h-6 text-mediBuddy-primary group-hover:text-white" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 relative z-10">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${
          isPositive ? 'bg-mediBuddy-primary/20 text-mediBuddy-primary' : 'bg-rose-500/20 text-rose-400'
        }`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trendValue}
        </div>
        <span className="text-[10px] text-text-secondary font-bold uppercase tracking-tight">vs last month</span>
      </div>
    </motion.div>
  );
}

