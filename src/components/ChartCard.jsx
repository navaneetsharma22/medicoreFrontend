import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChartCard({ data, title = "Revenue Trends" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-6 col-span-1 lg:col-span-2 shadow-[0_8px_32px_rgba(47,158,143,0.08)] group"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-mediBuddy-primary transition-colors">{title}</h3>
        <div className="flex items-center gap-3">
          <select className="bg-white/5 border border-white/10 text-xs font-bold text-text-secondary rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-mediBuddy-primary/50 cursor-pointer hover:bg-white/10 transition-all">
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>Annual View</option>
          </select>
        </div>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2F9E8F" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2F9E8F" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#8DB3AD', fontSize: 10, fontWeight: 600 }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#8DB3AD', fontSize: 10, fontWeight: 600 }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 30, 27, 0.9)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(47, 158, 143, 0.3)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                color: '#fff'
              }} 
              itemStyle={{ color: '#2F9E8F', fontWeight: 'bold' }}
              cursor={{ stroke: '#2F9E8F', strokeWidth: 2, strokeDasharray: '5 5' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#2F9E8F" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorRev)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

