import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Users, TrendingUp, Sun, Moon, Shield } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import AuthLayout from './Auth/AuthLayout';
import FeatureCard from './Auth/FeatureCard';
import LoginForm from './Auth/LoginForm';
import SignupForm from './Auth/SignupForm';

export default function Auth() {
  const location = useLocation();
  const isSignup = location.pathname === '/signup';

  return (
    <AuthLayout>
      {/* LEFT SECTION */}
      <div className="flex-1 flex flex-col justify-center relative overflow-hidden bg-transparent z-10">
        
        {/* Brand & Badge */}
        <div className="space-y-12 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)]">
              <Activity className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight leading-none">mediBuddy</h1>
              <p className="text-teal-400 text-[10px] font-bold uppercase tracking-[1px] mt-0.5">Healthcare ERP</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 px-4 py-2 rounded-full backdrop-blur-md">
            <ShieldCheck size={14} className="text-teal-400" />
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">SMARTER HEALTHCARE</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center my-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-4">
              Manage. Monitor.<br />
              <span className="text-teal-400">Care Better.</span>
            </h2>
            <p className="text-slate-400 text-base max-w-[400px] font-medium leading-relaxed">
              mediBuddy helps healthcare professionals streamline operations, improve patient care, and drive better outcomes.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FeatureCard 
              icon={Users} 
              title="Patient Management" 
              desc="Centralized patient records and history" 
            />
            <FeatureCard 
              icon={TrendingUp} 
              title="Advanced Analytics" 
              desc="Real-time insights for better decisions" 
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Secure & Compliant" 
              desc="HIPAA-ready security and data protection" 
            />
          </div>
        </div>

        {/* Bottom HIPAA Badge */}
        <div className="relative z-10 mt-4 flex items-center gap-3 bg-slate-900/40 border border-slate-700/50 w-max px-4 py-3 rounded-2xl backdrop-blur-md">
          <div className="p-1.5 bg-slate-800 rounded-lg">
            <Shield className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">HIPAA Compliant</h4>
            <p className="text-[10px] text-slate-400">Your data is safe with us</p>
          </div>
        </div>

        {/* Animated ECG Line Overlay */}
        <div className="absolute bottom-[-20%] left-0 w-[120%] h-64 z-0 pointer-events-none overflow-hidden opacity-60">
          <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <motion.path
              d="M0,70 L200,70 L210,60 L220,80 L230,40 L240,100 L250,70 L450,70 L460,60 L470,80 L480,40 L490,100 L500,70 L700,70 L710,60 L720,80 L730,40 L740,100 L750,70 L1000,70"
              fill="none"
              stroke="#14b8a6"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: [0, 1],
                opacity: [0, 1, 1, 0],
                x: [0, -250]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M0,70 L200,70 L210,60 L220,80 L230,40 L240,100 L250,70 L450,70 L460,60 L470,80 L480,40 L490,100 L500,70 L700,70 L710,60 L720,80 L730,40 L740,100 L750,70 L1000,70"
              fill="none"
              stroke="#14b8a6"
              strokeWidth="5"
              className="blur-md"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: [0, 1],
                opacity: [0, 0.6, 0.6, 0],
                x: [0, -250]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
      </div>

      {/* RIGHT SECTION - AUTH FORM (Floating Card) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{ 
          opacity: { duration: 0.8 },
          x: { duration: 0.8 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="w-full lg:w-[480px] bg-slate-900/60 p-10 flex flex-col justify-center relative border border-slate-500/30 rounded-[32px] shadow-[0_20px_60px_-15px_rgba(20,184,166,0.3)] backdrop-blur-2xl z-10 overflow-hidden"
      >
        
        {/* Subtle inner glow for the card border & depth */}
        <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_0_40px_rgba(59,130,246,0.05)] pointer-events-none" />

        {/* Theme Toggle */}
        <div className="absolute top-6 right-6 flex items-center gap-1 bg-slate-950/80 border border-slate-700/50 p-1 rounded-full z-20 shadow-inner">
          <button className="p-1.5 rounded-full text-slate-500 hover:text-white transition-colors"><Sun size={14}/></button>
          <button className="p-1.5 rounded-full bg-slate-800 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]"><Moon size={14}/></button>
        </div>
        
        {isSignup ? <SignupForm /> : <LoginForm />}
      </motion.div>
    </AuthLayout>
  );
}
