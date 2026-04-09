import React from 'react';
import { Clock, Video, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Upcoming({ data: schedule }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-slate-800 tracking-tight">Today's Schedule</h3>
        <button className="text-sm text-medicore-primary font-medium hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {schedule.map((item) => (
          <div key={item.id} className="group relative p-4 bg-white/40 border border-white/50 rounded-xl hover:bg-white/60 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-slate-800">{item.patient}</h4>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 text-xs font-semibold text-medicore-primary shadow-sm">
                <Clock className="w-3 h-3" />
                {item.time}
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{item.type}</span>
              </div>
              {item.isOnline && (
                <div className="flex items-center gap-1 text-blue-500">
                  <span className="w-1 h-1 bg-slate-300 rounded-full mx-1"></span>
                  <Video className="w-4 h-4" />
                  <span>Virtual</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
