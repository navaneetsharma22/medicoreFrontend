import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function AppointmentsTab({ patient }) {
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
              <div className={`p-3 rounded-xl ${item.status === 'upcoming' ? 'bg-mediBuddy-primary/20 text-mediBuddy-primary' : 'bg-white/5 text-text-secondary'}`}>
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
              item.status === 'upcoming' ? 'bg-mediBuddy-primary/20 text-mediBuddy-primary' : 'bg-white/10 text-text-secondary'
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
