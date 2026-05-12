import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function BarChartCard({ data, title = "Departmental Workload" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6 shadow-[0_8px_32px_rgba(47,158,143,0.08)] group"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-mediBuddy-primary transition-colors">{title}</h3>
        <button className="text-xs font-bold text-mediBuddy-primary hover:text-white transition-colors flex items-center gap-1">
          View Detailed Report
        </button>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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
              cursor={{ fill: 'rgba(47, 158, 143, 0.1)', radius: 10 }}
              contentStyle={{ 
                backgroundColor: 'rgba(15, 30, 27, 0.9)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(47, 158, 143, 0.3)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                color: '#fff'
              }}
              itemStyle={{ color: '#2F9E8F', fontWeight: 'bold' }}
            />
            <Bar 
              dataKey="patients" 
              radius={[10, 10, 10, 10]} 
              barSize={30}
              animationDuration={2000}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index % 2 === 0 ? '#2F9E8F' : '#3DB6A3'} 
                  fillOpacity={0.8}
                  className="hover:fill-opacity-100 transition-all duration-300"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
