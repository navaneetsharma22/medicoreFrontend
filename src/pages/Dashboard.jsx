import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, Calendar as CalendarIcon, Activity, Plus, 
  Sparkles, CheckCircle2, AlertCircle, Zap, Clock,
  ArrowUpRight, TrendingUp, Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import BarChartCard from '../components/BarChartCard';
import CalendarWidget from '../components/Calendar';
import Upcoming from '../components/Upcoming';
import ActivityFeed from '../components/Activity';
import { fetchDashboardData } from '../services/api';
import { SkeletonWrapper, StatCardSkeleton, ChartSkeleton, ListSkeleton } from '../components/SkeletonLoader';

// --- Sub-components for the new Zones ---

const AIBriefing = ({ data }) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6 bg-gradient-to-r from-mediBuddy-primary/20 via-mediBuddy-primary/10 to-transparent border-l-4 border-mediBuddy-primary mb-8 overflow-hidden relative group"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Sparkles className="w-24 h-24 text-mediBuddy-primary" />
    </div>
    <div className="flex items-center gap-4 relative z-10">
      <div className="p-3 bg-mediBuddy-primary rounded-2xl shadow-lg shadow-mediBuddy-primary/30">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          AI Daily Briefing
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Beta</span>
        </h3>
        <p className="text-text-secondary font-medium">
          Good morning, <span className="text-mediBuddy-primary">Dr. Sarah</span>. You have <span className="text-white">12 appointments</span> today and <span className="text-rose-400">3 urgent lab results</span> pending review.
        </p>
      </div>
    </div>
  </motion.div>
);

const QuickActions = () => (
  <div className="grid grid-cols-2 gap-4">
    {[
      { label: 'New Patient', icon: Plus, color: 'bg-mediBuddy-primary' },
      { label: 'Prescription', icon: Zap, color: 'bg-blue-500' },
      { label: 'Telehealth', icon: Activity, color: 'bg-purple-500' },
      { label: 'Add Task', icon: Clock, color: 'bg-amber-500' },
    ].map((action, i) => (
      <motion.button
        key={action.label}
        whileHover={{ scale: 1.02, translateY: -2 }}
        whileTap={{ scale: 0.98 }}
        className="glass-card p-4 flex flex-col items-center justify-center gap-3 group transition-all"
      >
        <div className={`p-3 ${action.color} rounded-xl text-white shadow-lg shadow-${action.color}/20 group-hover:scale-110 transition-transform`}>
          <action.icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold text-text-secondary group-hover:text-white transition-colors">{action.label}</span>
      </motion.button>
    ))}
  </div>
);

const TaskTriage = () => (
  <div className="glass-card p-6 space-y-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest">Clinical Tasks</h3>
      <Filter className="w-4 h-4 text-text-secondary cursor-pointer hover:text-white" />
    </div>
    {[
      { title: 'Review MRI Scan - Patient #1024', time: '10 mins ago', priority: 'high', icon: AlertCircle },
      { title: 'Finalize Consultation Notes - Dr. Sam', time: '1 hr ago', priority: 'medium', icon: Clock },
      { title: 'Approve Pharmacy Request', time: '2 hrs ago', priority: 'low', icon: CheckCircle2 },
    ].map((task, i) => (
      <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-mediBuddy-primary/30 transition-all cursor-pointer group">
        <div className={`p-2 rounded-lg ${
          task.priority === 'high' ? 'text-rose-400 bg-rose-400/10' : 
          task.priority === 'medium' ? 'text-amber-400 bg-amber-400/10' : 'text-mediBuddy-primary bg-mediBuddy-primary/10'
        }`}>
          <task.icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white truncate group-hover:text-mediBuddy-primary transition-colors">{task.title}</p>
          <p className="text-[10px] text-text-secondary">{task.time}</p>
        </div>
      </div>
    ))}
  </div>
);

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData
  });

  const handleNewAppointment = () => {
    alert("Opening 'New Appointment' Modal...");
  };

  if (isLoading) return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />
      <SkeletonWrapper>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10">
          <div className="xl:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCardSkeleton /> <StatCardSkeleton /> <StatCardSkeleton />
            </div>
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
          <div className="xl:col-span-4 flex flex-col gap-8">
            <div className="glass-card rounded-3xl p-6 h-[300px]"><ChartSkeleton /></div>
            <ListSkeleton count={4} />
          </div>
        </div>
      </SkeletonWrapper>
    </div>
  );

  if (error) return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center text-text-secondary py-20 glass-card rounded-3xl">
        <AlertCircle className="w-16 h-16 mb-4 text-rose-500 opacity-50" />
        <p className="text-xl font-bold text-white mb-2">System Connection Error</p>
        <p className="max-w-md text-center opacity-70">We're having trouble reaching the mediBuddy servers. Your data is safe.</p>
        <button onClick={() => window.location.reload()} className="mt-8 px-8 py-3 bg-mediBuddy-primary text-white rounded-2xl font-bold shadow-lg transition-all hover:scale-105">
          Reconnect System
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col">
      <Header />
      
      {/* Zone A: The Pulse (Top) */}
      <div className="flex flex-col gap-2 mb-8 animate-fade-in flex-shrink-0">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Clinical Hub
              <span className="h-3 w-3 bg-mediBuddy-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(47,158,143,1)]" />
            </h2>
            <p className="text-text-secondary mt-1 font-medium text-lg">Predictive intelligence for your daily rounds.</p>
          </div>
          <button 
            onClick={handleNewAppointment}
            className="hidden sm:flex items-center gap-2 bg-mediBuddy-primary hover:bg-mediBuddy-dark text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-[0_8px_30px_rgba(47,158,143,0.3)] hover:shadow-[0_15px_35px_rgba(47,158,143,0.4)] hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            New Appointment
          </button>
        </div>
      </div>

      <AIBriefing data={data} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10">
        
        {/* Zone B: The Workflow (Main Column - Left) */}
        <div className="xl:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Total Patients" 
              value={data.stats.totalPatients.value} 
              trend="up" 
              trendValue={data.stats.totalPatients.trendValue} 
              icon={Users} 
              delay={0.1} 
            />
            <StatCard 
              title="Today's Caseload" 
              value={data.stats.appointmentsToday.value} 
              trend={data.stats.appointmentsToday.trend} 
              trendValue={data.stats.appointmentsToday.trendValue} 
              icon={CalendarIcon} 
              delay={0.2} 
            />
            <StatCard 
              title="Wait Efficiency" 
              value={data.stats.avgTreatmentTime.value} 
              trend={data.stats.avgTreatmentTime.trend} 
              trendValue={data.stats.avgTreatmentTime.trendValue} 
              icon={Clock} 
              delay={0.3} 
            />
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-mediBuddy-primary/20 to-transparent rounded-[24px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <ChartCard data={data.charts.revenue} title="Service Volume Trends" />
            </div>
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-transparent rounded-[24px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
               <BarChartCard data={data.charts.departments} title="Departmental Workload" />
            </div>
          </div>
        </div>

        {/* Zone C: The Command Center (Right Sidebar) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest px-2">Scheduling</h3>
            <div className="glass-card p-4 overflow-hidden shadow-2xl">
              <CalendarWidget />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest px-2">Quick Actions</h3>
            <QuickActions />
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest px-2">Triage & Tasks</h3>
            <TaskTriage />
          </section>

          <section className="space-y-4">
             <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest px-2">Live Activity</h3>
             <ActivityFeed data={data.activity} />
          </section>
        </div>
      </div>
    </div>
  );
}


