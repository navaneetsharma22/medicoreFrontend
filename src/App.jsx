import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  useEffect(() => {
    document.title = "MediCore - Healthcare Dashboard";
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex relative overflow-hidden bg-medicore-bg">
        {/* Decorative blurred background circles for glassmorphism vibes */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-medicore-light/20 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-medicore-primary/20 blur-[120px] rounded-full pointer-events-none z-0" />

        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-8 relative z-10 h-screen overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<PlaceholderPage title="Patients" />} />
            <Route path="/schedule" element={<PlaceholderPage title="Schedule" />} />
            <Route path="/analytics" element={<PlaceholderPage title="Analytics" />} />
            <Route path="/activity" element={<PlaceholderPage title="Activity" />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
