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
  Sparkles,
  Key
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const { state, dispatch, addToast } = useApp();
  const [keyInput, setKeyInput] = useState(state.apiKey || '');
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

  const handleSaveKey = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_API_KEY', payload: keyInput.trim() });
    if (keyInput.trim()) {
      addToast('Gemini API Key saved! Premium AI Features Enabled.', 'success');
    } else {
      addToast('Gemini API Key removed. Using Local Smart Heuristics.', 'info');
    }
    setShowKeyModal(false);
  };

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
          {/* API Key Configure Button */}
          <button
            onClick={() => {
              setKeyInput(state.apiKey || '');
              setShowKeyModal(true);
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white cursor-pointer relative"
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            {state.apiKey && (
              <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>

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
          {/* Mobile Key Button */}
          <button
            onClick={() => {
              setKeyInput(state.apiKey || '');
              setShowKeyModal(true);
            }}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-300 focus:outline-none"
            title="Configure Gemini API Key"
          >
            <Key className="w-5 h-5 text-cyan-400" />
          </button>

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

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 border border-white/15 max-w-md w-full space-y-5 animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-white text-base flex items-center space-x-2">
                <Key className="w-5 h-5 text-cyan-400" />
                <span>Gemini API Key Settings</span>
              </h3>
              <button 
                onClick={() => setShowKeyModal(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Enable premium AI features for high-fidelity resume extraction, weighted ATS feedback, live career coaching, and customized STAR-framework interview questions. 
              Your key is saved locally in your browser storage and is never sent to any third-party backend.
            </p>

            <form onSubmit={handleSaveKey} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider">
                  Gemini API Key:
                </label>
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full glass-input p-3 rounded-xl text-xs focus:outline-none focus:border-[#7C5CFC]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setKeyInput('');
                    dispatch({ type: 'SET_API_KEY', payload: '' });
                    addToast('API Key cleared.', 'info');
                    setShowKeyModal(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-semibold"
                >
                  Clear Key
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl gradient-bg-accent text-xs font-semibold text-white shadow-lg cursor-pointer"
                >
                  Save API Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
