import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Activity, Moon, Sun, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  // Check theme on load
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-medicore-bg overflow-hidden transition-colors duration-500">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-medicore-light/30 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-medicore-primary/30 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[80%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-full glass-card hover:bg-medicore-surface z-50 transition-all shadow-lg text-text-secondary hover:text-medicore-primary"
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card hover-gradient-border p-[1px] rounded-[24px]">
          <div className="bg-medicore-card/80 backdrop-blur-2xl rounded-[23px] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Header / Logo */}
            <div className="flex flex-col items-center justify-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-medicore-primary to-medicore-light flex items-center justify-center shadow-lg mb-4 text-white transform hover:scale-105 transition-transform">
                <Activity size={32} />
              </div>
              <h1 className="text-3xl font-bold text-text-primary tracking-tight">MediCore</h1>
              <p className="text-text-secondary mt-2 text-sm text-center">
                {isLogin ? 'Welcome back to your healthcare dashboard' : 'Create an account to manage your health'}
              </p>
            </div>

            {/* Toggle Login/Sign Up */}
            <div className="flex bg-medicore-bg/50 p-1 rounded-xl mb-8 relative border border-border-subtle backdrop-blur-sm">
              <div 
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-medicore-surface rounded-lg shadow transition-all duration-300 ease-in-out z-0"
                style={{ left: isLogin ? '4px' : 'calc(50%)' }}
              />
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-sm font-medium z-10 transition-colors ${isLogin ? 'text-medicore-primary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-sm font-medium z-10 transition-colors ${!isLogin ? 'text-medicore-primary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                Sign Up
              </button>
            </div>

            {/* Forms */}
            <AnimatePresence mode="wait">
              <motion.form 
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5 ml-1">Full Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-medicore-primary transition-colors">
                        <User size={18} />
                      </div>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-medicore-bg/50 border border-border-subtle focus:border-medicore-primary focus:ring-2 focus:ring-medicore-primary/20 outline-none text-text-primary transition-all backdrop-blur-sm placeholder-text-secondary/50"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-medicore-primary transition-colors">
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-medicore-bg/50 border border-border-subtle focus:border-medicore-primary focus:ring-2 focus:ring-medicore-primary/20 outline-none text-text-primary transition-all backdrop-blur-sm placeholder-text-secondary/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 ml-1">
                    <label className="block text-sm font-medium text-text-primary">Password</label>
                    {isLogin && (
                      <a href="#" className="text-xs font-medium text-medicore-primary hover:text-medicore-light transition-colors">
                        Forgot?
                      </a>
                    )}
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-medicore-primary transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-medicore-bg/50 border border-border-subtle focus:border-medicore-primary focus:ring-2 focus:ring-medicore-primary/20 outline-none text-text-primary transition-all backdrop-blur-sm placeholder-text-secondary/50"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-medicore-primary to-medicore-light hover:from-medicore-light hover:to-medicore-primary text-white rounded-xl font-medium flex items-center justify-center group transition-all shadow-lg hover:shadow-medicore-primary/30 transform hover:-translate-y-0.5"
                >
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={18} className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>

              </motion.form>
            </AnimatePresence>

            {/* Social Logins */}
            <div className="mt-8">
              <div className="relative flex items-center justify-center text-sm">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-subtle" />
                </div>
                <span className="relative bg-medicore-card px-4 text-xs text-text-secondary font-medium uppercase tracking-wider">
                  Or continue with
                </span>
              </div>
              
              <div className="mt-6 flex gap-4">
                <button onClick={() => navigate('/dashboard')} type="button" className="flex-1 py-2.5 flex justify-center items-center gap-2 rounded-xl border border-border-subtle bg-medicore-bg/30 hover:bg-medicore-bg/70 transition-all group backdrop-blur-sm shadow-sm">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-sm font-medium text-text-primary mt-0.5">Google</span>
                </button>
                <button onClick={() => navigate('/dashboard')} type="button" className="flex-1 py-2.5 flex justify-center items-center gap-2 rounded-xl border border-border-subtle bg-medicore-bg/30 hover:bg-medicore-bg/70 transition-all group backdrop-blur-sm shadow-sm">
                  <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-sm font-medium text-text-primary mt-0.5">Facebook</span>
                </button>
              </div>
            </div>

          </div>
        </div>
        
        {/* Simple footer text */}
        <p className="text-center text-text-secondary text-xs mt-6 opacity-70">
          By continuing, you agree to MediCore's Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
