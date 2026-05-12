import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="flex flex-col gap-3 p-1 transition-all">
      <div className="w-10 h-10 rounded-xl bg-mediBuddy-primary/10 flex items-center justify-center text-mediBuddy-primary border border-mediBuddy-primary/10 shadow-[0_0_15px_rgba(47,158,143,0.1)]">
        <Icon size={18} />
      </div>
      <div>
        <h4 className="text-[13px] font-bold text-white mb-1 tracking-tight leading-none">{title}</h4>
        <p className="text-[11px] text-white/30 leading-relaxed font-medium">
          {desc}
        </p>
      </div>
    </div>
  );
}
