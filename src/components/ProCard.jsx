import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ProCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-5 mb-2 hover-gradient-border group transition-all duration-300 transform hover:scale-[1.02]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md z-0" />
      
      {/* Overlay highlight */}
      <div className="absolute inset-0 bg-medicore-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="bg-white/20 p-2.5 rounded-full mb-3 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <Sparkles className="w-6 h-6 text-yellow-100" />
        </div>
        
        <h3 className="font-semibold text-white mb-1">Upgrade to Pro</h3>
        <p className="text-white/70 text-sm mb-4">Get advanced analytics & scheduling tools.</p>
        
        <button onClick={() => alert('Upgrade modal opening...')} className="w-full bg-white text-medicore-dark font-medium py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-95">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
