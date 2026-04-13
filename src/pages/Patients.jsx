import React, { useState } from 'react';
import { Users, Activity, Clock, CheckCircle, Search, Filter, Plus } from 'lucide-react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import PatientsTable from '../components/PatientsTable';

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [kycFilter, setKycFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  const handleAddPatient = () => {
    alert("Opening 'Add Patient' Modal...");
  };

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col">
      <Header />
      
      <div className="flex justify-between items-end mb-8 animate-fade-in flex-shrink-0">
        <div>
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">Patients</h2>
          <p className="text-text-secondary mt-1 font-medium">Manage your patient roster and KYC statuses.</p>
        </div>
        <button 
          onClick={handleAddPatient}
          className="hidden sm:flex items-center gap-2 bg-medicore-primary hover:bg-medicore-dark text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_8px_20px_rgba(47,158,143,0.3)] hover:shadow-[0_8px_25px_rgba(47,158,143,0.4)] hover:-translate-y-0.5 z-10 relative"
        >
          <Plus className="w-5 h-5" />
          Add Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Patients" 
          value="1,248" 
          trend="up" 
          trendValue="12%" 
          icon={Users} 
          delay={0.1} 
        />
        <StatCard 
          title="Active Patients" 
          value="892" 
          trend="up" 
          trendValue="5%" 
          icon={Activity} 
          delay={0.2} 
        />
        <StatCard 
          title="Pending KYC" 
          value="64" 
          trend="down" 
          trendValue="2%" 
          icon={Clock} 
          delay={0.3} 
        />
        <StatCard 
          title="Completed KYC" 
          value="1,184" 
          trend="up" 
          trendValue="8%" 
          icon={CheckCircle} 
          delay={0.4} 
        />
      </div>

      {/* Filters and Table Area */}
      <div className="flex-1 flex flex-col gap-6 w-full relative z-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center animate-fade-in glass-card p-4 rounded-xl text-sm" style={{animationDelay: '0.5s'}}>
          <div className="relative w-full md:w-96 input-wrapper">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 dark:border-white/5 rounded-lg text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 focus:shadow-[0_0_15px_rgba(47,158,143,0.15)] transition-all"
            />
          </div>
          
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative flex-1 md:w-48 input-wrapper">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <select 
                value={kycFilter}
                onChange={(e) => setKycFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-white/5 border border-white/10 dark:border-white/5 rounded-lg text-text-primary outline-none focus:border-medicore-primary/50 focus:shadow-[0_0_15px_rgba(47,158,143,0.15)] transition-all appearance-none cursor-pointer"
              >
                <option value="All" className="bg-[#1e293b] text-text-primary">All KYC Status</option>
                <option value="Completed" className="bg-[#1e293b] text-text-primary">Completed</option>
                <option value="Pending" className="bg-[#1e293b] text-text-primary">Pending</option>
              </select>
            </div>

            <div className="relative flex-1 md:w-48 input-wrapper">
              <input 
                type="date" 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 dark:border-white/5 rounded-lg text-text-primary outline-none focus:border-medicore-primary/50 focus:shadow-[0_0_15px_rgba(47,158,143,0.15)] transition-all [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="animate-fade-in flex-1" style={{animationDelay: '0.6s'}}>
          <PatientsTable 
            searchTerm={searchTerm} 
            kycFilter={kycFilter} 
            dateFilter={dateFilter} 
          />
        </div>
      </div>
    </div>
  );
}
