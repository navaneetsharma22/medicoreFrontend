import React from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  FileText, Upload, Eye, Download, 
  Activity, ShieldCheck, Heart, Stethoscope, 
  Plus, User 
} from 'lucide-react';
import { uploadMedicalRecord } from '../../services/api';
import { toast } from 'react-hot-toast';

export default function RecordsTab({ patient }) {
  const queryClient = useQueryClient();
  const records = patient?.records || [];

  const uploadMutation = useMutation({
    mutationFn: ({ id, formData }) => uploadMedicalRecord(id, formData),
    onSuccess: () => {
      toast.success('Record uploaded successfully');
      queryClient.invalidateQueries({ queryKey: ['patient', patient?._id] });
    },
    onError: (error) => {
      toast.error(error.message || 'Upload failed');
    }
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    formData.append('type', file.type.includes('pdf') ? 'Lab Report' : 'Clinical Note');

    uploadMutation.mutate({ id: patient?._id, formData });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Medical Records</h3>
          <p className="text-text-secondary text-xs">Manage and view patient documents.</p>
        </div>
        <label className="cursor-pointer bg-mediBuddy-primary hover:bg-mediBuddy-dark text-white px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 shadow-lg hover:-translate-y-0.5">
          {uploadMutation.isPending ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          {uploadMutation.isPending ? 'Uploading...' : 'Upload New'}
          <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploadMutation.isPending} />
        </label>
      </div>

      {records.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 text-text-secondary opacity-60">
          <FileText className="w-12 h-12 mb-3 text-white/20" />
          <p className="text-sm italic">No medical records found for this patient.</p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {records.map((rec, i) => {
            const typeIcons = { 'Lab Report': Activity, 'Imaging': Eye, 'Insurance': ShieldCheck, 'Clinical Note': FileText, 'Prescription': Heart, 'Treatment Plan': Stethoscope, 'Vaccination': Plus, 'Identity': User };
            const Icon = typeIcons[rec.type] || FileText;
            return (
              <motion.div key={rec.id || i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-2.5 bg-mediBuddy-primary/10 rounded-lg text-mediBuddy-primary flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm truncate">{rec.name}</p>
                    <div className="flex items-center gap-3 text-text-secondary text-xs mt-0.5">
                      <span>{rec.type}</span>
                      <span>·</span>
                      <span>{new Date(rec.date).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>{rec.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a 
                    href={rec.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-lg transition text-text-secondary hover:text-white" title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                  <a 
                    href={rec.url} 
                    download
                    target="_blank"
                    className="p-2 hover:bg-mediBuddy-primary/10 rounded-lg transition text-text-secondary hover:text-mediBuddy-primary" title="Download">
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
