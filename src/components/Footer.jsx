import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Globe, Share2, Code2, Heart, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { addToast } = useApp();

  const handleLinkClick = (e, name) => {
    e.preventDefault();
    addToast(`${name} section is coming soon in v2.0 update!`, 'info');
  };

  return (
    <footer className="bg-[#0A0714] border-t border-white/10 text-slate-400 text-sm mt-20 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#7C5CFC]/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <NavLink to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl gradient-bg-accent flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                CareerLaunch <span className="text-[#22D3EE]">AI</span>
              </span>
            </NavLink>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empowering students and job-seekers with AI-driven resume scoring, 
              interactive mock interviews, skill gap visualization, and real internship matches.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#github"
                onClick={(e) => handleLinkClick(e, 'GitHub')}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => handleLinkClick(e, 'Twitter')}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Twitter Feed"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                onClick={(e) => handleLinkClick(e, 'LinkedIn')}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
                aria-label="LinkedIn Community"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Product Features</h4>
            <ul className="space-y-2 text-xs">
              <li><NavLink to="/resume-checker" className="hover:text-white transition-colors">ATS Resume Checker</NavLink></li>
              <li><NavLink to="/mock-interview" className="hover:text-white transition-colors">AI Mock Interview</NavLink></li>
              <li><NavLink to="/skill-gap" className="hover:text-white transition-colors">Skill Gap Analyzer</NavLink></li>
              <li><NavLink to="/roadmap" className="hover:text-white transition-colors">Learning Roadmap</NavLink></li>
              <li><NavLink to="/internships" className="hover:text-white transition-colors">Internship Board</NavLink></li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://roadmap.sh" target="_blank" rel="noreferrer" className="hover:text-white transition-colors inline-flex items-center space-x-1"><span>Roadmap.sh</span><ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://freecodecamp.org" target="_blank" rel="noreferrer" className="hover:text-white transition-colors inline-flex items-center space-x-1"><span>freeCodeCamp</span><ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://leetcode.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors inline-flex items-center space-x-1"><span>LeetCode Practice</span><ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="#blog" onClick={(e) => handleLinkClick(e, 'Career Blog')} className="hover:text-white transition-colors">Career Prep Blog</a></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'About Us')} className="hover:text-white transition-colors">About Mission</a></li>
              <li><a href="#privacy" onClick={(e) => handleLinkClick(e, 'Privacy Policy')} className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => handleLinkClick(e, 'Terms of Service')} className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'Contact Support')} className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CareerLaunch AI. All rights reserved.</p>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for job seekers & students worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
