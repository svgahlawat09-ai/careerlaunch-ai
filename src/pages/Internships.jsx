import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Star, 
  X, 
  Send, 
  Building2, 
  Filter, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_INTERNSHIPS } from '../data/mockData';
import { matchInternships } from '../lib/aiEngine';

export default function Internships() {
  const { state, dispatch, addToast } = useApp();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicantName, setApplicantName] = useState(state.user.name || 'Alex Morgan');
  const [applicantNote, setApplicantNote] = useState('I am excited to apply for this internship role!');

  // Match internships against user skill profile
  const userSkillList = Object.keys(state.userSkills);
  const matchedInternships = matchInternships(userSkillList, state.user.targetRole || 'frontend', MOCK_INTERNSHIPS);

  // Filter listings
  const filteredListings = matchedInternships.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = selectedLocation === 'All' || 
                            (selectedLocation === 'Remote' && item.location.includes('Remote')) ||
                            (selectedLocation === 'Hybrid' && item.location.includes('Hybrid')) ||
                            (selectedLocation === 'On-site' && item.location.includes('On-site'));

    const matchesCategory = selectedCategory === 'All' || item.roleCategory === selectedCategory;

    return matchesSearch && matchesLocation && matchesCategory;
  });

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!selectedInternship) return;

    dispatch({
      type: 'APPLY_INTERNSHIP',
      payload: selectedInternship
    });

    addToast(`Application submitted to ${selectedInternship.company}!`, 'success');
    setShowApplyModal(false);
    setSelectedInternship(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center space-x-3">
          <Briefcase className="w-8 h-8 text-rose-400" />
          <span>Smart Internship Recommendations</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Explore top internship opportunities cross-referenced with your skill profile and target role.
        </p>
      </div>

      {/* "My Applications" Mini Bar (If any applied) */}
      {state.myApplications?.length > 0 && (
        <div className="glass-card rounded-2xl p-4 border border-[#7C5CFC]/30 bg-[#7C5CFC]/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>My Applications ({state.myApplications.length})</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            {state.myApplications.map((app) => (
              <div key={app.id} className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs flex items-center space-x-2">
                <span className="font-semibold text-white">{app.title}</span>
                <span className="text-slate-400">({app.company})</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter & Search Controls */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-4">
        
        {/* Search Bar */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, company, or skills (e.g. React, SQL)..."
            className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none"
          />
        </div>

        {/* Location Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-[#1E1B3A] text-white text-xs font-semibold p-2.5 rounded-xl border border-white/15 focus:outline-none"
          >
            <option value="All">All Locations</option>
            <option value="Remote">Remote Only</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#1E1B3A] text-white text-xs font-semibold p-2.5 rounded-xl border border-white/15 focus:outline-none"
          >
            <option value="All">All Role Categories</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Engineer</option>
            <option value="data-analyst">Data Analyst</option>
            <option value="product-manager">Product Manager</option>
            <option value="ml-engineer">ML Engineer</option>
          </select>
        </div>

      </div>

      {/* Internship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((internship) => {
          const logoUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(internship.company)}`;
          const isApplied = state.myApplications?.some(a => a.internshipId === internship.id);

          return (
            <div
              key={internship.id}
              className="glass-card glass-card-hover p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                
                {/* Header Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={logoUrl} 
                      alt={internship.company}
                      className="w-11 h-11 rounded-xl bg-white/10 p-1 border border-white/10 shrink-0" 
                    />
                    <div>
                      <h3 className="font-bold text-white text-sm group-hover:text-rose-300 transition-colors">
                        {internship.title}
                      </h3>
                      <p className="text-xs text-slate-400">{internship.company}</p>
                    </div>
                  </div>

                  {/* Match Percentage Badge */}
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-extrabold text-[11px] shrink-0">
                    {internship.matchPercentage}% Match
                  </span>
                </div>

                {/* Details Badges */}
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{internship.location}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 flex items-center space-x-1">
                    <DollarSign className="w-3 h-3 text-emerald-400" />
                    <span>{internship.stipend}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {internship.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {internship.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 rounded-md bg-[#7C5CFC]/15 text-[#22D3EE] text-[10px] font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">{internship.postedDate}</span>
                
                <button
                  onClick={() => setSelectedInternship(internship)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isApplied
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'gradient-bg-accent text-white hover:scale-105 shadow-md shadow-[#7C5CFC]/30'
                  }`}
                >
                  {isApplied ? 'Applied' : 'View & Apply'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* DETAIL & APPLICATION MODAL */}
      {selectedInternship && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card rounded-3xl p-8 border border-white/15 max-w-xl w-full space-y-6 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedInternship.company)}`} 
                  alt="Logo"
                  className="w-12 h-12 rounded-xl bg-white/10 p-1"
                />
                <div>
                  <h3 className="font-bold text-lg text-white">{selectedInternship.title}</h3>
                  <p className="text-xs text-slate-400">{selectedInternship.company} • {selectedInternship.location}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedInternship(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Role Description</h4>
              <p>{selectedInternship.description}</p>

              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] pt-2">Requirements</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                {selectedInternship.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Mock Application Form */}
            {showApplyModal ? (
              <form onSubmit={handleApplySubmit} className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="font-bold text-white text-xs">Submit Application</h4>
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-300 font-semibold">Applicant Full Name:</label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    required
                    className="w-full glass-input p-2.5 rounded-xl text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-300 font-semibold">Short Note to Recruiter:</label>
                  <textarea
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                    className="w-full glass-input p-2.5 rounded-xl text-xs h-20 resize-none focus:outline-none"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl gradient-bg-accent text-xs font-semibold text-white shadow-lg"
                  >
                    Confirm & Submit Application
                  </button>
                </div>
              </form>
            ) : (
              <div className="pt-4 border-t border-white/10 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedInternship(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="px-6 py-2 rounded-xl gradient-bg-accent text-xs font-semibold text-white shadow-lg flex items-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Apply Now</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
