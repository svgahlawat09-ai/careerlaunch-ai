import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Rocket, 
  FileText, 
  MessageSquare, 
  Target, 
  Map, 
  Briefcase, 
  LayoutDashboard, 
  Menu, 
  X, 
  User,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Rocket },
    { path: '/resume-checker', label: 'Resume Checker', icon: FileText },
    { path: '/mock-interview', label: 'Mock Interview', icon: MessageSquare },
    { path: '/skill-gap', label: 'Skill Gap', icon: Target },
    { path: '/roadmap', label: 'Roadmap', icon: Map },
    { path: '/internships', label: 'Internships', icon: Briefcase },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }
  ];

  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(state.user.avatarSeed || 'Alex Morgan')}`;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0F0B1E]/80 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <NavLink 
          to="/" 
          className="flex items-center space-x-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl gradient-bg-accent flex items-center justify-center shadow-lg shadow-[#7C5CFC]/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight gradient-text">
              CareerLaunch <span className="text-[#22D3EE]">AI</span>
            </span>
            <span className="text-[10px] uppercase font-semibold text-slate-400 -mt-1 tracking-wider">
              Job Readiness Platform
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/5 p-1.5 rounded-full border border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile / Dashboard Pill */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer group"
          >
            <img 
              src={avatarUrl} 
              alt="Avatar" 
              className="w-7 h-7 rounded-full bg-[#7C5CFC]/20 p-0.5 border border-[#7C5CFC]/50 group-hover:scale-105 transition-transform" 
            />
            <span className="text-xs font-semibold text-slate-200 group-hover:text-white max-w-[100px] truncate">
              {state.user.name || 'Alex Morgan'}
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0B1E] border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#7C5CFC] text-white shadow-md'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/dashboard');
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm font-medium"
            >
              <div className="flex items-center space-x-3">
                <img src={avatarUrl} alt="Avatar" className="w-7 h-7 rounded-full bg-[#7C5CFC]/30" />
                <span>{state.user.name} (Dashboard)</span>
              </div>
              <User className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
