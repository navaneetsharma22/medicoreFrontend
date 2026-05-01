import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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
import PlaceholderPage from './pages/PlaceholderPage';
import Auth from './pages/Auth';

function DashboardLayout() {
  return (
    <div className="min-h-screen flex relative overflow-hidden bg-medicore-bg">
      {/* Decorative blurred background circles for glassmorphism vibes */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-medicore-light/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-medicore-primary/20 blur-[120px] rounded-full pointer-events-none z-0" />

      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 relative z-10 h-screen overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  useEffect(() => {
    document.title = "MediCore - Healthcare Dashboard";
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Route */}
        <Route path="/" element={<Auth />} />

        {/* Protected / Dashboard Routes */}
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
    </Router>
  );
}

export default App;
