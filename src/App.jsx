import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Schedule from './pages/Schedule';
import Messages from './pages/Messages';
import Records from './pages/Records';
import Billing from './pages/Billing';
import Staff from './pages/Staff';
import Analytics from './pages/Analytics';
import ActivityLog from './pages/ActivityLog';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Admin from './pages/Admin';
import Auth from './pages/Auth';

import { useUI } from './context/UIContext';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

function DashboardLayout() {
  const { sidebarCollapsed } = useUI();
  
  return (
    <div className="min-h-screen flex relative overflow-hidden bg-medicore-bg">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-medicore-light/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-medicore-primary/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <Sidebar />
      <main className={`flex-1 transition-all duration-300 p-4 lg:p-8 relative z-10 h-screen overflow-y-auto overflow-x-hidden ${
        sidebarCollapsed ? 'lg:ml-[88px]' : 'lg:ml-[280px]'
      }`}>
        <Outlet />
      </main>
    </div>
  );
}


function App() {
  useEffect(() => {
    // --- Theme Setup ---
    document.title = "MediCore - Healthcare Dashboard";
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // --- Socket.io Setup ---
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('🔌 Connected to Socket server');
      
      // Simulate joining a doctor's room (using a hardcoded ID for now)
      // In a real app, you'd get this from your auth state
      const doctorId = '658421098765432109876543'; 
      socket.emit('join', doctorId);
    });

    // Listen for new appointments
    socket.on('newAppointment', (data) => {
      toast.success(data.message, {
        duration: 5000,
        icon: '📅',
        style: {
          borderRadius: '12px',
          background: '#132724',
          color: '#fff',
          border: '1px solid rgba(47,158,143,0.3)'
        },
      });
      console.log('New Appointment Received:', data.appointment);
    });

    // Listen for general notifications
    socket.on('notification', (data) => {
      toast(data.message, { icon: '🔔' });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients/:id?" element={<Patients />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/records" element={<Records />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/activity" element={<ActivityLog />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
}

export default App;
