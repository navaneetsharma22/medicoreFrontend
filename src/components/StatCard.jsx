import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, trend, trendValue, icon: Icon, delay = 0 }) {
  const isPositive = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.04 }}
      className="glass-card p-6 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-500 font-medium mb-1">{title}</p>
          <h4 className="text-3xl font-bold text-slate-800">{value}</h4>
        </div>
        <div className="p-3 bg-medicore-primary/10 rounded-2xl">
          <Icon className="w-6 h-6 text-medicore-primary" />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {isPositive ? '+' : '-'}{trendValue}
        </span>
        <span className="text-sm text-slate-500 font-medium">vs last month</span>
      </div>
    </motion.div>
  );
}
