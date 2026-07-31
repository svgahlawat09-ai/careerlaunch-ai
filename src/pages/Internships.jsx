import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  X, 
  Send, 
  Building2, 
  Sparkles,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_INTERNSHIPS } from '../data/mockData';
import { matchInternships } from '../lib/aiEngine';
import Skeleton from '../components/Skeleton';

// Mapping helper for RemoteOK jobs
const mapRemoteOKJob = (job) => {
  let roleCategory = 'software-engineer';
  const title = (job.position || '').toLowerCase();
  
  if (title.includes('react') || title.includes('frontend') || title.includes('css')) roleCategory = 'frontend';
  else if (title.includes('node') || title.includes('backend') || title.includes('express') || title.includes('spring')) roleCategory = 'backend';
  else if (title.includes('data') || title.includes('analyst') || title.includes('analytics')) roleCategory = 'data-analyst';
  else if (title.includes('product') || title.includes('manager') || title.includes('pm')) roleCategory = 'product-manager';
  else if (title.includes('machine learning') || title.includes('ml') || title.includes('ai') || title.includes('deep learning')) roleCategory = 'ml-engineer';

  const stipendVal = job.salary ? `$${(job.salary / 12).toFixed(0)} - $${((job.salary * 1.2) / 12).toFixed(0)} / mo` : '$2,800 - $3,600 / mo';

  return {
    id: `remoteok-${job.id || Math.random()}`,
    title: job.position || 'Software Engineering Intern',
    company: job.company || 'Tech Partner',
    location: job.location || 'Remote',
    stipend: stipendVal,
    duration: '3 - 6 Months',
    applyDeadline: 'Rolling Basis',
    skills: job.tags && job.tags.length > 0 ? job.tags : ['JavaScript', 'React', 'Git'],
    postedDate: job.date ? new Date(job.date).toLocaleDateString() : 'Recently',
    url: job.url || 'https://remoteok.com',
    description: job.description ? job.description.replace(/<[^>]*>/g, '').substring(0, 300) + '...' : 'Remote engineering internship role.',
    requirements: [
      'Experience with version control tools like Git.',
      'Basic understanding of core software lifecycle.',
      'Strong collaborative communication skills.'
    ],
    roleCategory
  };
};

// Mapping helper for Arbeitnow jobs
const mapArbeitnowJob = (job) => {
  let roleCategory = 'software-engineer';
  const title = (job.title || '').toLowerCase();
  
  if (title.includes('react') || title.includes('frontend') || title.includes('css')) roleCategory = 'frontend';
  else if (title.includes('node') || title.includes('backend') || title.includes('express') || title.includes('spring')) roleCategory = 'backend';
  else if (title.includes('data') || title.includes('analyst') || title.includes('analytics')) roleCategory = 'data-analyst';
  else if (title.includes('product') || title.includes('manager') || title.includes('pm')) roleCategory = 'product-manager';
  else if (title.includes('machine learning') || title.includes('ml') || title.includes('ai') || title.includes('deep learning')) roleCategory = 'ml-engineer';

  return {
    id: `arbeitnow-${job.slug || Math.random()}`,
    title: job.title || 'Developer Intern',
    company: job.company_name || 'Innovations Ltd',
    location: job.location || 'Europe (Remote)',
    stipend: '$2,400 - $3,200 / mo',
    duration: '6 Months',
    applyDeadline: 'ASAP',
    skills: job.tags && job.tags.length > 0 ? job.tags : ['Node.js', 'API', 'Docker'],
    postedDate: 'Recently',
    url: job.url || 'https://www.arbeitnow.com',
    description: job.description ? job.description.replace(/<[^>]*>/g, '').substring(0, 300) + '...' : 'Live internship opportunity.',
    requirements: [
      'Enrolled or graduated in a computer science degree or boot camp.',
      'Familiarity with web technologies and relational databases.',
      'Passion for solving real-world challenges.'
    ],
    roleCategory
  };
};

