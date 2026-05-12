import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Eye } from 'lucide-react';

export default function KYCTab({ patient }) {
  const docs = patient?.kycDocuments || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {docs.map((doc, i) => (
        <motion.div key={doc.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className={`p-2.5 rounded-lg flex-shrink-0 ${doc.status === 'verified' ? 'bg-mediBuddy-primary/10 text-mediBuddy-primary' : 'bg-yellow-400/10 text-yellow-400'}`}>
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-medium text-sm truncate">{doc.name}</p>
              <p className="text-text-secondary text-xs mt-0.5">Uploaded: {doc.uploadedDate} {doc.verifiedDate ? `· Verified: ${doc.verifiedDate}` : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
              doc.status === 'verified' ? 'bg-mediBuddy-primary/20 text-mediBuddy-primary border-mediBuddy-primary/20' : 'bg-yellow-400/20 text-yellow-400 border-yellow-400/20'
            }`}>{doc.status === 'verified' ? 'Verified' : 'Pending'}</span>
            {doc.status === 'pending' && (
              <button className="p-2 hover:bg-mediBuddy-primary/10 rounded-lg transition text-mediBuddy-primary" title="Upload document">
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
