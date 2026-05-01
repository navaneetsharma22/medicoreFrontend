import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, Calendar as CalendarIcon, Activity, Plus } from 'lucide-react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import BarChartCard from '../components/BarChartCard';
import CalendarWidget from '../components/Calendar';
import Upcoming from '../components/Upcoming';
import ActivityFeed from '../components/Activity';
import { fetchDashboardData } from '../services/api';
import { SkeletonWrapper, StatCardSkeleton, ChartSkeleton, ListSkeleton } from '../components/SkeletonLoader';

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData
  });

  const handleNewAppointment = () => {
    alert("Opening 'New Appointment' Modal...");
  };

  const LoadingState = () => (
    <SkeletonWrapper>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10">
        <div className="xl:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="glass-card rounded-3xl p-6 h-[300px]"><SkeletonWrapper><ChartSkeleton /></SkeletonWrapper></div>
          <ListSkeleton count={3} />
          <ListSkeleton count={4} />
        </div>
      </div>
    </SkeletonWrapper>
  );

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col">
      <Header />
      
      <div className="flex justify-between items-end mb-8 animate-fade-in flex-shrink-0">
        <div>
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">Overview</h2>
          <p className="text-text-secondary mt-1 font-medium">Here's your clinic today.</p>
        </div>
        <button 
          onClick={handleNewAppointment}
          className="hidden sm:flex items-center gap-2 bg-medicore-primary hover:bg-medicore-dark text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_8px_20px_rgba(47,158,143,0.3)] hover:shadow-[0_8px_25px_rgba(47,158,143,0.4)] hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          New Appointment
        </button>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center text-text-secondary py-20 glass-card rounded-3xl">
          <Activity className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-xl font-bold text-white mb-2">Oops! Something went wrong</p>
          <p className="max-w-md text-center">{error.message || 'Failed to load dashboard data. Please try again later.'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all"
          >
            Retry Connection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10">
          <div className="xl:col-span-8 space-y-8">
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

            <div className="grid grid-cols-1 gap-8">
              <ChartCard data={data.charts.revenue} />
              <BarChartCard data={data.charts.departments} />
            </div>
          </div>

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

