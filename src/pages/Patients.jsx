import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ArrowLeft, Mail, Phone, Calendar, MapPin, 
  Clock, Activity, FileText, CheckCircle, 
  Plus, ShieldCheck, AlertCircle, X, User,
  Download, Eye, Stethoscope, Heart, Droplets,
  Building, Upload, ChevronDown, ChevronUp,
  Search, Scale, Ruler, Fingerprint
} from 'lucide-react';
import Header from '../components/Header';
import { fetchPatientById, createPatient, fetchDoctors, uploadMedicalRecord } from '../services/api';
import { toast } from 'react-hot-toast';
import { SkeletonWrapper, ListSkeleton, StatCardSkeleton } from '../components/SkeletonLoader';

import AddPatientModal from '../components/patients/AddPatientModal';
import AppointmentModal from '../components/patients/AppointmentModal';
import InfoTab from '../components/patients/InfoTab';
import AppointmentsTab from '../components/patients/AppointmentsTab';
import TestsTab from '../components/patients/TestsTab';
import HistoryTab from '../components/patients/HistoryTab';
import KYCTab from '../components/patients/KYCTab';
import RecordsTab from '../components/patients/RecordsTab';

export default function Patients() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patientId = id || '1';
  
  const [activeTab, setActiveTab] = useState('Info');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showAllTimeline, setShowAllTimeline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // useQuery to fetch patient data
  const { data: patient, isLoading, error } = useQuery({
    queryKey: ['patient', patientId],
    queryFn: () => fetchPatientById(patientId),
    enabled: !!patientId,
  });

  useEffect(() => {
    if (error) {
      toast.error('Failed to load patient data. ' + (error.message || ''));
    }
  }, [error]);


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/patients/${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleExportCSV = () => {
    window.open('/api/patients/export/csv', '_blank');
    toast.success('Exporting patients list...');
  };

  const handleExportPDF = () => {
    if (!patient) return;
    window.open(`/api/patients/${patient._id}/export/pdf`, '_blank');
    toast.success(`Generating PDF report for ${patient.name}...`);
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
        {showAddPatientModal && <AddPatientModal onClose={() => setShowAddPatientModal(false)} />}
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
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder:text-text-secondary outline-none focus:border-mediBuddy-primary/50 transition-all"
          />
        </form>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={handleExportCSV}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white px-5 py-2.5 rounded-xl font-medium border border-white/10 transition-all"
            title="Export all patients to CSV"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
          <button 
            onClick={() => setShowAddPatientModal(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-medium border border-white/10 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Patient
          </button>

          <button 
            onClick={() => setShowAppointmentModal(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-mediBuddy-primary hover:bg-mediBuddy-dark text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_8px_20px_rgba(47,158,143,0.3)]"
          >
            <Calendar className="w-5 h-5" />
            Create Appointment
          </button>
        </div>
      </div>

      {isLoading ? (
        <SkeletonWrapper>
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-8 flex items-center gap-6">
              <ListSkeleton count={1} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </div>
            <ListSkeleton count={5} />
          </div>
        </SkeletonWrapper>
      ) : error ? (

        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 glass-card rounded-2xl animate-fade-in">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Patient Not Found</h2>
          <p className="text-text-secondary mb-6">{error.message}</p>
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
                    <img src={patient?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${patient?.name || 'U'}`} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-mediBuddy-primary" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-mediBuddy-bg rounded-full"></div>
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
                <button 
                  onClick={handleExportPDF}
                  className="ml-2 p-3 bg-mediBuddy-primary/10 hover:bg-mediBuddy-primary/20 text-mediBuddy-primary rounded-xl transition-all group"
                  title="Download Patient Report PDF"
                >
                  <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>

            </div>
          </motion.div>

          {/* ─── Tabs ─── */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex gap-2 border-b border-white/10 pb-2 overflow-x-auto hide-scrollbar flex-shrink-0">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab ? 'bg-mediBuddy-primary text-white shadow-[0_4px_15px_rgba(47,158,143,0.3)]' : 'text-text-secondary hover:text-white hover:bg-white/5'
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
                  <ShieldCheck className="w-5 h-5 text-mediBuddy-primary" />
                  KYC Summary
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button onClick={() => setActiveTab('KYC')} className="bg-white/5 border border-white/10 rounded-xl p-4 transition-colors hover:bg-white/10 text-left hover:border-mediBuddy-primary/30">
                    <p className="text-text-secondary text-sm mb-1">Total</p>
                    <p className="text-2xl font-bold text-white">{patient?.kyc?.total || 0}</p>
                  </button>
                  <button onClick={() => setActiveTab('KYC')} className="bg-white/5 border border-white/10 rounded-xl p-4 transition-colors hover:bg-white/10 text-left hover:border-yellow-400/30">
                    <p className="text-text-secondary text-sm mb-1">Pending</p>
                    <p className="text-2xl font-bold text-yellow-400">{patient?.kyc?.pending || 0}</p>
                  </button>
                  <button onClick={() => setActiveTab('KYC')} className="bg-white/5 border border-white/10 rounded-xl p-4 col-span-2 transition-colors hover:bg-white/10 relative overflow-hidden group text-left hover:border-mediBuddy-primary/30 border border-white/10">
                    <div className="absolute inset-0 bg-mediBuddy-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-text-secondary text-sm mb-1 relative z-10">Completed</p>
                    <div className="flex items-end justify-between relative z-10">
                      <p className="text-3xl font-bold text-mediBuddy-primary">{patient?.kyc?.completed || 0}</p>
                      <CheckCircle className="w-6 h-6 text-mediBuddy-primary" />
                    </div>
                  </button>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-6 mt-auto">
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="p-2 bg-white/5 rounded-lg text-mediBuddy-primary"><Phone className="w-4 h-4" /></div>
                    {patient?.phone || 'No phone number'}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="p-2 bg-white/5 rounded-lg text-mediBuddy-primary"><MapPin className="w-4 h-4" /></div>
                    {patient?.address || 'No address'}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="p-2 bg-white/5 rounded-lg text-mediBuddy-primary"><Calendar className="w-4 h-4" /></div>
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
                    <Activity className="w-5 h-5 text-mediBuddy-primary" />
                    Activity Timeline
                  </h3>
                  {timelineItems.length > TIMELINE_PREVIEW_COUNT && (
                    <button onClick={() => setShowAllTimeline(!showAllTimeline)} className="text-sm text-mediBuddy-primary hover:text-white transition-colors flex items-center gap-1">
                      {showAllTimeline ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> View All ({timelineItems.length})</>}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-mediBuddy-primary/50 to-transparent" />
                  <div className="space-y-5">
                    {visibleTimeline.length > 0 ? (
                      visibleTimeline.map((item, index) => (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} key={index} className="relative pl-10">
                          <div className={`absolute left-0 top-1.5 w-7 h-7 rounded-full border-[3px] border-[#1e293b] flex items-center justify-center ${item.status === 'done' ? 'bg-mediBuddy-primary' : 'bg-yellow-400'}`}>
                            {item.status === 'done' ? <CheckCircle className="w-3 h-3 text-[#1e293b]" /> : <Clock className="w-3 h-3 text-[#1e293b]" />}
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                              <span className="text-xs text-text-secondary flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md"><Clock className="w-3 h-3" />{item.date}</span>
                            </div>
                            <p className="text-sm text-text-secondary">{item.description}</p>
                            <div className="mt-3 inline-flex">
                              <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${item.status === 'done' ? 'bg-mediBuddy-primary/20 text-mediBuddy-primary border-mediBuddy-primary/20' : 'bg-yellow-400/20 text-yellow-400 border-yellow-400/20'}`}>
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
