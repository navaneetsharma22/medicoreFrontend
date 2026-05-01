import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Shield, Mail, Phone, MoreHorizontal, 
  Plus, Search, Filter, Star, CheckCircle, X
} from 'lucide-react';
import Header from '../components/Header';
import { fetchDoctors, createDoctor } from '../services/api';

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ name: '', role: '', email: '', phone: '', specialization: '' });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await fetchDoctors();
      setStaff(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await createDoctor(newDoctor);
      setShowModal(false);
      setNewDoctor({ name: '', role: '', email: '', phone: '', specialization: '' });
      loadDoctors();
    } catch (err) {
      alert('Error adding doctor');
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />

      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-3xl p-8 flex-1 flex flex-col overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Staff Team</h2>
            <p className="text-text-secondary text-sm">Manage hospital personnel and doctor schedules</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search staff..." 
                  className="pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50"
                />
             </div>
             <button className="bg-medicore-primary hover:bg-medicore-dark text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg transition flex items-center gap-2" onClick={() => setShowModal(true)}>
                <Plus className="w-5 h-5" /> Add Member
             </button>
          </div>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center text-text-secondary">Loading team...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar pr-2">
             {staff.map((member, i) => (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.05 }}
                 key={member.id}
                 className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all group relative overflow-hidden"
               >
                 <div className="absolute top-0 right-0 p-4">
                    <button className="text-text-secondary hover:text-white p-1"><MoreHorizontal className="w-5 h-5" /></button>
                 </div>
                 
                 <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img src={member.avatar} className="w-16 h-16 rounded-2xl border-2 border-white/10 object-cover" alt="" />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-[#1e293b] rounded-full ${
                        member.status === 'active' ? 'bg-green-500' : 'bg-amber-500'
                      }`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-medicore-primary transition-colors">{member.name}</h4>
                      <p className="text-medicore-primary text-xs font-bold uppercase tracking-wider">{member.role}</p>
                    </div>
                 </div>

                 <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-text-secondary text-sm">
                      <Mail className="w-4 h-4" /> {member.email}
                    </div>
                    <div className="flex items-center gap-3 text-text-secondary text-sm">
                      <Phone className="w-4 h-4" /> {member.phone}
                    </div>
                 </div>

                 <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex -space-x-2">
                       {Array.from({ length: 3 }).map((_, j) => (
                          <div key={j} className="w-8 h-8 rounded-full bg-white/5 border border-[#1e293b] flex items-center justify-center text-[10px] font-bold text-white">
                             <User className="w-3.5 h-3.5 text-text-secondary" />
                          </div>
                       ))}
                    </div>
                    <button className="text-xs font-bold text-medicore-primary hover:text-white transition-colors flex items-center gap-1.5">
                       View Schedule <CheckCircle className="w-3.5 h-3.5" />
                    </button>
                 </div>
               </motion.div>
             ))}
          </div>
        )}
      </motion.div>

      {/* Add Doctor Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg glass-card rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Add New Doctor</h3>
                <button onClick={() => setShowModal(false)} className="text-text-secondary hover:text-white transition"><X className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleAddDoctor} className="space-y-4">
                <input type="text" placeholder="Full Name" required className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-text-primary outline-none focus:border-medicore-primary/50" value={newDoctor.name} onChange={e => setNewDoctor({...newDoctor, name: e.target.value})} />
                <input type="text" placeholder="Role (e.g. Cardiologist)" required className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-text-primary outline-none focus:border-medicore-primary/50" value={newDoctor.role} onChange={e => setNewDoctor({...newDoctor, role: e.target.value})} />
                <input type="email" placeholder="Email Address" required className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-text-primary outline-none focus:border-medicore-primary/50" value={newDoctor.email} onChange={e => setNewDoctor({...newDoctor, email: e.target.value})} />
                <input type="tel" placeholder="Phone Number" required className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-text-primary outline-none focus:border-medicore-primary/50" value={newDoctor.phone} onChange={e => setNewDoctor({...newDoctor, phone: e.target.value})} />
                <input type="text" placeholder="Specialization" className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-text-primary outline-none focus:border-medicore-primary/50" value={newDoctor.specialization} onChange={e => setNewDoctor({...newDoctor, specialization: e.target.value})} />
                
                <button type="submit" className="w-full py-4 bg-medicore-primary hover:bg-medicore-dark text-white rounded-2xl font-bold transition-all shadow-lg mt-4">
                  Confirm Registration
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

