import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Mail, Phone, Calendar, MapPin, 
  Clock, Activity, FileText, CheckCircle, 
  Plus, ShieldCheck, AlertCircle, X, User,
  Download, Eye, Stethoscope, Heart, Droplets,
  Building, Upload, ChevronDown, ChevronUp,
  Search, Scale, Ruler, Fingerprint
} from 'lucide-react';
import Header from '../components/Header';
import { createPatient } from '../services/api';

/* ─── Add Patient Modal ─── */
import { fetchDoctors } from '../services/api';

function AddPatientModal({ onClose, onPatientAdded }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '',
    idProof: '', height: '', weight: '', appointmentReason: '',
    avatar: '', doctorId: ''
  });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchDoctors().then(setDoctors).catch(console.error);
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newPatient = await createPatient(form);
      setSubmitted(true);
      setTimeout(() => {
        onPatientAdded(newPatient);
        onClose();
      }, 1500);
    } catch (err) {
      alert('Failed to add patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="glass-card rounded-2xl p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded-lg transition">
          <X className="w-5 h-5 text-text-secondary" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-1">Add New Patient</h2>
        <p className="text-text-secondary text-sm mb-6">Register a new patient into the system.</p>

        {submitted ? (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10">
            <div className="w-16 h-16 bg-medicore-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-medicore-primary" />
            </div>
            <h3 className="text-lg font-bold text-white">Patient Added!</h3>
            <p className="text-text-secondary text-sm mt-1">Successfully registered {form.name}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Gmail Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">ID Proof (Passport/License)</label>
                <div className="relative">
                  <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input type="text" name="idProof" value={form.idProof} onChange={handleChange} required placeholder="ID Number"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Residential Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
                <textarea name="address" value={form.address} onChange={handleChange} required placeholder="Full address..." rows={2}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all resize-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Height</label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input type="text" name="height" value={form.height} onChange={handleChange} placeholder="e.g. 175cm"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Weight</label>
                <div className="relative">
                  <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input type="text" name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 70kg"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all" />
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium text-text-primary">Patient Image URL</label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input type="text" name="avatar" value={form.avatar} onChange={handleChange} placeholder="https://..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Assign Doctor</label>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <select 
                  name="doctorId" 
                  value={form.doctorId} 
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary outline-none focus:border-medicore-primary/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#1e293b]">Select Doctor</option>
                  {doctors.map(doc => (
                    <option key={doc.id} value={doc.id} className="bg-[#1e293b]">{doc.name} ({doc.specialization})</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Appointment Reason</label>
              <textarea name="appointmentReason" value={form.appointmentReason} onChange={handleChange} required placeholder="Describe the reason for visit..." rows={3}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all resize-none" />
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-medicore-primary hover:bg-medicore-dark text-white px-5 py-3 rounded-xl font-medium transition-all shadow-[0_8px_20px_rgba(47,158,143,0.3)] hover:shadow-[0_8px_25px_rgba(47,158,143,0.4)] disabled:opacity-50">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Plus className="w-5 h-5" /> Add Patient</>}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Appointment Modal ─── */
function AppointmentModal({ patient, onClose }) {
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
            <div className="w-16 h-16 bg-medicore-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-medicore-primary" />
            </div>
            <h3 className="text-lg font-bold text-white">Appointment Created!</h3>
            <p className="text-text-secondary text-sm mt-1">Successfully scheduled for {form.date} at {form.time}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Appointment Type</label>
              <select name="type" value={form.type} onChange={handleChange} required
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary outline-none focus:border-medicore-primary/50 transition-all appearance-none cursor-pointer">
                <option value="Consultation" className="bg-[#1e293b]">Consultation</option>
                <option value="Follow-up" className="bg-[#1e293b]">Follow-up</option>
                <option value="Checkup" className="bg-[#1e293b]">Checkup</option>
                <option value="Lab Work" className="bg-[#1e293b]">Lab Work</option>
                <option value="Therapy" className="bg-[#1e293b]">Therapy</option>
                <option value="Surgery" className="bg-[#1e293b]">Surgery</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary outline-none focus:border-medicore-primary/50 transition-all [color-scheme:dark]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Time</label>
                <input type="time" name="time" value={form.time} onChange={handleChange} required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary outline-none focus:border-medicore-primary/50 transition-all [color-scheme:dark]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Doctor</label>
              <input type="text" name="doctor" value={form.doctor} onChange={handleChange} placeholder="e.g. Dr. Sarah L." required
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Notes (optional)</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Additional notes..."
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all resize-none" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-medicore-primary hover:bg-medicore-dark text-white px-5 py-3 rounded-xl font-medium transition-all shadow-[0_8px_20px_rgba(47,158,143,0.3)] hover:shadow-[0_8px_25px_rgba(47,158,143,0.4)]">
              <Plus className="w-5 h-5" />
              Schedule Appointment
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Tab: Info ─── */
function InfoTab({ patient }) {
  const infoItems = [
    { icon: User, label: 'Full Name', value: patient?.name },
    { icon: Mail, label: 'Email', value: patient?.email },
    { icon: Phone, label: 'Phone', value: patient?.phone },
    { icon: MapPin, label: 'Address', value: patient?.address },
    { icon: Calendar, label: 'Date of Birth', value: patient?.dob },
    { icon: User, label: 'Gender', value: patient?.gender || 'Not specified' },
    { icon: Droplets, label: 'Blood Group', value: patient?.bloodGroup || 'Not specified' },
    { icon: Ruler, label: 'Height', value: patient?.height },
    { icon: Scale, label: 'Weight', value: patient?.weight },
    { icon: Building, label: 'Center', value: patient?.center },
    { icon: Clock, label: 'Registered On', value: patient?.date },
    { icon: ShieldCheck, label: 'KYC Status', value: patient?.kycStatus },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {infoItems.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="p-2.5 bg-medicore-primary/10 rounded-lg text-medicore-primary flex-shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-text-secondary text-xs">{item.label}</p>
              <p className="text-white font-medium text-sm truncate">{item.value || '—'}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ─── Tab: Appointments ─── */
function AppointmentsTab({ patient }) {
  const appointments = patient?.appointments || [
    { id: 'ap1', type: 'Current', title: 'General Consultation', doctor: 'Dr. Sarah L.', date: '2023-12-15', time: '10:00 AM', status: 'upcoming' },
    { id: 'ap2', type: 'Previous', title: 'Blood Test Follow-up', doctor: 'Dr. Mark R.', date: '2023-11-20', time: '02:30 PM', status: 'completed' },
    { id: 'ap3', type: 'Previous', title: 'Initial Screening', doctor: 'Dr. Sarah L.', date: '2023-10-15', time: '09:00 AM', status: 'completed' },
  ];

  const current = appointments.filter(a => a.type === 'Current' || a.status === 'upcoming');
  const previous = appointments.filter(a => a.type === 'Previous' || a.status === 'completed');

  const renderList = (list, title) => (
    <div className="space-y-4 mb-8 last:mb-0">
      <h4 className="text-text-secondary text-sm font-semibold uppercase tracking-wider">{title}</h4>
      {list.length > 0 ? (
        list.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-all group">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${item.status === 'upcoming' ? 'bg-medicore-primary/20 text-medicore-primary' : 'bg-white/5 text-text-secondary'}`}>
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-white font-medium">{item.title}</h5>
                <p className="text-text-secondary text-sm flex items-center gap-2">
                  <span>{item.doctor}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{item.date} at {item.time}</span>
                </p>
              </div>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-md font-medium capitalize ${
              item.status === 'upcoming' ? 'bg-medicore-primary/20 text-medicore-primary' : 'bg-white/10 text-text-secondary'
            }`}>{item.status}</span>
          </motion.div>
        ))
      ) : <p className="text-text-secondary text-sm italic">No {title.toLowerCase()} appointments.</p>}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
      {renderList(current, 'Current & Upcoming')}
      {renderList(previous, 'Previous Appointments')}
    </motion.div>
  );
}

/* ─── Tab: Tests ─── */
function TestsTab({ patient }) {
  const tests = patient?.tests || [
    { id: 't1', name: 'Complete Blood Count (CBC)', date: '2023-11-20', result: 'Normal', status: 'completed' },
    { id: 't2', name: 'Lipid Profile', date: '2023-11-20', result: 'Normal', status: 'completed' },
    { id: 't3', name: 'X-Ray Chest', date: '2023-10-15', result: 'Clear', status: 'completed' },
    { id: 't4', name: 'Thyroid Function Test', date: '2023-12-20', result: 'Pending', status: 'scheduled' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
      {tests.map((test, i) => (
        <motion.div key={test.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-lg ${test.status === 'completed' ? 'bg-blue-500/10 text-blue-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-medium">{test.name}</p>
              <p className="text-text-secondary text-xs">{test.date} · Result: <span className={test.result === 'Normal' || test.result === 'Clear' ? 'text-medicore-primary' : 'text-text-primary'}>{test.result}</span></p>
            </div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
            test.status === 'completed' ? 'bg-medicore-primary/20 text-medicore-primary border-medicore-primary/20' : 'bg-yellow-400/20 text-yellow-400 border-yellow-400/20'
          }`}>{test.status === 'completed' ? 'Completed' : 'Scheduled'}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Tab: History ─── */
function HistoryTab({ patient }) {
  const history = patient?.history || [];
  const typeColors = {
    Consultation: 'bg-blue-400/20 text-blue-400 border-blue-400/20',
    'Follow-up': 'bg-purple-400/20 text-purple-400 border-purple-400/20',
    'Lab Work': 'bg-amber-400/20 text-amber-400 border-amber-400/20',
    Surgery: 'bg-red-400/20 text-red-400 border-red-400/20',
    Therapy: 'bg-teal-400/20 text-teal-400 border-teal-400/20',
    Checkup: 'bg-green-400/20 text-green-400 border-green-400/20',
    Vaccination: 'bg-indigo-400/20 text-indigo-400 border-indigo-400/20',
    Prescription: 'bg-pink-400/20 text-pink-400 border-pink-400/20',
    Referral: 'bg-orange-400/20 text-orange-400 border-orange-400/20',
    Registration: 'bg-gray-400/20 text-gray-400 border-gray-400/20',
    'Physical Exam': 'bg-emerald-400/20 text-emerald-400 border-emerald-400/20',
    'Dental Checkup': 'bg-cyan-400/20 text-cyan-400 border-cyan-400/20',
    'Eye Exam': 'bg-violet-400/20 text-violet-400 border-violet-400/20',
  };

  if (history.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 text-text-secondary opacity-60">
        <Stethoscope className="w-12 h-12 mb-3 text-white/20" />
        <p className="text-sm italic">No visit history found for this patient.</p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {history.map((item, i) => (
        <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
          className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${typeColors[item.type] || 'bg-gray-400/20 text-gray-400 border-gray-400/20'}`}>{item.type}</span>
              <span className="text-white font-medium text-sm">{item.doctor}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{item.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.time}</span>
            </div>
          </div>
          <p className="text-sm text-text-secondary">{item.notes}</p>
          <div className="mt-3">
            <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${
              item.status === 'completed' ? 'bg-medicore-primary/20 text-medicore-primary border border-medicore-primary/20' :
              item.status === 'scheduled' ? 'bg-blue-400/20 text-blue-400 border border-blue-400/20' :
              'bg-yellow-400/20 text-yellow-400 border border-yellow-400/20'
            }`}>{item.status === 'completed' ? 'Completed' : item.status === 'scheduled' ? 'Scheduled' : 'Pending'}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Tab: KYC ─── */
function KYCTab({ patient }) {
  const docs = patient?.kycDocuments || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {docs.map((doc, i) => (
        <motion.div key={doc.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className={`p-2.5 rounded-lg flex-shrink-0 ${doc.status === 'verified' ? 'bg-medicore-primary/10 text-medicore-primary' : 'bg-yellow-400/10 text-yellow-400'}`}>
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-medium text-sm truncate">{doc.name}</p>
              <p className="text-text-secondary text-xs mt-0.5">Uploaded: {doc.uploadedDate} {doc.verifiedDate ? `· Verified: ${doc.verifiedDate}` : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
              doc.status === 'verified' ? 'bg-medicore-primary/20 text-medicore-primary border-medicore-primary/20' : 'bg-yellow-400/20 text-yellow-400 border-yellow-400/20'
            }`}>{doc.status === 'verified' ? 'Verified' : 'Pending'}</span>
            {doc.status === 'pending' && (
              <button className="p-2 hover:bg-medicore-primary/10 rounded-lg transition text-medicore-primary" title="Upload document">
                <Upload className="w-4 h-4" />
              </button>
            )}
            {doc.status === 'verified' && (
              <button className="p-2 hover:bg-white/10 rounded-lg transition text-text-secondary" title="View document">
                <Eye className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Tab: Records ─── */
function RecordsTab({ patient }) {
  const records = patient?.records || [];

  if (records.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 text-text-secondary opacity-60">
        <FileText className="w-12 h-12 mb-3 text-white/20" />
        <p className="text-sm italic">No medical records found for this patient.</p>
      </motion.div>
    );
  }

  const typeIcons = { 'Lab Report': Activity, 'Imaging': Eye, 'Insurance': ShieldCheck, 'Clinical Note': FileText, 'Prescription': Heart, 'Treatment Plan': Stethoscope, 'Vaccination': Plus, 'Identity': User };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
      {records.map((rec, i) => {
        const Icon = typeIcons[rec.type] || FileText;
        return (
          <motion.div key={rec.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-2.5 bg-medicore-primary/10 rounded-lg text-medicore-primary flex-shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-medium text-sm truncate">{rec.name}</p>
                <div className="flex items-center gap-3 text-text-secondary text-xs mt-0.5">
                  <span>{rec.type}</span>
                  <span>·</span>
                  <span>{rec.date}</span>
                  <span>·</span>
                  <span>{rec.size}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-2 hover:bg-white/10 rounded-lg transition text-text-secondary hover:text-white" title="View">
                <Eye className="w-4 h-4" />
              </button>
              <button 
                onClick={() => alert(`Downloading ${rec.name}...`)}
                className="p-2 hover:bg-medicore-primary/10 rounded-lg transition text-text-secondary hover:text-medicore-primary" title="Download">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function Patients() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patientId = id || '1';
  
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Info');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showAllTimeline, setShowAllTimeline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPatient = async (pid) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/patients/${pid}`);
      if (!response.ok) throw new Error(`Patient ${pid} not found`);
      const data = await response.json();
      setPatient(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatient(patientId);
  }, [patientId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/patients/${searchQuery}`);
      setSearchQuery('');
    }
  };

  const tabs = ['Info', 'Appointments', 'Tests', 'History', 'KYC', 'Records'];
  const TIMELINE_PREVIEW_COUNT = 3;
  const timelineItems = patient?.timeline || [];
  const visibleTimeline = showAllTimeline ? timelineItems : timelineItems.slice(0, TIMELINE_PREVIEW_COUNT);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Info': return <InfoTab patient={patient} />;
      case 'Appointments': return <AppointmentsTab patient={patient} />;
      case 'Tests': return <TestsTab patient={patient} />;
      case 'History': return <HistoryTab patient={patient} />;
      case 'KYC': return <KYCTab patient={patient} />;
      case 'Records': return <RecordsTab patient={patient} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />

      {/* Modals */}
      <AnimatePresence>
        {showAppointmentModal && <AppointmentModal patient={patient} onClose={() => setShowAppointmentModal(false)} />}
        {showAddPatientModal && <AddPatientModal onClose={() => setShowAddPatientModal(false)} onPatientAdded={(p) => navigate(`/patients/${p.id}`)} />}
      </AnimatePresence>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search patient by ID (e.g. 1, 2, 3)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all"
          />
        </form>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setShowAddPatientModal(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-medium border border-white/10 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Patient
          </button>
          <button 
            onClick={() => setShowAppointmentModal(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-medicore-primary hover:bg-medicore-dark text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_8px_20px_rgba(47,158,143,0.3)]"
          >
            <Calendar className="w-5 h-5" />
            Create Appointment
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-medicore-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error && !patient ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 glass-card rounded-2xl animate-fade-in">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Patient Not Found</h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <button onClick={() => navigate('/dashboard')} className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl transition">Go Back</button>
        </div>
      ) : (
        <>
          {/* ─── Patient Header ─── */}
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card rounded-2xl p-6 flex-shrink-0">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div className="flex items-center gap-6">
                <button onClick={() => navigate('/dashboard')} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition" title="Back to Dashboard">
                  <ArrowLeft className="w-5 h-5 text-text-primary" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={patient?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${patient?.name || 'U'}`} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-medicore-primary" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-[#1e293b] rounded-full"></div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">{patient?.name || 'Unknown'}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-text-secondary text-sm mt-1.5">
                      <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" />{patient?.email}</div>
                      <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" />{patient?.phone}</div>
                      <div className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider text-text-primary">ID: {patient?.id}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-center px-4 border-r border-white/10">
                  <p className="text-text-secondary text-[10px] uppercase font-bold">Height</p>
                  <p className="text-white font-bold">{patient?.height}</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-text-secondary text-[10px] uppercase font-bold">Weight</p>
                  <p className="text-white font-bold">{patient?.weight}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Tabs ─── */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex gap-2 border-b border-white/10 pb-2 overflow-x-auto hide-scrollbar flex-shrink-0">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab ? 'bg-medicore-primary text-white shadow-[0_4px_15px_rgba(47,158,143,0.3)]' : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}>
                {tab}
              </button>
            ))}
          </motion.div>

          {/* ─── Main Content ─── */}
          <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 pb-6 pt-2">

            {/* Left Panel - KYC Summary */}
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="lg:w-1/3 flex flex-col gap-6">
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-medicore-primary" />
                  KYC Summary
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button onClick={() => setActiveTab('KYC')} className="bg-white/5 border border-white/10 rounded-xl p-4 transition-colors hover:bg-white/10 text-left hover:border-medicore-primary/30">
                    <p className="text-text-secondary text-sm mb-1">Total</p>
                    <p className="text-2xl font-bold text-white">{patient?.kyc?.total || 0}</p>
                  </button>
                  <button onClick={() => setActiveTab('KYC')} className="bg-white/5 border border-white/10 rounded-xl p-4 transition-colors hover:bg-white/10 text-left hover:border-yellow-400/30">
                    <p className="text-text-secondary text-sm mb-1">Pending</p>
                    <p className="text-2xl font-bold text-yellow-400">{patient?.kyc?.pending || 0}</p>
                  </button>
                  <button onClick={() => setActiveTab('KYC')} className="bg-white/5 border border-white/10 rounded-xl p-4 col-span-2 transition-colors hover:bg-white/10 relative overflow-hidden group text-left hover:border-medicore-primary/30 border border-white/10">
                    <div className="absolute inset-0 bg-medicore-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-text-secondary text-sm mb-1 relative z-10">Completed</p>
                    <div className="flex items-end justify-between relative z-10">
                      <p className="text-3xl font-bold text-medicore-primary">{patient?.kyc?.completed || 0}</p>
                      <CheckCircle className="w-6 h-6 text-medicore-primary" />
                    </div>
                  </button>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-6 mt-auto">
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="p-2 bg-white/5 rounded-lg text-medicore-primary"><Phone className="w-4 h-4" /></div>
                    {patient?.phone || 'No phone number'}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="p-2 bg-white/5 rounded-lg text-medicore-primary"><MapPin className="w-4 h-4" /></div>
                    {patient?.address || 'No address'}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="p-2 bg-white/5 rounded-lg text-medicore-primary"><Calendar className="w-4 h-4" /></div>
                    DOB: {patient?.dob || 'N/A'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Tab Content + Timeline */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="lg:w-2/3 flex flex-col gap-6 h-full">

              {/* Tab Content */}
              <div className="glass-card rounded-2xl p-6 flex-1 overflow-y-auto custom-scrollbar min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                    {renderTabContent()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Timeline */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-medicore-primary" />
                    Activity Timeline
                  </h3>
                  {timelineItems.length > TIMELINE_PREVIEW_COUNT && (
                    <button onClick={() => setShowAllTimeline(!showAllTimeline)} className="text-sm text-medicore-primary hover:text-white transition-colors flex items-center gap-1">
                      {showAllTimeline ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> View All ({timelineItems.length})</>}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-medicore-primary/50 to-transparent" />
                  <div className="space-y-5">
                    {visibleTimeline.length > 0 ? (
                      visibleTimeline.map((item, index) => (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} key={index} className="relative pl-10">
                          <div className={`absolute left-0 top-1.5 w-7 h-7 rounded-full border-[3px] border-[#1e293b] flex items-center justify-center ${item.status === 'done' ? 'bg-medicore-primary' : 'bg-yellow-400'}`}>
                            {item.status === 'done' ? <CheckCircle className="w-3 h-3 text-[#1e293b]" /> : <Clock className="w-3 h-3 text-[#1e293b]" />}
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                              <span className="text-xs text-text-secondary flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md"><Clock className="w-3 h-3" />{item.date}</span>
                            </div>
                            <p className="text-sm text-text-secondary">{item.description}</p>
                            <div className="mt-3 inline-flex">
                              <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${item.status === 'done' ? 'bg-medicore-primary/20 text-medicore-primary border-medicore-primary/20' : 'bg-yellow-400/20 text-yellow-400 border-yellow-400/20'}`}>
                                {item.status === 'done' ? 'Completed' : 'Pending'}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="pl-10 text-text-secondary text-sm italic flex flex-col items-center justify-center py-10 opacity-60">
                        <FileText className="w-12 h-12 mb-3 text-white/20" />
                        No activity timeline found.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
