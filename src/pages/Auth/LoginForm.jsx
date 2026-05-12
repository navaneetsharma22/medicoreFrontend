import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Access Granted');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-[400px] mx-auto"
    >
      <div className="mb-12">
        <h3 className="text-4xl font-bold text-white mb-3 tracking-tight">Welcome Back ✨</h3>
        <p className="text-slate-400 font-medium text-sm">Sign in to your mediBuddy account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-300 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-500 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all font-medium disabled:opacity-50 shadow-inner"
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[13px] font-bold text-slate-300">Password</label>
              <a href="#" className="text-[13px] font-bold text-teal-400 hover:text-teal-300 transition-colors">Forgot password?</a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder:text-slate-500 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all font-medium disabled:opacity-50 shadow-inner"
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-1">
          <input 
            type="checkbox" 
            id="remember" 
            className="w-5 h-5 rounded-md bg-slate-950/50 border-slate-700/50 text-teal-500 focus:ring-teal-500/20 cursor-pointer" 
            disabled={loading}
          />
          <label htmlFor="remember" className="text-[13px] font-bold text-slate-400 cursor-pointer select-none hover:text-white transition-colors">Remember me</label>
        </div>

        <motion.button 
          whileHover={!loading ? { scale: 1.02 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          disabled={loading}
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying...</span>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <span className="text-lg">Sign In</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      <div className="mt-12">
        <div className="relative flex items-center justify-center text-[10px] uppercase tracking-[3px] text-slate-500 font-black mb-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700/50" /></div>
          <span className="relative bg-transparent px-6 backdrop-blur-sm">Or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 py-3.5 px-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-all group backdrop-blur-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            </svg>
            <span className="text-sm font-bold text-white">Google</span>
          </button>
          <button className="flex items-center justify-center gap-3 py-3.5 px-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-all group backdrop-blur-sm">
            <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-sm font-bold text-white">Facebook</span>
          </button>
        </div>
      </div>

      <p className="mt-12 text-center text-sm text-slate-400 font-bold">
        Don't have an account? <Link to="/signup" className="text-teal-400 hover:text-teal-300 transition-colors ml-1">Create one</Link>
      </p>
    </motion.div>
  );
}
