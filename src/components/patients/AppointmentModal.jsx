import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, Plus } from 'lucide-react';

export default function AppointmentModal({ patient, onClose }) {
  const [form, setForm] = useState({ type: 'Consultation', date: '', time: '', doctor: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { onClose(); }, 1800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card rounded-2xl p-6 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded-lg transition">
          <X className="w-5 h-5 text-text-secondary" />
        </button>

        <h2 className="text-xl font-bold text-white mb-1">Create Appointment</h2>
        <p className="text-text-secondary text-sm mb-6">For {patient?.name}</p>

        {submitted ? (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10">
            <div className="w-16 h-16 bg-mediBuddy-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-mediBuddy-primary" />
            </div>
            <h3 className="text-lg font-bold text-white">Appointment Created!</h3>
            <p className="text-text-secondary text-sm mt-1">Successfully scheduled for {form.date} at {form.time}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Appointment Type</label>
              <select name="type" value={form.type} onChange={handleChange} required
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary outline-none focus:border-mediBuddy-primary/50 transition-all appearance-none cursor-pointer">
                <option value="Consultation" className="bg-mediBuddy-bg">Consultation</option>
                <option value="Follow-up" className="bg-mediBuddy-bg">Follow-up</option>
                <option value="Checkup" className="bg-mediBuddy-bg">Checkup</option>
                <option value="Lab Work" className="bg-mediBuddy-bg">Lab Work</option>
                <option value="Therapy" className="bg-mediBuddy-bg">Therapy</option>
                <option value="Surgery" className="bg-mediBuddy-bg">Surgery</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary outline-none focus:border-mediBuddy-primary/50 transition-all [color-scheme:dark]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Time</label>
                <input type="time" name="time" value={form.time} onChange={handleChange} required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary outline-none focus:border-mediBuddy-primary/50 transition-all [color-scheme:dark]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Doctor</label>
              <input type="text" name="doctor" value={form.doctor} onChange={handleChange} placeholder="e.g. Dr. Sarah L." required
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-mediBuddy-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Notes (optional)</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Additional notes..."
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-mediBuddy-primary/50 transition-all resize-none" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-mediBuddy-primary hover:bg-mediBuddy-dark text-white px-5 py-3 rounded-xl font-medium transition-all shadow-[0_8px_20px_rgba(47,158,143,0.3)] hover:shadow-[0_8px_25px_rgba(47,158,143,0.4)]">
              <Plus className="w-5 h-5" />
              Schedule Appointment
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
