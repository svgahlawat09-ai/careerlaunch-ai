import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import Home from './pages/Home';
import ResumeChecker from './pages/ResumeChecker';
import MockInterview from './pages/MockInterview';
import SkillGap from './pages/SkillGap';
import Roadmap from './pages/Roadmap';
import Internships from './pages/Internships';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#0F0B1E] text-slate-100 selection:bg-[#7C5CFC]/30 selection:text-cyan-300">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume-checker" element={<ResumeChecker />} />
              <Route path="/mock-interview" element={<MockInterview />} />
              <Route path="/skill-gap" element={<SkillGap />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <Toast />
        </div>
      </Router>
    </AppProvider>
  );
}
