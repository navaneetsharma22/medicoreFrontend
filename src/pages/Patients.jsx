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
import PatientList from '../components/patients/PatientList';

export default function Patients() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patientId = id;
  
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
    <div className="max-w-[1400px] mx-auto min-h-screen flex flex-col gap-6 p-4 md:p-8">
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

      {/* Conditional Rendering: List vs Detail */}
      {!id ? (
        <PatientList />
      ) : (
        <>
          {isLoading ? (
            <SkeletonWrapper>
              <div className="space-y-6">
                <StatCardSkeleton />
                <ListSkeleton count={5} />
              </div>
            </SkeletonWrapper>
          ) : error ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 glass-card rounded-[32px] border-rose-500/20 animate-fade-in min-h-[400px]">
              <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 border border-rose-500/20">
                <AlertCircle className="w-10 h-10 text-rose-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Patient Not Found</h2>
              <p className="text-text-secondary text-lg mb-8 max-w-md">
                We couldn't locate a patient with ID <span className="text-white font-mono">{id}</span>. They might have been removed or the record is temporarily unavailable.
              </p>
              <button 
                onClick={() => navigate('/patients')} 
                className="bg-mediBuddy-primary hover:bg-mediBuddy-dark text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg"
              >
                Back to Registry
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6 animate-fade-in">
              {/* Profile Header */}
              <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card rounded-[32px] p-8 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center relative overflow-hidden group border-white/10">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Activity className="w-32 h-32 text-mediBuddy-primary" />
                </div>
                
                <div className="flex items-center gap-8">
                  <button onClick={() => navigate('/patients')} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 group/btn" title="Back to Registry">
                    <ArrowLeft className="w-6 h-6 text-text-primary group-hover/btn:-translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img 
                        src={patient?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${patient?.name || 'U'}`} 
                        alt="Avatar" 
                        className="w-24 h-24 rounded-[28px] object-cover border-4 border-mediBuddy-primary/20 shadow-xl" 
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-[#0f172a] rounded-full shadow-lg"></div>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">{patient?.name || 'Unknown'}</h1>
                        <span className="bg-mediBuddy-primary/20 text-mediBuddy-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-mediBuddy-primary/20">
                          {patient?.gender} · {patient?.age} Yrs
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-6 text-text-secondary font-medium mt-3">
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-mediBuddy-primary" />{patient?.email}</div>
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-mediBuddy-primary" />{patient?.contact || patient?.phone}</div>
                        <div className="bg-white/10 px-3 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider text-text-primary border border-white/10">ID: {id}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-white/5 rounded-[24px] border border-white/10">
                  <div className="text-center px-6 border-r border-white/10">
                    <p className="text-text-secondary text-[10px] uppercase font-extrabold tracking-widest mb-1">Height</p>
                    <p className="text-xl font-bold text-white">{patient?.height || '175 cm'}</p>
                  </div>
                  <div className="text-center px-6">
                    <p className="text-text-secondary text-[10px] uppercase font-extrabold tracking-widest mb-1">Weight</p>
                    <p className="text-xl font-bold text-white">{patient?.weight || '72 kg'}</p>
                  </div>
                  <button 
                    onClick={handleExportPDF}
                    className="ml-4 p-4 bg-mediBuddy-primary hover:bg-mediBuddy-dark text-white rounded-2xl transition-all shadow-lg shadow-mediBuddy-primary/20 group/dl"
                    title="Download Patient Report PDF"
                  >
                    <FileText className="w-6 h-6 group-hover/dl:scale-110 transition-transform" />
                  </button>
                </div>
              </motion.div>

              {/* Stats & Tabs Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Summary Cards */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="glass-card rounded-[32px] p-8 border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-mediBuddy-primary" />
                      KYC Compliance
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <p className="text-text-secondary text-xs font-bold uppercase mb-1">Status</p>
                        <p className="text-xl font-extrabold text-white">{patient?.kycStatus || 'Verified'}</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <p className="text-text-secondary text-xs font-bold uppercase mb-1">Verified By</p>
                        <p className="text-xl font-extrabold text-white">MediBuddy</p>
                      </div>
                      <div className="col-span-2 bg-mediBuddy-primary/10 border border-mediBuddy-primary/20 rounded-2xl p-5 flex justify-between items-center">
                        <div>
                          <p className="text-text-secondary text-xs font-bold uppercase mb-1">Security Score</p>
                          <p className="text-3xl font-black text-mediBuddy-primary">98%</p>
                        </div>
                        <CheckCircle className="w-10 h-10 text-mediBuddy-primary opacity-50" />
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                      <h4 className="text-sm font-bold text-text-secondary uppercase tracking-widest px-1">Quick Vitals</h4>
                      <div className="flex justify-between p-4 bg-white/5 rounded-2xl">
                        <span className="text-text-secondary font-medium">Blood Group</span>
                        <span className="text-white font-bold">{patient?.bloodGroup || 'B+'}</span>
                      </div>
                      <div className="flex justify-between p-4 bg-white/5 rounded-2xl">
                        <span className="text-text-secondary font-medium">Pulse Rate</span>
                        <span className="text-mediBuddy-primary font-bold">72 BPM</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-[32px] p-8 border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                      <Activity className="w-6 h-6 text-amber-400" />
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {timelineItems.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex gap-4 group">
                          <div className="relative">
                            <div className={`w-3 h-3 rounded-full mt-1.5 ring-4 ring-slate-900 ${item.status === 'done' ? 'bg-mediBuddy-primary' : 'bg-amber-400'}`} />
                            {i !== 2 && <div className="absolute left-1.5 top-5 bottom-0 w-px bg-white/10" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-mediBuddy-primary transition-colors">{item.title}</p>
                            <p className="text-[11px] text-text-secondary">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setShowAllTimeline(true)} className="w-full mt-6 py-3 rounded-2xl bg-white/5 text-text-secondary font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all border border-white/10">
                      View Activity Log
                    </button>
                  </div>
                </div>

                {/* Right: Tab Interface */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-[24px] border border-white/10 w-fit">
                    {tabs.map((tab) => (
                      <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-8 py-3 rounded-2xl text-sm font-extrabold transition-all ${
                          activeTab === tab ? 'bg-mediBuddy-primary text-white shadow-xl shadow-mediBuddy-primary/20 scale-105' : 'text-text-secondary hover:text-white hover:bg-white/5'
                        }`}>
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="glass-card rounded-[32px] p-8 border-white/10 min-h-[600px]">
                    <AnimatePresence mode="wait">
                      <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                        {renderTabContent()}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
