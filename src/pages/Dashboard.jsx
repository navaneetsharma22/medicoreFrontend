import React, { useEffect, useState } from 'react';
import { Users, Calendar as CalendarIcon, Activity, Plus } from 'lucide-react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import BarChartCard from '../components/BarChartCard';
import CalendarWidget from '../components/Calendar';
import Upcoming from '../components/Upcoming';
import ActivityFeed from '../components/Activity';
import { fetchDashboardData } from '../services/api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const handleNewAppointment = () => {
    alert("Opening 'New Appointment' Modal...");
  };

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col">
      <Header />
      
      <div className="flex justify-between items-end mb-8 animate-fade-in flex-shrink-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Overview</h2>
          <p className="text-slate-500 mt-1 font-medium">Welcome back, Dr. Sarah. Here's your clinic today.</p>
        </div>
        <button 
          onClick={handleNewAppointment}
          className="hidden sm:flex items-center gap-2 bg-medicore-primary hover:bg-medicore-dark text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_8px_20px_rgba(47,158,143,0.3)] hover:shadow-[0_8px_25px_rgba(47,158,143,0.4)] hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          New Appointment
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-medicore-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10">
          {/* Left Main Section (Stats + Charts) */}
          <div className="xl:col-span-8 space-y-8">
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                title="Total Patients" 
                value={data.stats.totalPatients.value} 
                trend={data.stats.totalPatients.trend} 
                trendValue={data.stats.totalPatients.trendValue} 
                icon={Users} 
                delay={0.1} 
              />
              <StatCard 
                title="Appointments" 
                value={data.stats.appointmentsToday.value} 
                trend={data.stats.appointmentsToday.trend} 
                trendValue={data.stats.appointmentsToday.trendValue} 
                icon={CalendarIcon} 
                delay={0.2} 
              />
              <StatCard 
                title="Avg Treatment" 
                value={data.stats.avgTreatmentTime.value} 
                trend={data.stats.avgTreatmentTime.trend} 
                trendValue={data.stats.avgTreatmentTime.trendValue} 
                icon={Activity} 
                delay={0.3} 
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-8">
              <ChartCard data={data.charts.revenue} />
              <BarChartCard data={data.charts.departments} />
            </div>

          </div>

          {/* Right Panel */}
          <div className="xl:col-span-4 flex flex-col gap-8">
            <CalendarWidget />
            <Upcoming data={data.schedule} />
            <ActivityFeed data={data.activity} />
          </div>
        </div>
      )}
    </div>
  );
}
