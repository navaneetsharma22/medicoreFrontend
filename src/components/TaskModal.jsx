import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Clock, Plus, AlertCircle, CheckCircle } from 'lucide-react';

export default function TaskModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => onClose(), 1800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 30 }}
        className="glass-card rounded-[32px] p-8 md:p-12 w-full max-w-2xl relative border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-xl transition text-text-secondary">
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-amber-500/20 rounded-2xl">
            <Clock className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">Clinical Task</h2>
        </div>
        <p className="text-text-secondary text-lg mb-8">Schedule a new task or reminder for the medical team.</p>

        {submitted ? (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10">
            <div className="w-20 h-20 bg-mediBuddy-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-mediBuddy-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white">Task Created!</h3>
            <p className="text-text-secondary text-lg mt-2">Added to the team workflow log.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Task Title</label>
              <input 
                type="text" 
                placeholder="e.g. Review blood work for Room 302"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-text-primary placeholder:text-text-secondary outline-none focus:border-amber-500/50 transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Priority</label>
                <select className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-text-primary outline-none appearance-none cursor-pointer focus:border-amber-500/50">
                  <option value="low" className="bg-mediBuddy-bg">Low Priority</option>
                  <option value="medium" className="bg-mediBuddy-bg">Medium Priority</option>
                  <option value="high" className="bg-mediBuddy-bg">High Priority</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Due Date</label>
                <input 
                  type="date" 
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-text-primary outline-none focus:border-amber-500/50 transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Assign To</label>
              <input 
                type="text" 
                placeholder="Search staff members..."
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-text-primary placeholder:text-text-secondary outline-none focus:border-amber-500/50 transition-all"
              />
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-amber-500/20 pt-4"
            >
              <Plus className="w-6 h-6" />
              Create Task
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
