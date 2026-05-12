import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function SignupForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsError(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsError(false);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate an error if password is too short for demonstration
          if (formData.password.length < 6) {
            reject(new Error('Password must be at least 6 characters'));
          } else {
            resolve();
          }
        }, 2000);
      });
      
      toast.success('Institutional account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      setIsError(true);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    blur: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-md mx-auto lg:mx-0"
    >
      <div className="mb-10 text-center lg:text-left">
        <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">Join the Team 🩺</h3>
        <p className="text-slate-400 font-medium text-sm">Create your institutional account to get started</p>
      </div>

      <motion.form 
        onSubmit={handleSignup} 
        className="space-y-6"
        animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="space-y-5">
          {/* Full Name Input */}
          <motion.div 
            className="space-y-2"
            variants={inputVariants}
            animate={focusedField === 'name' ? 'focus' : 'blur'}
          >
            <label className="text-[13px] font-bold text-slate-300 ml-1 uppercase tracking-wider">Full Name</label>
            <div className="relative group">
              <motion.div 
                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                animate={{ scale: focusedField === 'name' ? 1.1 : 1, color: focusedField === 'name' || isError ? (isError ? '#ef4444' : '#2dd4bf') : '#64748b' }}
              >
                <User className="h-5 w-5 transition-colors" />
              </motion.div>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Dr. Sarah Johnson"
                className={`w-full bg-slate-950/60 border ${isError ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-700/60 focus:border-teal-400 focus:ring-teal-400/20'} rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:ring-2 transition-all font-medium disabled:opacity-50 shadow-inner`}
                disabled={loading}
                required
              />
            </div>
          </motion.div>

          {/* Email Input */}
          <motion.div 
            className="space-y-2"
            variants={inputVariants}
            animate={focusedField === 'email' ? 'focus' : 'blur'}
          >
            <label className="text-[13px] font-bold text-slate-300 ml-1 uppercase tracking-wider">Institutional Email</label>
            <div className="relative group">
              <motion.div 
                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                animate={{ scale: focusedField === 'email' ? 1.1 : 1, color: focusedField === 'email' || isError ? (isError ? '#ef4444' : '#2dd4bf') : '#64748b' }}
              >
                <Mail className="h-5 w-5 transition-colors" />
              </motion.div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="sarah.j@mediBuddy.io"
                className={`w-full bg-slate-950/60 border ${isError ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-700/60 focus:border-teal-400 focus:ring-teal-400/20'} rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:ring-2 transition-all font-medium disabled:opacity-50 shadow-inner`}
                disabled={loading}
                required
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div 
            className="space-y-2"
            variants={inputVariants}
            animate={focusedField === 'password' ? 'focus' : 'blur'}
          >
            <label className="text-[13px] font-bold text-slate-300 ml-1 uppercase tracking-wider">Create Password</label>
            <div className="relative group">
              <motion.div 
                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                animate={{ scale: focusedField === 'password' ? 1.1 : 1, color: focusedField === 'password' || isError ? (isError ? '#ef4444' : '#2dd4bf') : '#64748b' }}
              >
                <Lock className="h-5 w-5 transition-colors" />
              </motion.div>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="••••••••••••"
                className={`w-full bg-slate-950/60 border ${isError ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-700/60 focus:border-teal-400 focus:ring-teal-400/20'} rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-slate-600 outline-none focus:ring-2 transition-all font-medium disabled:opacity-50 shadow-inner`}
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-teal-400 transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="flex items-start gap-3 ml-1">
          <input 
            type="checkbox" 
            id="terms" 
            className="mt-1 w-5 h-5 rounded-md bg-slate-950/50 border-slate-700/60 text-teal-500 focus:ring-teal-500/30 cursor-pointer disabled:opacity-50 transition-all" 
            disabled={loading}
            required
          />
          <label htmlFor="terms" className="text-[12px] font-medium text-slate-400 leading-relaxed cursor-pointer select-none">
            I agree to the <span className="text-teal-400 hover:text-teal-300 transition-colors hover:underline">Terms of Service</span> and <span className="text-teal-400 hover:text-teal-300 transition-colors hover:underline">Privacy Policy</span>.
          </label>
        </div>

        <motion.button 
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          disabled={loading}
          type="submit"
          className={`w-full relative overflow-hidden bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-wait ${isError ? 'animate-pulse' : ''}`}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 relative z-10"
              >
                <span className="text-lg tracking-wide">Create Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.form>

      <p className="mt-10 text-center text-sm text-slate-400 font-bold uppercase tracking-widest">
        Already have an account? <Link to="/" className="text-teal-400 hover:text-teal-300 transition-colors ml-1 underline underline-offset-4">Sign in</Link>
      </p>
    </motion.div>
  );
}
