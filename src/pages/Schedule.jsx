import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Plus, Clock, 
  Video, User, MapPin, Filter, MoreHorizontal
} from 'lucide-react';
import Header from '../components/Header';

const appointments = [
  { id: 1, patient: 'Alice Walker', time: '09:00 AM', duration: '30 min', type: 'Video Call', status: 'upcoming', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { id: 2, patient: 'Robert Fox', time: '11:00 AM', duration: '45 min', type: 'In-Person', status: 'upcoming', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
  { id: 3, patient: 'Esther Howard', time: '02:00 PM', duration: '60 min', type: 'Checkup', status: 'completed', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Esther' },
  { id: 4, patient: 'Jenny Wilson', time: '04:30 PM', duration: '30 min', type: 'Consultation', status: 'upcoming', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny' },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const currentMonth = 'December 2023';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(15);

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />

      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0 pb-6">
        
        {/* Left Side: Calendar View */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          className="xl:w-2/3 flex flex-col gap-6"
        >
          <div className="glass-card rounded-3xl p-8 flex-1">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{currentMonth}</h2>
                <p className="text-text-secondary text-sm">You have 12 appointments this month</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-white/10 rounded-xl transition text-text-secondary">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-xl transition text-text-secondary">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-4">
              {days.map(day => (
                <div key={day} className="text-center text-xs font-bold text-text-secondary uppercase tracking-widest">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 flex-1">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDate === day;
                const hasAppointments = [12, 15, 18, 22].includes(day);

                return (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all duration-300 border ${
                      isSelected 
                        ? 'bg-medicore-primary border-medicore-primary text-white shadow-[0_10px_30px_rgba(47,158,143,0.4)]' 
                        : 'bg-white/5 border-white/5 text-text-secondary hover:border-white/20'
                    }`}
                  >
                    <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-text-primary'}`}>{day}</span>
                    {hasAppointments && !isSelected && (
                      <div className="absolute bottom-3 w-1.5 h-1.5 bg-medicore-primary rounded-full shadow-[0_0_8px_rgba(47,158,143,1)]" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Appointment Details */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="xl:w-1/3 flex flex-col gap-6"
        >
          <div className="glass-card rounded-3xl p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Daily Schedule</h3>
              <button className="bg-medicore-primary/20 p-2 rounded-xl text-medicore-primary hover:bg-medicore-primary/30 transition">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
              <AnimatePresence mode="popLayout">
                {appointments.map((app, i) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={app.id}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img src={app.avatar} className="w-10 h-10 rounded-xl object-cover border border-white/10" alt="" />
                        <div>
                          <h4 className="text-white font-bold text-sm group-hover:text-medicore-primary transition-colors">{app.patient}</h4>
                          <p className="text-text-secondary text-xs">{app.type}</p>
                        </div>
                      </div>
                      <button className="text-text-secondary hover:text-white p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-text-secondary text-xs">
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{app.time}</div>
                      <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{app.duration}</div>
                      <div className="ml-auto">
                        {app.type === 'Video Call' ? (
                          <div className="bg-blue-500/20 text-blue-400 p-1.5 rounded-lg">
                            <Video className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="bg-amber-500/20 text-amber-400 p-1.5 rounded-lg">
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <button className="w-full bg-medicore-primary hover:bg-medicore-dark text-white py-4 rounded-2xl font-bold transition-all shadow-[0_10px_30px_rgba(47,158,143,0.3)]">
                View All Appointments
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
