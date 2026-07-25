import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  BarChart2, 
  BookOpen 
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { TARGET_ROLES } from '../data/mockData';
import { computeSkillGap } from '../lib/aiEngine';

export default function SkillGap() {
  const { state, dispatch, addToast } = useApp();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(state.user.targetRole || 'frontend');

  const roleConfig = TARGET_ROLES[selectedRole] || TARGET_ROLES['frontend'];
  const benchmarkSkills = roleConfig.benchmarkSkills;

  const handleRatingChange = (skillName, newRating) => {
    dispatch({
      type: 'UPDATE_SKILL_RATING',
      payload: { skillName, rating: parseFloat(newRating) }
    });
  };

  const gapAnalysisResults = computeSkillGap(state.userSkills, selectedRole);

  // Prepare data for Recharts Radar Chart
  const radarChartData = benchmarkSkills.map(skill => ({
    skill: skill.name,
    Current: state.userSkills[skill.name] ?? 3.0,
    Required: skill.level
  }));

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    dispatch({ type: 'SET_TARGET_ROLE', payload: role });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center space-x-3">
            <Target className="w-8 h-8 text-emerald-400" />
            <span>Interactive Skill Gap Analysis</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Rate your current proficiency to compare against market benchmark requirements for your target role.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center space-x-3 bg-white/5 p-2 rounded-xl border border-white/10 shrink-0">
          <label className="text-xs font-semibold text-slate-300">Target Role:</label>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="bg-[#1E1B3A] text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/20 focus:outline-none focus:border-[#7C5CFC]"
          >
            {Object.keys(TARGET_ROLES).map((key) => (
              <option key={key} value={key}>
                {TARGET_ROLES[key].title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Skill Rating Sliders */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Self-Rate Your Proficiency (0 to 5)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Adjust sliders to see live radar updates.</p>
            </div>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
              {benchmarkSkills.map((skill) => {
                const currentRating = state.userSkills[skill.name] ?? 3.0;
                return (
                  <div key={skill.name} className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-200">{skill.name}</span>
                      <span className="font-bold text-cyan-300">{currentRating} / 5.0</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={currentRating}
                      onChange={(e) => handleRatingChange(skill.name, e.target.value)}
                      className="w-full accent-[#7C5CFC] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Beginner (0)</span>
                      <span>Target: {skill.level}</span>
                      <span>Expert (5)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Recharts Radar Chart & Identified Gaps */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Radar Chart Panel */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-[#7C5CFC]" />
                <span>Proficiency Radar vs Industry Benchmark</span>
              </h3>
            </div>

            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarChartData}>
                  <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                  <PolarAngleAxis dataKey="skill" stroke="#CBD5E1" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} stroke="#64748B" />
                  <Radar name="Your Current Level" dataKey="Current" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.4} />
                  <Radar name="Required Level" dataKey="Required" stroke="#7C5CFC" fill="#7C5CFC" fillOpacity={0.3} />
                  <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E1B3A', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sorted Skill Gap List */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Identified Skill Gaps (Sorted by Severity)
            </h3>

            <div className="space-y-3">
              {gapAnalysisResults.map((gap) => (
                <div
                  key={gap.skillName}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-white">{gap.skillName}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          gap.severity === 'Critical'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : gap.severity === 'Moderate'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {gap.severity} Gap ({gap.gap > 0 ? `-${gap.gap}` : 'Matched'})
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{gap.reason}</p>
                  </div>

                  <button
                    onClick={() => {
                      addToast(`Navigating to Roadmap for ${gap.skillName}`, 'info');
                      navigate('/roadmap');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#7C5CFC]/20 hover:bg-[#7C5CFC]/30 border border-[#7C5CFC]/40 text-xs font-semibold text-cyan-300 flex items-center space-x-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Roadmap</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
