import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  TrendingUp, Users, Activity, Calendar as CalendarIcon, 
  ArrowUpRight, ArrowDownRight, Filter, Download,
  ChevronDown
} from 'lucide-react';
import Header from '../components/Header';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import { fetchAnalyticsData } from '../services/api';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');

  const { data: analyticsData, isLoading, isError } = useQuery({
    queryKey: ['analytics', timeRange],
    queryFn: () => fetchAnalyticsData(timeRange),
  });

  if (isLoading) {
    return (
      <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-medicore-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
        <Header />
        <div className="flex-1 flex items-center justify-center text-text-secondary">
          <p>Failed to load analytics data. Make sure the backend is running.</p>
        </div>
      </div>
    );
  }

  const { stats, chartData, patientDistribution } = analyticsData;

  const statItems = [
    { label: 'Total Patients', value: stats.totalPatients.value, change: stats.totalPatients.change, icon: Users, color: 'text-medicore-primary', trend: stats.totalPatients.trend },
    { label: 'Revenue', value: stats.monthlyRevenue.value, change: stats.monthlyRevenue.change, icon: TrendingUp, color: 'text-blue-400', trend: stats.monthlyRevenue.trend },
    { label: 'Avg. Treatment', value: stats.avgTreatment.value, change: stats.avgTreatment.change, icon: Activity, color: 'text-amber-400', trend: stats.avgTreatment.trend },
    { label: 'Appointments', value: stats.appointments.value, change: stats.appointments.change, icon: CalendarIcon, color: 'text-purple-400', trend: stats.appointments.trend },
  ];

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Advanced Analytics</h2>
          <p className="text-text-secondary text-sm">Deep dive into your clinic's performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2 pr-10 text-sm font-medium text-text-primary outline-none focus:border-medicore-primary/50 transition-all cursor-pointer"
            >
              <option value="7d" className="bg-[#1e293b]">Last 7 Days</option>
              <option value="30d" className="bg-[#1e293b]">Last 30 Days</option>
              <option value="6m" className="bg-[#1e293b]">Last 6 Months</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm font-medium text-text-secondary transition-all">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statItems.map((stat, i) => (
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="glass-card rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-white/5 rounded-2xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-text-secondary text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 pb-6">
        
        {/* Main Chart */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 glass-card rounded-3xl p-8 flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Growth Overview</h3>
              <p className="text-text-secondary text-sm">Revenue and patients acquisition trends</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-medicore-primary" />
                <span className="text-xs text-text-secondary">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-xs text-text-secondary">Patients</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3DB6A3" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3DB6A3" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#3DB6A3' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3DB6A3" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Distribution Chart */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="glass-card rounded-3xl p-8 flex flex-col"
        >
          <h3 className="text-xl font-bold text-white mb-8 text-center">Department Distribution</h3>
          
          <div className="flex-1 min-h-[250px] mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientDistribution}>
                <XAxis dataKey="name" hide />
                <Tooltip 
                   cursor={{ fill: 'transparent' }}
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
                  {patientDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {patientDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-text-primary">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-white">{item.value} pts</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

