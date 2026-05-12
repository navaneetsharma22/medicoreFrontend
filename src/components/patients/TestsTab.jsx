import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function TestsTab({ patient }) {
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
              <p className="text-text-secondary text-xs">{test.date} · Result: <span className={test.result === 'Normal' || test.result === 'Clear' ? 'text-mediBuddy-primary' : 'text-text-primary'}>{test.result}</span></p>
            </div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
            test.status === 'completed' ? 'bg-mediBuddy-primary/20 text-mediBuddy-primary border-mediBuddy-primary/20' : 'bg-yellow-400/20 text-yellow-400 border-yellow-400/20'
          }`}>{test.status === 'completed' ? 'Completed' : 'Scheduled'}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
