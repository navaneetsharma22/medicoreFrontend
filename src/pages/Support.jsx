import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, HelpCircle, Book, MessageSquare, 
  LifeBuoy, Mail, ArrowRight, ExternalLink,
  ChevronRight, FileText, PlayCircle
} from 'lucide-react';
import Header from '../components/Header';

const faqs = [
  { q: 'How do I add a new doctor to the staff?', a: 'Go to the Staff Team page and click on the "Add Member" button at the top right.' },
  { q: 'Can I export billing reports to Excel?', a: 'Yes, navigate to the Billing page and click the "Export Data" button to download a CSV file.' },
  { q: 'How is patient data secured?', a: 'We use AES-256 bank-grade encryption for all medical records and encrypted cloud storage.' },
];

export default function Support() {
  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />

      <div className="flex flex-col gap-8 flex-1 pb-6 overflow-hidden">
        
        {/* Search Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="text-center py-10"
        >
          <h2 className="text-4xl font-extrabold text-white mb-4">How can we help you?</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">Search our knowledge base or get in touch with our specialist support team.</p>
          <div className="relative max-w-2xl mx-auto px-4">
             <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
             <input 
              type="text" 
              placeholder="Search for articles, guides, or support topics..." 
              className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-3xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 shadow-2xl transition-all"
             />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
           {/* Quick Links */}
           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card rounded-3xl p-8 flex flex-col items-center text-center group cursor-pointer hover:bg-medicore-primary/5 transition-all border-medicore-primary/0 hover:border-medicore-primary/30">
              <div className="w-16 h-16 bg-medicore-primary/10 rounded-2xl flex items-center justify-center text-medicore-primary mb-6 group-hover:scale-110 transition-transform">
                 <Book className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Documentation</h3>
              <p className="text-text-secondary text-sm mb-6">In-depth guides on how to use every feature of MediCore.</p>
              <button className="text-medicore-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                 Read Docs <ArrowRight className="w-4 h-4" />
              </button>
           </motion.div>

           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card rounded-3xl p-8 flex flex-col items-center text-center group cursor-pointer hover:bg-blue-500/5 transition-all border-blue-500/0 hover:border-blue-500/30">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                 <PlayCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Video Tutorials</h3>
              <p className="text-text-secondary text-sm mb-6">Visual walk-throughs for administrative and clinical tasks.</p>
              <button className="text-blue-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                 Watch Now <ArrowRight className="w-4 h-4" />
              </button>
           </motion.div>

           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card rounded-3xl p-8 flex flex-col items-center text-center group cursor-pointer hover:bg-purple-500/5 transition-all border-purple-500/0 hover:border-purple-500/30">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                 <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Live Support</h3>
              <p className="text-text-secondary text-sm mb-6">Chat with our engineering team for technical assistance.</p>
              <button className="text-purple-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                 Open Chat <ArrowRight className="w-4 h-4" />
              </button>
           </motion.div>
        </div>

        {/* FAQs */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.4 }}
          className="glass-card rounded-3xl p-10 mb-6"
        >
           <h3 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h3>
           <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                   <div className="flex items-center justify-between">
                      <h4 className="text-white font-bold group-hover:text-medicore-primary transition-colors">{faq.q}</h4>
                      <ChevronRight className="w-5 h-5 text-text-secondary" />
                   </div>
                </div>
              ))}
           </div>
        </motion.div>

      </div>
    </div>
  );
}
