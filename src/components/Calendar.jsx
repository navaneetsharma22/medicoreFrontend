import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Calendar() {
  const [activeDate, setActiveDate] = useState(15);
  const [currentMonth, setCurrentMonth] = useState('October 2023');
  
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const handlePrevMonth = () => alert("Navigating to previous month...");
  const handleNextMonth = () => alert("Navigating to next month...");

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-text-primary tracking-tight">{currentMonth}</h3>
        <div className="flex gap-2">
          <button onClick={handlePrevMonth} className="p-1.5 rounded-lg hover:bg-[var(--border-subtle)] text-text-secondary transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNextMonth} className="p-1.5 rounded-lg hover:bg-[var(--border-subtle)] text-text-secondary transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-4 mb-2 text-center">
        {days.map(day => (
          <div key={day} className="text-xs font-semibold text-text-secondary/70">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        <div className="p-2"></div>
        <div className="p-2"></div>
        
        {dates.map((date) => {
          const isActive = date === activeDate;
          const hasEvent = [4, 12, 18, 25].includes(date);
          
          return (
            <div key={date} className="relative p-1">
              <button
                onClick={() => setActiveDate(date)}
                className={`w-8 h-8 mx-auto flex flex-col items-center justify-center rounded-full text-sm font-medium transition-all
                  ${isActive 
                    ? 'bg-medicore-primary text-white shadow-[0_0_15px_rgba(47,158,143,0.4)]' 
                    : 'text-text-secondary hover:bg-[var(--border-subtle)] hover:scale-110'}
                `}
              >
                {date}
                {hasEvent && !isActive && (
                  <span className="w-1 h-1 bg-medicore-light rounded-full absolute bottom-1.5"></span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
