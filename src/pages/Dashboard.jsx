import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  MessageSquare, 
  Target, 
  Map, 
  Briefcase, 
  Award, 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Edit3, 
  Check 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TARGET_ROLES, ROLE_ROADMAPS } from '../data/mockData';

export default function Dashboard() {
  const { state, dispatch, addToast } = useApp();
  const navigate = useNavigate();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userNameInput, setUserNameInput] = useState(state.user.name || 'Alex Morgan');

  // Compute live statistics from state
  const atsScore = state.resumeAnalysis?.overallScore || 85;
  const lastInterview = state.interviewHistory?.[0];
  const interviewScore = lastInterview ? lastInterview.overallScore : 8.5;

  // Compute roadmap percentage
  const activeRoadmap = ROLE_ROADMAPS[state.user.targetRole || 'frontend'] || ROLE_ROADMAPS['frontend'];
  let totalRoadmapItems = 0;
  let completedRoadmapItems = 0;

  activeRoadmap.phases.forEach((phase) => {
    phase.items.forEach((item) => {
      totalRoadmapItems++;
      if (state.roadmapProgress[item.id]) completedRoadmapItems++;
    });
  });

  const roadmapPercent = totalRoadmapItems > 0 ? Math.round((completedRoadmapItems / totalRoadmapItems) * 100) : 0;
  const appliedCount = state.myApplications?.length || 0;

  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(state.user.avatarSeed || userNameInput)}`;

  const handleSaveProfile = () => {
    dispatch({
      type: 'UPDATE_USER',
      payload: { name: userNameInput, avatarSeed: userNameInput }
    });
    setIsEditingProfile(false);
    addToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center space-x-3">
          <LayoutDashboard className="w-8 h-8 text-[#7C5CFC]" />
          <span>Student Career Dashboard</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Track your overall job-readiness metrics, recent activities, and quick actions in one central hub.
        </p>
      </div>

      {/* Profile Card & Target Role Row */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center space-x-4">
          <img 
            src={avatarUrl} 
            alt="User Avatar"
            className="w-16 h-16 rounded-full bg-[#7C5CFC]/20 p-1 border-2 border-[#7C5CFC]/50 shrink-0" 
          />
          
          <div className="space-y-1">
            {isEditingProfile ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={userNameInput}
                  onChange={(e) => setUserNameInput(e.target.value)}
                  className="glass-input px-3 py-1 rounded-lg text-sm font-bold text-white focus:outline-none"
                />
                <button
                  onClick={handleSaveProfile}
                  className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white">{state.user.name}</h2>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center space-x-2 text-xs text-slate-300">
              <span className="px-2.5 py-0.5 rounded-full bg-[#7C5CFC]/20 border border-[#7C5CFC]/30 text-cyan-300 font-semibold">
                {TARGET_ROLES[state.user.targetRole]?.title || 'Frontend Developer'}
              </span>
              <span>{state.user.email}</span>
            </div>
          </div>
        </div>

        {/* Quick Role Switcher */}
        <div className="flex items-center space-x-3 bg-white/5 p-2 rounded-2xl border border-white/10 shrink-0">
          <label className="text-xs font-semibold text-slate-300">Active Role Track:</label>
          <select
            value={state.user.targetRole || 'frontend'}
            onChange={(e) => {
              dispatch({ type: 'SET_TARGET_ROLE', payload: e.target.value });
              addToast(`Role track switched to ${TARGET_ROLES[e.target.value].title}`, 'info');
            }}
            className="bg-[#1E1B3A] text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/20 focus:outline-none"
          >
            {Object.keys(TARGET_ROLES).map((key) => (
              <option key={key} value={key}>
                {TARGET_ROLES[key].title}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Top 4 Summary Metric Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: ATS Resume Score */}
        <div 
          onClick={() => navigate('/resume-checker')}
          className="glass-card glass-card-hover p-6 rounded-2xl cursor-pointer space-y-3 border border-white/10"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>ATS Resume Score</span>
            <FileText className="w-4 h-4 text-[#7C5CFC]" />
          </div>
          <div className="text-3xl font-extrabold gradient-text">{atsScore} / 100</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{atsScore >= 80 ? 'Strong ATS Match' : 'Optimizations Available'}</span>
          </div>
        </div>

        {/* Metric 2: Interview Rating */}
        <div 
          onClick={() => navigate('/mock-interview')}
          className="glass-card glass-card-hover p-6 rounded-2xl cursor-pointer space-y-3 border border-white/10"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Mock Interview Score</span>
            <MessageSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold gradient-text-cyan">{interviewScore} / 10</div>
          <div className="text-[11px] text-cyan-300 font-semibold">
            {state.interviewHistory?.length || 0} session(s) completed
          </div>
        </div>

        {/* Metric 3: Roadmap Completion */}
        <div 
          onClick={() => navigate('/roadmap')}
          className="glass-card glass-card-hover p-6 rounded-2xl cursor-pointer space-y-3 border border-white/10"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Roadmap Completion</span>
            <Map className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400">{roadmapPercent}%</div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400" style={{ width: `${roadmapPercent}%` }} />
          </div>
        </div>

        {/* Metric 4: Applications Submitted */}
        <div 
          onClick={() => navigate('/internships')}
          className="glass-card glass-card-hover p-6 rounded-2xl cursor-pointer space-y-3 border border-white/10"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Internships Applied</span>
            <Briefcase className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400">{appliedCount}</div>
          <div className="text-[11px] text-slate-300 font-semibold">
            {appliedCount > 0 ? `${appliedCount} active submissions` : 'Explore open listings'}
          </div>
        </div>

      </div>

      {/* Quick Actions & Recent Activity Stream Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Quick Actions (5 Cards) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider">Quick Feature Launchpad</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <button
              onClick={() => navigate('/resume-checker')}
              className="glass-card p-4 rounded-xl text-left border border-white/10 hover:border-[#7C5CFC]/40 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Run ATS Resume Check</h4>
                  <p className="text-[10px] text-slate-400">Upload or scan text</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/mock-interview')}
              className="glass-card p-4 rounded-xl text-left border border-white/10 hover:border-cyan-500/40 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Start AI Mock Interview</h4>
                  <p className="text-[10px] text-slate-400">Practice questions</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/skill-gap')}
              className="glass-card p-4 rounded-xl text-left border border-white/10 hover:border-emerald-500/40 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Analyze Skill Radar</h4>
                  <p className="text-[10px] text-slate-400">Compare benchmarks</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/roadmap')}
              className="glass-card p-4 rounded-xl text-left border border-white/10 hover:border-amber-500/40 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Map className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Check Learning Roadmap</h4>
                  <p className="text-[10px] text-slate-400">Milestone checklists</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        </div>

        {/* Recent Activity Timeline Stream */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Recent Activity Log</span>
          </h3>

          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-start space-x-3 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7C5CFC] mt-1 shrink-0" />
              <div className="space-y-0.5">
                <p className="font-bold text-white">Analyzed Resume for {TARGET_ROLES[state.user.targetRole]?.title}</p>
                <p className="text-[10px] text-slate-400">Scored {atsScore}/100 with {state.resumeAnalysis?.missingKeywords.length || 0} missing keywords.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs pt-2 border-t border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-0.5">
                <p className="font-bold text-white">Completed AI Mock Interview Session</p>
                <p className="text-[10px] text-slate-400">Achieved average answer score of {interviewScore}/10.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs pt-2 border-t border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1 shrink-0" />
              <div className="space-y-0.5">
                <p className="font-bold text-white">Updated Learning Roadmap Progress</p>
                <p className="text-[10px] text-slate-400">{roadmapPercent}% of total milestones completed.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
