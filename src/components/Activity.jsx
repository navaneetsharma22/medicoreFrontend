import React from 'react';
import { CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Activity({ data: activities }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-slate-800 tracking-tight">Recent Activity</h3>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-white/50"></div>
        
        <div className="space-y-6">
          {activities.map((item) => {
            let Icon;
            if (item.type === 'alert') Icon = AlertCircle;
            else if (item.type === 'success') Icon = CheckCircle2;
            else Icon = FileText;
            
            return (
              <div key={item.id} className="relative pl-10">
                <div className="absolute left-2 top-0.5 w-4 h-4 rounded-full border-2 border-white bg-medicore-bg flex items-center justify-center translate-x-[-2px]">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    item.type === 'alert' ? 'bg-amber-400' :
                    item.type === 'success' ? 'bg-emerald-400' : 'bg-blue-400'
                  }`}></div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">for {item.target}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400">{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
