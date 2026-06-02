import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Pill, Plus, Search, FileText, CheckCircle } from 'lucide-react';

export default function PrescriptionModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedMeds, setSelectedMeds] = useState([]);

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
          <div className="p-3 bg-blue-500/20 rounded-2xl">
            <Pill className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">Digital Prescription</h2>
        </div>
        <p className="text-text-secondary text-lg mb-8">Create and issue medical prescriptions securely.</p>

        {submitted ? (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10">
            <div className="w-20 h-20 bg-mediBuddy-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-mediBuddy-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white">Prescription Issued!</h3>
            <p className="text-text-secondary text-lg mt-2">Sent to patient and synchronized with pharmacy.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Patient Search</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search by name or patient ID..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-text-primary placeholder:text-text-secondary outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-text-primary">Medications</label>
              <div className="p-6 bg-white/5 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/10 transition-all group">
                <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-text-secondary" />
                </div>
                <p className="text-text-secondary font-medium">Add medication from database</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Special Instructions</label>
              <textarea 
                rows={3}
                placeholder="e.g. To be taken after meals, twice daily..."
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-text-primary placeholder:text-text-secondary outline-none focus:border-blue-500/50 transition-all resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 px-6 py-4 rounded-2xl font-bold text-white bg-white/5 hover:bg-white/10 transition-all"
              >
                Draft
              </button>
              <button 
                type="submit" 
                className="flex-[2] flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20"
              >
                <FileText className="w-6 h-6" />
                Issue Prescription
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
