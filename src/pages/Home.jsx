import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  FileText, 
  MessageSquare, 
  Target, 
  Map, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  // Testimonials Carousel State
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Frontend Developer Intern @ TechCorp",
      college: "Stanford University",
      quote: "The ATS Resume Checker pinpointed keywords I was missing for React roles. Within 2 weeks of tweaking my resume, I got 4 interview callbacks!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    },
    {
      id: 2,
      name: "Marcus Vance",
      role: "Data Analyst @ Pulse Analytics",
      college: "MIT",
      quote: "The AI Mock Interview feature gave me realistic technical feedback on my SQL answers. It felt like talking to a real senior engineering manager.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      role: "Associate Product Manager Intern",
      college: "UC Berkeley",
      quote: "Skill Gap Analysis and the step-by-step roadmap gave me exact links to master wireframing and product analytics. Totally game changing!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="space-y-24 pb-12 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-4 max-w-7xl mx-auto">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#7C5CFC]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#7C5CFC]/30 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <span>Next-Gen AI Job Readiness Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Get Job-Ready with AI — <br className="hidden sm:block" />
              <span className="gradient-text-cyan">Resume to Offer Letter</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Supercharge your career preparation with instant ATS resume scoring, interactive AI mock interviews, 
              personalized skill gap analysis, and tailored internship recommendations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl gradient-bg-accent font-semibold text-white shadow-lg shadow-[#7C5CFC]/40 hover:shadow-[#7C5CFC]/60 hover:scale-105 transition-all flex items-center justify-center space-x-3 cursor-pointer group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold text-slate-200 hover:text-white transition-all text-center"
              >
                See How It Works
              </a>
            </div>

            {/* Quick Badges */}
            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs font-medium text-slate-400">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Setup Needed</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Free for Students</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-card rounded-3xl p-4 border border-white/15 shadow-2xl relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#1E1B3A] to-[#0F0B1E]">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                  alt="Students studying together" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B1E] via-transparent to-transparent" />
              </div>

              {/* Floating Badge overlay */}
              <div className="absolute -bottom-5 -left-5 glass-card p-4 rounded-2xl border border-white/15 shadow-xl flex items-center space-x-3 backdrop-blur-xl animate-float">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">ATS Match Rate</div>
                  <div className="text-sm font-bold text-white">94.8% Average Score</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* STATS COUNTER ROW */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-card rounded-2xl p-8 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold gradient-text">50,000+</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Resumes Analyzed</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold gradient-text-cyan">12,000+</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Mock Interviews</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">8,500+</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Internships Matched</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">94%</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE GRID (5 Cards) */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">
            Everything You Need to <span className="gradient-text">Land Your Dream Role</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Comprehensive suite of AI tools engineered specifically for students, fresh graduates, and career changers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Resume Checker */}
          <div 
            onClick={() => navigate('/resume-checker')}
            className="glass-card glass-card-hover p-6 rounded-2xl cursor-pointer space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                AI ATS Resume Checker
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scan your resume against target role keyword banks. Get instant ATS compatibility scores, section breakdowns, and actionable bullet fixes.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>Scan Resume Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 2: AI Mock Interview */}
          <div 
            onClick={() => navigate('/mock-interview')}
            className="glass-card glass-card-hover p-6 rounded-2xl cursor-pointer space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                AI Mock Interview
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Practice technical and behavioral role questions with real-time AI feedback on your structure, STAR alignment, and keyword clarity.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Start Mock Interview</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 3: Skill Gap Analysis */}
          <div 
            onClick={() => navigate('/skill-gap')}
            className="glass-card glass-card-hover p-6 rounded-2xl cursor-pointer space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                Skill Gap Analysis
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compare your current skill levels against real market benchmark requirements with an interactive radar chart and severity badges.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Analyze Skill Gaps</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 4: Learning Roadmap */}
          <div 
            onClick={() => navigate('/roadmap')}
            className="glass-card glass-card-hover p-6 rounded-2xl cursor-pointer space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Map className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                Personalized Learning Roadmap
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Auto-generated step-by-step career path populated with verified free resources (freeCodeCamp, MDN, LeetCode, Coursera).
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>View My Roadmap</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 5: Internship Recommendations */}
          <div 
            onClick={() => navigate('/internships')}
            className="glass-card glass-card-hover p-6 rounded-2xl cursor-pointer space-y-4 flex flex-col justify-between lg:col-span-2 group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                Smart Internship Recommendations
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Curated board of internship positions cross-referenced with your skill profile. Apply in one click and track application statuses.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform">
              <span>Explore Internships</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS 4-STEP TIMELINE */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 space-y-12 pt-12 border-t border-white/10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">
            How CareerLaunch AI <span className="gradient-text-cyan">Works</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            4 simple steps from uploading your draft resume to receiving your internship offer letter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          <div className="glass-card p-6 rounded-2xl space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-[#7C5CFC] font-extrabold text-white flex items-center justify-center text-sm shadow-md">
              01
            </div>
            <h4 className="font-bold text-white text-sm">Upload Resume</h4>
            <p className="text-xs text-slate-400">
              Drag & drop your .pdf, .docx, or .txt file for client-side ATS analysis.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-cyan-500 font-extrabold text-white flex items-center justify-center text-sm shadow-md">
              02
            </div>
            <h4 className="font-bold text-white text-sm">Get AI Feedback</h4>
            <p className="text-xs text-slate-400">
              Review missing keywords, formatting score, and download an instant PDF report.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-emerald-500 font-extrabold text-white flex items-center justify-center text-sm shadow-md">
              03
            </div>
            <h4 className="font-bold text-white text-sm">Practice Mock Interview</h4>
            <p className="text-xs text-slate-400">
              Answer simulated role questions and refine your answers using STAR feedback.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500 font-extrabold text-white flex items-center justify-center text-sm shadow-md">
              04
            </div>
            <h4 className="font-bold text-white text-sm">Land Internship</h4>
            <p className="text-xs text-slate-400">
              Follow your personalized roadmap and apply to best-fit internships.
            </p>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Loved by Students & Job Seekers</h2>
          <div className="flex items-center justify-center space-x-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 border border-white/15 relative">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            <img 
              src={testimonials[activeTestimonial].avatar} 
              alt={testimonials[activeTestimonial].name}
              className="w-20 h-20 rounded-full bg-[#7C5CFC]/20 p-1 border-2 border-[#7C5CFC]/50 shrink-0" 
            />
            <div className="space-y-3">
              <p className="text-sm sm:text-base italic text-slate-200">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div>
                <h4 className="font-bold text-white text-sm">{testimonials[activeTestimonial].name}</h4>
                <p className="text-xs text-slate-400">{testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].college}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-3 pt-6">
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === activeTestimonial ? 'bg-[#7C5CFC] w-6' : 'bg-white/20'
                }`}
              />
            ))}
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-card rounded-3xl p-10 border border-[#7C5CFC]/30 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 gradient-bg-accent opacity-10 pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Launch Your Career?
          </h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Analyze your resume now and start practicing mock interviews in under 2 minutes.
          </p>
          <div>
            <button
              onClick={() => navigate('/resume-checker')}
              className="px-8 py-4 rounded-xl gradient-bg-accent font-semibold text-white shadow-xl shadow-[#7C5CFC]/40 hover:scale-105 transition-transform"
            >
              Try AI Resume Checker Free
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
