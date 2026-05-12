import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Calendar, 
  Droplets, Ruler, Scale, Building, Clock, 
  ShieldCheck 
} from 'lucide-react';

export default function InfoTab({ patient }) {
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
            <div className="p-2.5 bg-mediBuddy-primary/10 rounded-lg text-mediBuddy-primary flex-shrink-0">
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
