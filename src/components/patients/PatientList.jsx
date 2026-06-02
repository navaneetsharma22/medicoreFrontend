import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Search, Filter, Phone, Mail, 
  Calendar, ChevronRight, Activity, ShieldCheck 
} from 'lucide-react';
import { fetchPatients } from '../../services/api';
import { ListSkeleton } from '../SkeletonLoader';

export default function PatientList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const { data: patients, isLoading, error } = useQuery({
    queryKey: ['patients', { search: searchTerm, kycStatus: filter }],
    queryFn: () => fetchPatients({ search: searchTerm, kycStatus: filter }),
  });

  const kycStatusColors = {
    'Verified': 'bg-green-500/20 text-green-400 border-green-500/20',
    'Pending': 'bg-amber-500/20 text-amber-400 border-amber-500/20',
    'Incomplete': 'bg-rose-500/20 text-rose-400 border-rose-500/20',
    'All': 'bg-white/10 text-text-secondary border-white/10'
  };

  return (
    <div className="space-y-6">
      {/* List Header & Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white/5 p-6 rounded-[24px] border border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-white">Patient Registry</h2>
          <p className="text-text-secondary">Manage and monitor all registered patients.</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          {['All', 'Verified', 'Pending', 'Incomplete'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                filter === status 
                ? 'bg-mediBuddy-primary text-white border-mediBuddy-primary shadow-lg shadow-mediBuddy-primary/20' 
                : 'bg-white/5 text-text-secondary border-white/10 hover:bg-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      {isLoading ? (
        <ListSkeleton count={6} />
      ) : error ? (
        <div className="glass-card p-12 text-center">
          <Activity className="w-12 h-12 text-rose-500 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-white">Registry Sync Failed</h3>
          <p className="text-text-secondary mt-2">Could not connect to the clinical database.</p>
        </div>
      ) : patients?.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <User className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-30" />
          <h3 className="text-xl font-bold text-white">No Patients Found</h3>
          <p className="text-text-secondary mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient, index) => (
            <motion.div
              key={patient._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/patients/${patient._id}`)}
              className="glass-card p-6 group cursor-pointer hover:border-mediBuddy-primary/50 transition-all relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck className="w-20 h-20 text-mediBuddy-primary" />
              </div>

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="w-14 h-14 bg-mediBuddy-primary/20 rounded-2xl flex items-center justify-center border border-mediBuddy-primary/20 group-hover:scale-110 transition-transform">
                  <User className="w-7 h-7 text-mediBuddy-primary" />
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${kycStatusColors[patient.kycStatus] || kycStatusColors['All']}`}>
                  {patient.kycStatus || 'Verified'}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white group-hover:text-mediBuddy-primary transition-colors">{patient.name}</h3>
                <p className="text-text-secondary text-sm mb-4">Patient ID: #{patient._id.slice(-6).toUpperCase()}</p>
                
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Phone className="w-4 h-4" />
                    <span>{patient.contact}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{patient.email || 'No email provided'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Calendar className="w-4 h-4" />
                    <span>Age: {patient.age} · {patient.gender}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between group-hover:border-mediBuddy-primary/20 transition-all">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">View Full Profile</span>
                <ChevronRight className="w-4 h-4 text-mediBuddy-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
