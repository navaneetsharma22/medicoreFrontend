import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  X, User, Phone, Mail, ChevronDown, CheckCircle, Plus 
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createPatient } from '../../services/api';
import { toast } from 'react-hot-toast';

const patientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce.number().min(0, 'Age cannot be negative').max(120, 'Age must be valid'),
  gender: z.enum(['Male', 'Female', 'Other'], {
    errorMap: () => ({ message: 'Please select a gender' })
  }),
  contact: z.string().min(10, 'Contact must be at least 10 digits'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
});

export default function AddPatientModal({ onClose }) {
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: '',
      age: '',
      gender: '',
      contact: '',
      email: ''
    }
  });

  const addPatientMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Patient registered successfully!');
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      setTimeout(() => {
        onClose();
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add patient');
    }
  });

  const onSubmit = (data) => {
    addPatientMutation.mutate(data);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="glass-card rounded-2xl p-6 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded-lg transition">
          <X className="w-5 h-5 text-text-secondary" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-1">Add New Patient</h2>
        <p className="text-text-secondary text-sm mb-6">Register a new patient into the system.</p>

        {submitted ? (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10">
            <div className="w-16 h-16 bg-mediBuddy-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-mediBuddy-primary" />
            </div>
            <h3 className="text-lg font-bold text-white">Patient Added!</h3>
            <p className="text-text-secondary text-sm mt-1">The records have been updated.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Full Name</label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.name ? 'text-red-400' : 'text-text-secondary'}`} />
                <input 
                  {...register('name')}
                  type="text" 
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white/5 border rounded-xl text-text-primary placeholder:text-text-secondary outline-none transition-all ${
                    errors.name ? 'border-red-400/50 focus:border-red-400' : 'border-white/10 focus:border-mediBuddy-primary/50'
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-red-400 font-medium pl-1">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Age</label>
                <input 
                  {...register('age')}
                  type="number" 
                  placeholder="25"
                  className={`w-full px-4 py-2.5 bg-white/5 border rounded-xl text-text-primary placeholder:text-text-secondary outline-none transition-all ${
                    errors.age ? 'border-red-400/50 focus:border-red-400' : 'border-white/10 focus:border-mediBuddy-primary/50'
                  }`}
                />
                {errors.age && <p className="text-xs text-red-400 font-medium pl-1">{errors.age.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Gender</label>
                <div className="relative">
                  <select 
                    {...register('gender')}
                    className={`w-full px-4 py-2.5 bg-white/5 border rounded-xl text-text-primary outline-none transition-all appearance-none cursor-pointer ${
                      errors.gender ? 'border-red-400/50 focus:border-red-400' : 'border-white/10 focus:border-mediBuddy-primary/50'
                    }`}
                  >
                    <option value="" className="bg-mediBuddy-bg">Select Gender</option>
                    <option value="Male" className="bg-mediBuddy-bg">Male</option>
                    <option value="Female" className="bg-mediBuddy-bg">Female</option>
                    <option value="Other" className="bg-mediBuddy-bg">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                </div>
                {errors.gender && <p className="text-xs text-red-400 font-medium pl-1">{errors.gender.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Contact Number</label>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.contact ? 'text-red-400' : 'text-text-secondary'}`} />
                <input 
                  {...register('contact')}
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white/5 border rounded-xl text-text-primary placeholder:text-text-secondary outline-none transition-all ${
                    errors.contact ? 'border-red-400/50 focus:border-red-400' : 'border-white/10 focus:border-mediBuddy-primary/50'
                  }`}
                />
              </div>
              {errors.contact && <p className="text-xs text-red-400 font-medium pl-1">{errors.contact.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Email (Optional)</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.email ? 'text-red-400' : 'text-text-secondary'}`} />
                <input 
                  {...register('email')}
                  type="email" 
                  placeholder="john@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white/5 border rounded-xl text-text-primary placeholder:text-text-secondary outline-none transition-all ${
                    errors.email ? 'border-red-400/50 focus:border-red-400' : 'border-white/10 focus:border-mediBuddy-primary/50'
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-400 font-medium pl-1">{errors.email.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={addPatientMutation.isPending} 
              className="w-full flex items-center justify-center gap-2 bg-mediBuddy-primary hover:bg-mediBuddy-dark text-white px-5 py-3 rounded-xl font-medium transition-all shadow-[0_8px_20px_rgba(47,158,143,0.3)] hover:shadow-[0_8px_25px_rgba(47,158,143,0.4)] disabled:opacity-50 mt-2"
            >
              {addPatientMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><Plus className="w-5 h-5" /> Add Patient</>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
