import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, User, Activity, ArrowRight, ShieldCheck, 
  TrendingUp, Users, Heart, CheckCircle2, Facebook
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// --- Sub-components ---

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-card p-4 rounded-2xl flex items-center gap-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default group"
  >
    <div className="p-3 bg-medicore-primary/20 rounded-xl text-medicore-primary group-hover:bg-medicore-primary group-hover:text-white transition-colors">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="text-sm font-bold text-white">{title}</h4>
      <p className="text-xs text-text-secondary">{desc}</p>
    </div>
  </motion.div>
);

const ECGLine = () => (
  <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden pointer-events-none opacity-20">
    <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
      <motion.path
        d="M0,50 L200,50 L210,40 L220,60 L230,20 L240,80 L250,50 L450,50 L460,40 L470,60 L480,20 L490,80 L500,50 L700,50 L710,40 L720,60 L730,20 L740,80 L750,50 L1000,50"
        fill="none"
        stroke="#3DB6A3"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1], 
          opacity: [0, 1, 1, 0],
          x: [0, -500]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
    </svg>
  </div>
);

const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-medicore-primary/30 rounded-full"
        initial={{ 
          x: Math.random() * window.innerWidth, 
          y: Math.random() * window.innerHeight 
        }}
        animate={{ 
          y: [null, Math.random() * -500],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: Math.random() * 10 + 10, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
    ))}
  </div>
);

// --- Main Auth Component ---

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    toast.success('Access Granted. Welcome to MediCore.');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0f16] flex items-center justify-center p-0 sm:p-6 lg:p-12 relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-medicore-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <FloatingParticles />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl min-h-[700px] grid lg:grid-cols-2 glass-card rounded-none sm:rounded-[40px] border border-white/10 overflow-hidden z-10 shadow-2xl"
      >
        
        {/* LEFT SECTION: Info & Features */}
        <div className="relative hidden lg:flex flex-col justify-center p-16 bg-white/5 border-r border-white/10 overflow-hidden">
          <ECGLine />
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="p-3 bg-medicore-primary rounded-2xl shadow-[0_0_20px_rgba(61,182,163,0.5)]">
              <Activity size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">MediCore <span className="text-medicore-primary">ERP</span></h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-5xl font-bold text-white leading-tight mb-4">
              Manage. Monitor.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-medicore-primary to-blue-400">Care Better.</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-md leading-relaxed">
              Experience the future of healthcare management with our AI-driven ERP ecosystem. Secure, compliant, and lightning fast.
            </p>
          </motion.div>

          <div className="grid gap-4 max-w-md">
            <FeatureCard 
              icon={Users} 
              title="Patient Management" 
              desc="Real-time tracking of patient care and records." 
              delay={0.6}
            />
            <FeatureCard 
              icon={TrendingUp} 
              title="Advanced Analytics" 
              desc="Predictive insights for clinical decision making." 
              delay={0.7}
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Secure & Compliant" 
              desc="HIPAA compliant data encryption protocols." 
              delay={0.8}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.2 }}
            className="absolute top-12 right-12 text-[120px] font-black text-white/5 select-none pointer-events-none"
          >
            PLUS
          </motion.div>
        </div>

        {/* RIGHT SECTION: Login Form */}
        <div className="flex flex-col justify-center p-8 sm:p-16 relative bg-[#0d141d]/50">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md w-full mx-auto"
          >
            <div className="mb-10 text-center lg:text-left">
              <h3 className="text-3xl font-bold text-white mb-2">Welcome back 👋</h3>
              <p className="text-text-secondary">Enter your credentials to access your workplace.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-medicore-primary uppercase tracking-widest ml-1 mb-2 block">
                    Institutional Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-medicore-primary transition-colors" />
                    <input 
                      type="email" 
                      placeholder="dr.sarah@medicore.io"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-text-secondary/50 outline-none focus:border-medicore-primary/50 focus:ring-4 focus:ring-medicore-primary/10 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center ml-1 mb-2">
                    <label className="text-xs font-bold text-medicore-primary uppercase tracking-widest block">
                      Access Key
                    </label>
                    <a href="#" className="text-xs font-medium text-text-secondary hover:text-white transition-colors">Forgot key?</a>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-medicore-primary transition-colors" />
                    <input 
                      type="password" 
                      placeholder="••••••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-text-secondary/50 outline-none focus:border-medicore-primary/50 focus:ring-4 focus:ring-medicore-primary/10 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-1">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded bg-white/5 border-white/10 text-medicore-primary focus:ring-medicore-primary/20 cursor-pointer" />
                <label htmlFor="remember" className="text-sm text-text-secondary cursor-pointer select-none">Remember this device</label>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-medicore-primary to-blue-500 text-white font-bold py-4 rounded-2xl shadow-[0_10px_30px_rgba(61,182,163,0.3)] hover:shadow-[0_15px_40px_rgba(61,182,163,0.4)] transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                Sign In to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>

            <div className="mt-10">
              <div className="relative flex items-center justify-center text-xs uppercase tracking-widest text-text-secondary font-bold mb-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                <span className="relative bg-[#0d141d] px-4">Secure Sign-in</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => navigate('/dashboard')} className="flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-sm font-bold text-text-primary">Google</span>
                </button>
                <button onClick={() => navigate('/dashboard')} className="flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group">
                  <Facebook className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-bold text-text-primary">Facebook</span>
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-text-secondary">
              Don't have an account? <a href="#" className="text-medicore-primary font-bold hover:underline">Request Access</a>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white uppercase tracking-[5px] font-bold"
      >
        Built for Modern Healthcare © 2024
      </motion.p>
    </div>
  );
}
