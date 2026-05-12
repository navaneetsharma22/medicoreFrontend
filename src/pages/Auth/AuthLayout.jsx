import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AuthLayout({ children }) {
  // Particle generation
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-4 lg:p-16 relative overflow-hidden font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Stronger Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] bg-teal-500/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-blue-600/20 blur-[150px] rounded-full mix-blend-screen" />
        
        {/* Animated Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-teal-400/40"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Container - Now a flex container instead of a single solid card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[1300px] z-10 flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-20"
      >
        {children}
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-6 w-full text-center z-10 hidden lg:block">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[4px]">
          © 2024 mediBuddy Healthcare ERP. All rights reserved.
        </p>
      </div>
    </div>
  );
}
