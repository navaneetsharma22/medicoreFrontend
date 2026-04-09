import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChartCard({ data }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-6 col-span-1 lg:col-span-2 shadow-[0_8px_32px_rgba(47,158,143,0.08)]"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Revenue Trends</h3>
        <select className="bg-white/50 border border-white/40 text-sm font-medium text-slate-600 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-medicore-primary/50">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.4)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255,255,255,0.8)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: '0 10px 25px rgba(47,158,143,0.1)'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#2F9E8F" 
              strokeWidth={4}
              dot={{ fill: '#2F9E8F', strokeWidth: 2, r: 4, stroke: 'white' }}
              activeDot={{ r: 6, fill: '#3DB6A3', stroke: 'white', strokeWidth: 2 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
