import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Calendar, Clock } from 'lucide-react';

export default function HistoryTab({ patient }) {
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
              item.status === 'completed' ? 'bg-mediBuddy-primary/20 text-mediBuddy-primary border border-mediBuddy-primary/20' :
              item.status === 'scheduled' ? 'bg-blue-400/20 text-blue-400 border border-blue-400/20' :
              'bg-yellow-400/20 text-yellow-400 border border-yellow-400/20'
            }`}>{item.status === 'completed' ? 'Completed' : item.status === 'scheduled' ? 'Scheduled' : 'Pending'}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
