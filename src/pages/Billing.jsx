import React from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, DollarSign, Download, Filter, 
  MoreVertical, ArrowUpRight, ArrowDownLeft,
  Calendar, CheckCircle, Clock
} from 'lucide-react';
import Header from '../components/Header';

const transactions = [
  { id: 1, patient: 'Alice Walker', type: 'Consultation', amount: '$150.00', date: 'Dec 14, 2023', status: 'paid', method: 'Visa **** 4422' },
  { id: 2, patient: 'Robert Fox', type: 'Lab Test', amount: '$420.00', date: 'Dec 12, 2023', status: 'pending', method: 'Insurance' },
  { id: 3, patient: 'Esther Howard', type: 'Pharmacy', amount: '$85.50', date: 'Dec 10, 2023', status: 'paid', method: 'MasterCard' },
  { id: 4, patient: 'Jenny Wilson', type: 'Surgery', amount: '$2,800.00', date: 'Dec 08, 2023', status: 'overdue', method: 'Credit' },
];

export default function Billing() {
  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
         <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card rounded-3xl p-6 bg-gradient-to-br from-medicore-primary/20 to-transparent">
            <div className="flex items-center justify-between mb-4">
               <div className="p-3 bg-medicore-primary/20 rounded-2xl text-medicore-primary"><DollarSign className="w-6 h-6" /></div>
               <span className="text-[10px] font-bold text-medicore-primary uppercase tracking-widest bg-medicore-primary/10 px-2 py-1 rounded-lg">Revenue</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">$45,200.00</h3>
            <p className="text-text-secondary text-sm">Total earnings this month</p>
         </motion.div>

         <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
               <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-500"><Clock className="w-6 h-6" /></div>
               <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-1 rounded-lg">Pending</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">$8,450.00</h3>
            <p className="text-text-secondary text-sm">Unpaid invoices pending</p>
         </motion.div>

         <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
               <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-500"><CreditCard className="w-6 h-6" /></div>
               <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded-lg">Payouts</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">$32,100.00</h3>
            <p className="text-text-secondary text-sm">Transferred to bank account</p>
         </motion.div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-3xl p-8 flex-1 flex flex-col overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Transaction History</h2>
            <p className="text-text-secondary text-sm">Monitor all patient payments and clinic financials</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-text-primary text-sm hover:bg-white/10 transition">
                <Filter className="w-4 h-4" /> Filter
             </button>
             <button className="bg-medicore-primary hover:bg-medicore-dark text-white px-5 py-2 rounded-xl font-bold shadow-lg transition">
                Export Data
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
             <thead>
                <tr className="border-b border-white/10">
                   <th className="py-4 px-4 text-xs font-bold text-text-secondary uppercase tracking-widest">Patient</th>
                   <th className="py-4 px-4 text-xs font-bold text-text-secondary uppercase tracking-widest">Type</th>
                   <th className="py-4 px-4 text-xs font-bold text-text-secondary uppercase tracking-widest">Amount</th>
                   <th className="py-4 px-4 text-xs font-bold text-text-secondary uppercase tracking-widest">Date</th>
                   <th className="py-4 px-4 text-xs font-bold text-text-secondary uppercase tracking-widest">Status</th>
                   <th className="py-4 px-4 text-xs font-bold text-text-secondary uppercase tracking-widest">Method</th>
                   <th className="py-4 px-4 text-xs font-bold text-text-secondary uppercase tracking-widest text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {transactions.map((tx, i) => (
                   <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-4">
                         <span className="text-white font-bold text-sm">{tx.patient}</span>
                      </td>
                      <td className="py-4 px-4">
                         <span className="text-text-secondary text-sm">{tx.type}</span>
                      </td>
                      <td className="py-4 px-4">
                         <span className="text-white font-bold text-sm">{tx.amount}</span>
                      </td>
                      <td className="py-4 px-4 text-text-secondary text-sm">{tx.date}</td>
                      <td className="py-4 px-4">
                         <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${
                            tx.status === 'paid' ? 'bg-medicore-primary/20 text-medicore-primary' :
                            tx.status === 'pending' ? 'bg-amber-500/20 text-amber-500' :
                            'bg-red-500/20 text-red-400'
                         }`}>
                            {tx.status}
                         </span>
                      </td>
                      <td className="py-4 px-4 text-text-secondary text-sm">{tx.method}</td>
                      <td className="py-4 px-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-white/10 rounded-xl transition text-text-secondary hover:text-white"><Download className="w-4 h-4" /></button>
                            <button className="p-2 hover:bg-white/10 rounded-xl transition text-text-secondary hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