export default function Internships() {
  const { state, dispatch, addToast } = useApp();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState(state.user.targetRole || 'All');

  // API State
  const [jobs, setJobs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  // Fetch live jobs on load with concurrent requests and a 3-second timeout limit
  const fetchLiveJobs = async () => {
    setIsLoadingJobs(true);
    let allFetchedJobs = [];

    const fetchWithTimeout = (url, timeout = 3000) => {
      return Promise.race([
        fetch(url),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
      ]);
    };

    const remoteOKPromise = fetchWithTimeout('https://remoteok.com/api', 3000)
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 1) {
            return data.slice(1).map(job => mapRemoteOKJob(job));
          }
        }
        return [];
      })
      .catch((e) => {
        console.warn("RemoteOK API failed or timed out, skipping:", e);
        return [];
      });

    const arbeitnowPromise = fetchWithTimeout('https://www.arbeitnow.com/api/job-board-api', 3000)
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json();
          if (json && Array.isArray(json.data)) {
            return json.data.map(job => mapArbeitnowJob(job));
          }
        }
        return [];
      })
      .catch((e) => {
        console.warn("Arbeitnow API failed or timed out, skipping:", e);
        return [];
      });

    try {
      const [remoteOKJobs, arbeitnowJobs] = await Promise.all([remoteOKPromise, arbeitnowPromise]);
      allFetchedJobs = [...remoteOKJobs, ...arbeitnowJobs];
    } catch (e) {
      console.warn("Concurrent fetches failed:", e);
    }

    if (allFetchedJobs.length === 0) {
      allFetchedJobs = MOCK_INTERNSHIPS.map(item => ({
        ...item,
        url: 'https://wellfound.com/jobs' // Ensure real apply url fallback
      }));
      addToast('CORS/API limits active. Loaded premium fallback listings.', 'info');
    } else {
      addToast(`Loaded ${allFetchedJobs.length} live internship opportunities!`, 'success');
    }

    setJobs(allFetchedJobs);
    setIsLoadingJobs(false);
  };

  useEffect(() => {
    fetchLiveJobs();
  }, []);

  // Match internships against user skill profile and resume text
  const matchedInternships = matchInternships(
    state.resumeText || '', 
    state.user.targetRole || 'frontend', 
    jobs,
    state.userSkills
  );

  // Filter listings
  const filteredListings = matchedInternships.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = selectedLocation === 'All' || 
                            (selectedLocation === 'Remote' && item.location.toLowerCase().includes('remote')) ||
                            (selectedLocation === 'Hybrid' && item.location.toLowerCase().includes('hybrid')) ||
                            (selectedLocation === 'On-site' && !item.location.toLowerCase().includes('remote') && !item.location.toLowerCase().includes('hybrid'));

    const matchesCategory = selectedCategory === 'All' || item.roleCategory === selectedCategory;

    return matchesSearch && matchesLocation && matchesCategory;
  });

  const handleApplyClick = (internship) => {
    dispatch({
      type: 'APPLY_INTERNSHIP',
      payload: internship
    });

    addToast(`Opening ${internship.company} application in a new tab!`, 'success');
    window.open(internship.url, '_blank', 'noopener,noreferrer');
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
          Explore real-time internship opportunities cross-referenced with your parsed resume and skill profile.
        </p>
      </div>

      {/* "My Applications" Mini Bar */}
      {state.myApplications?.length > 0 && (
        <div className="glass-card rounded-2xl p-4 border border-[#7C5CFC]/30 bg-[#7C5CFC]/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Active Applications ({state.myApplications.length})</span>
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
            <option value="All">All Categories</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Engineer</option>
            <option value="data-analyst">Data Analyst</option>
            <option value="product-manager">Product Manager</option>
            <option value="ml-engineer">ML Engineer</option>
            <option value="software-engineer">Software Engineer</option>
          </select>
        </div>

      </div>

      {/* Loading State */}
      {isLoadingJobs ? (
        <Skeleton title="Searching Live Internships..." />
      ) : (
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
                  <div className="flex flex-wrap gap-2 text-[10px] text-slate-300">
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{internship.location}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 flex items-center space-x-1">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                      <span>{internship.stipend}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{internship.duration}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-rose-400" />
                      <span>{internship.applyDeadline}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {internship.description}
                  </p>

                  {/* Match Reason Explainability */}
                  <div className="text-[11px] text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 leading-relaxed">
                    💡 {internship.matchExplanation}
                  </div>

                  {/* Detected vs Missing Skills Tags */}
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Skills Analysis:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {internship.matchedSkills?.slice(0, 4).map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">
                          ✓ {skill}
                        </span>
                      ))}
                      {internship.missingSkills?.slice(0, 4).map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px] font-bold">
                          ✗ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">{internship.postedDate}</span>
                  
                  <button
                    onClick={() => setSelectedInternship(internship)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold gradient-bg-accent text-white hover:scale-105 shadow-md shadow-[#7C5CFC]/30 cursor-pointer"
                  >
                    {isApplied ? 'Applied ✓' : 'View Details'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL MODAL WITH DIRECT OFFICIAL LINK */}
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

            <div className="pt-4 border-t border-white/10 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedInternship(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold text-white"
              >
                Close
              </button>
              <button
                onClick={() => handleApplyClick(selectedInternship)}
                className="px-6 py-2 rounded-xl gradient-bg-accent text-xs font-semibold text-white shadow-lg flex items-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Apply Externally (New Tab)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
