import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Share2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Award 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { ROLE_ROADMAPS, TARGET_ROLES } from '../data/mockData';

export default function Roadmap() {
  const { state, dispatch, addToast } = useApp();
  const [selectedRole, setSelectedRole] = useState(state.user.targetRole || 'frontend');
  const [expandedPhases, setExpandedPhases] = useState({ 1: true, 2: true, 3: true, 4: true });

  const activeRoadmap = ROLE_ROADMAPS[selectedRole] || ROLE_ROADMAPS['frontend'];

  // Calculate overall completion percentage
  let totalItems = 0;
  let completedItems = 0;

  activeRoadmap.phases.forEach((phase) => {
    phase.items.forEach((item) => {
      totalItems++;
      if (state.roadmapProgress[item.id]) {
        completedItems++;
      }
    });
  });

  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const handleToggleItem = (itemId) => {
    dispatch({ type: 'TOGGLE_ROADMAP_ITEM', payload: itemId });

    // Trigger confetti on 100% completion!
    if (!state.roadmapProgress[itemId] && completedItems + 1 === totalItems) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      addToast('🎉 Congratulations! You completed your entire career roadmap!', 'success');
    }
  };

  const togglePhaseExpand = (phaseId) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const handleShareRoadmap = () => {
    const text = `🚀 My CareerLaunch AI Roadmap for ${activeRoadmap.roleTitle} is ${completionPercentage}% Complete! Check out CareerLaunch AI platform.`;
    navigator.clipboard.writeText(text);
    addToast('Shareable summary copied to clipboard!', 'success');
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    dispatch({ type: 'SET_TARGET_ROLE', payload: newRole });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header & Role Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center space-x-3">
            <Map className="w-8 h-8 text-amber-400" />
            <span>Personalized Learning Roadmap</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Structured step-by-step career path tailored to your target role with curated free learning resources.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-white/5 p-2 rounded-xl border border-white/10 shrink-0">
          <label className="text-xs font-semibold text-slate-300">Track:</label>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="bg-[#1E1B3A] text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/20 focus:outline-none focus:border-[#7C5CFC]"
          >
            {Object.keys(ROLE_ROADMAPS).map((key) => (
              <option key={key} value={key}>
                {ROLE_ROADMAPS[key].roleTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Overall Progress Ring Card */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center space-x-6">
          {/* Progress Ring */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-400 transition-all duration-700"
                strokeDasharray={`${completionPercentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-extrabold text-white">{completionPercentage}%</span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{activeRoadmap.roleTitle} Roadmap</h3>
            <p className="text-xs text-slate-300">
              {completedItems} of {totalItems} milestone items completed
            </p>
            <div className="inline-flex items-center space-x-1.5 text-[11px] text-amber-300 font-semibold pt-1">
              <Award className="w-3.5 h-3.5" />
              <span>{completionPercentage === 100 ? 'Roadmap Completed!' : 'Keep building daily momentum'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleShareRoadmap}
          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white flex items-center space-x-2 shrink-0 cursor-pointer transition-colors"
        >
          <Share2 className="w-4 h-4 text-amber-400" />
          <span>Share Roadmap</span>
        </button>

      </div>

      {/* Vertical Timeline / Stepper UI */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-white/10">
        {activeRoadmap.phases.map((phase) => {
          const isExpanded = expandedPhases[phase.phaseId];
          const phaseCompleted = phase.items.every((it) => state.roadmapProgress[it.id]);

          return (
            <div key={phase.phaseId} className="relative pl-12 space-y-3">
              
              {/* Stepper Circle Icon */}
              <div
                onClick={() => togglePhaseExpand(phase.phaseId)}
                className={`absolute left-2.5 top-2 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  phaseCompleted
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-[#1E1B3A] border-2 border-[#7C5CFC] text-[#7C5CFC]'
                }`}
              >
                {phaseCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-extrabold">{phase.phaseId}</span>
                )}
              </div>

              {/* Phase Header Box */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => togglePhaseExpand(phase.phaseId)}>
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-white flex items-center space-x-2">
                      <span>{phase.title}</span>
                      {phaseCompleted && (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                          Done
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400">{phase.description}</p>
                  </div>
                  <button className="text-slate-400 hover:text-white p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Collapsible Phase Items */}
                {isExpanded && (
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    {phase.items.map((item) => {
                      const isChecked = !!state.roadmapProgress[item.id];
                      return (
                        <div
                          key={item.id}
                          className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                            isChecked
                              ? 'bg-emerald-950/20 border-emerald-500/20 text-slate-300'
                              : 'bg-white/5 border-white/5 hover:border-white/10 text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleToggleItem(item.id)}
                              className="focus:outline-none cursor-pointer shrink-0"
                            >
                              {isChecked ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-500 hover:text-[#7C5CFC]" />
                              )}
                            </button>
                            <span className={`text-xs font-medium ${isChecked ? 'line-through opacity-60' : ''}`}>
                              {item.text}
                            </span>
                          </div>

                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-semibold text-cyan-300 hover:underline flex items-center space-x-1 shrink-0 ml-2"
                          >
                            <span>Resource</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
