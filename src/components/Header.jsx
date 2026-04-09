import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-8 animate-slide-up">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-medicore-primary" />
        </div>
        <input
          type="text"
          placeholder="Search patients, appointments..."
          className="w-full glass-card pl-12 pr-4 py-3 outline-none focus:border-medicore-primary/50 focus:shadow-[0_0_20px_rgba(47,158,143,0.15)] text-slate-700 placeholder:text-slate-400 bg-white/50"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full glass-card hover:bg-white/70 text-slate-600 hover:text-medicore-primary transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-400 border-2 border-white rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer group glass-card p-1.5 pr-4">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop" 
            alt="Dr. Sarah" 
            className="w-10 h-10 rounded-full object-cover shadow-sm border border-white/50 group-hover:border-medicore-primary/50 transition-colors"
          />
          <div className="hidden md:block">
            <p className="text-sm font-bold text-slate-800">Dr. Sarah L.</p>
            <p className="text-xs text-slate-500 font-medium">Head Physician</p>
          </div>
        </div>
      </div>
    </header>
  );
}
