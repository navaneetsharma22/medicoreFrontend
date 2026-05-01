import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Activity, Calendar, 
  ArrowUpRight, ArrowDownRight, Filter, Download,
  BarChart3, PieChart, LineChart
} from 'lucide-react';
import Header from '../components/Header';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';

const data = [
  { name: 'Jan', patients: 4000, revenue: 2400 },
  { name: 'Feb', patients: 3000, revenue: 1398 },
  { name: 'Mar', patients: 2000, revenue: 9800 },
  { name: 'Apr', patients: 2780, revenue: 3908 },
  { name: 'May', patients: 1890, revenue: 4800 },
  { name: 'Jun', patients: 2390, revenue: 3800 },
  { name: 'Jul', patients: 3490, revenue: 4300 },
];

const patientData = [
  { name: 'Cardiology', value: 400, color: '#3DB6A3' },
  { name: 'Neurology', value: 300, color: '#3b82f6' },
  { name: 'General', value: 300, color: '#f59e0b' },
  { name: 'Pediatrics', value: 200, color: '#ef4444' },
];

export default function Analytics() {
  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Total Patients', value: '12,840', change: '+12.5%', icon: Users, color: 'text-medicore-primary', trend: 'up' },
          { label: 'Monthly Revenue', value: '$84,200', change: '+8.2%', icon: TrendingUp, color: 'text-blue-400', trend: 'up' },
          { label: 'Avg. Treatment', value: '$1,250', change: '-2.4%', icon: Activity, color: 'text-amber-400', trend: 'down' },
          { label: 'Appointments', value: '1,420', change: '+15.3%', icon: Calendar, color: 'text-purple-400', trend: 'up' },
        ].map((stat, i) => (
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
        
        {/* Revenue Growth Chart */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 glass-card rounded-3xl p-8 flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Revenue Analytics</h3>
              <p className="text-text-secondary text-sm">Financial performance over the last 6 months</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-xl transition text-text-secondary"><Filter className="w-5 h-5" /></button>
              <button className="p-2 hover:bg-white/10 rounded-xl transition text-text-secondary"><Download className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3DB6A3" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3DB6A3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#3DB6A3' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3DB6A3" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Patient Distribution */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="glass-card rounded-3xl p-8 flex flex-col"
        >
          <h3 className="text-xl font-bold text-white mb-8 text-center">Patient Distribution</h3>
          
          <div className="flex-1 min-h-[250px] mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientData}>
                <XAxis dataKey="name" hide />
                <Tooltip 
                   cursor={{ fill: 'transparent' }}
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
                  {patientData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {patientData.map((item) => (
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
