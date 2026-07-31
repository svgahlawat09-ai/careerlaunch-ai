import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Download, 
  Sparkles, 
  RefreshCw, 
  Zap, 
  Check, 
  ListChecks 
} from 'lucide-react';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import { useApp } from '../context/AppContext';
import { TARGET_ROLES, SAMPLE_RESUME_TEXT } from '../data/mockData';
import { analyzeResume, analyzeResumeGemini } from '../lib/aiEngine';
import Skeleton from '../components/Skeleton';

// Helper function to extract text from a PDF file dynamically via CDN (solves Vite bundler & worker errors)
const extractPdfText = async (file) => {
  return new Promise((resolve, reject) => {
    // If already loaded, extract immediately
    const pdfjs = window['pdfjs-dist/build/pdf'] || window.pdfjsLib;
    if (pdfjs) {
      runExtraction(pdfjs);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
    script.onload = () => {
      const loadedPdfjs = window['pdfjs-dist/build/pdf'] || window.pdfjsLib;
      if (loadedPdfjs) {
        loadedPdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
        runExtraction(loadedPdfjs);
      } else {
        reject(new Error('Failed to access PDF.js library after load.'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load PDF.js CDN script.'));
    document.head.appendChild(script);

    async function runExtraction(pdfEngine) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfEngine.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          text += pageText + '\n';
        }
        resolve(text);
      } catch (err) {
        reject(err);
      }
    }
  });
};

export default function ResumeChecker() {
  const { state, dispatch, addToast } = useApp();
  const [targetRole, setTargetRole] = useState(state.user.targetRole || 'frontend');
  const [inputText, setInputText] = useState(state.resumeText || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const analysis = state.resumeAnalysis || analyzeResume(inputText, targetRole);

  // File Upload Handlers
  const handleFileChange = async (file) => {
    if (!file) return;
    setIsAnalyzing(true);
    addToast(`Reading file: ${file.name}...`, 'info');

    try {
      let extractedText = '';
      if (file.name.endsWith('.txt')) {
        extractedText = await file.text();
      } else if (file.name.endsWith('.docx')) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        extractedText = result.value;
      } else if (file.name.endsWith('.pdf')) {
        try {
          extractedText = await extractPdfText(file);
        } catch (pdfErr) {
          console.error("pdfjs text extraction failed, falling back to raw read:", pdfErr);
          const text = await file.text();
          extractedText = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
        }
      } else {
        extractedText = await file.text();
      }

      if (!extractedText.trim()) {
        extractedText = SAMPLE_RESUME_TEXT;
      }

      setInputText(extractedText);
      runAnalysis(extractedText, targetRole);
    } catch (err) {
      console.error(err);
      addToast('Could not parse file. Loaded sample text for analysis.', 'info');
      setInputText(SAMPLE_RESUME_TEXT);
      runAnalysis(SAMPLE_RESUME_TEXT, targetRole);
    }
  };

  const runAnalysis = async (text, role) => {
    setIsAnalyzing(true);
    addToast('Running ATS Resume Checker...', 'info');
    try {
      let result;
      if (state.apiKey) {
        result = await analyzeResumeGemini(state.apiKey, text, role);
      } else {
        // Mock a brief delay for realistic loading UX
        await new Promise(resolve => setTimeout(resolve, 1200));
        result = analyzeResume(text, role);
      }
      dispatch({
        type: 'SET_RESUME_ANALYSIS',
        payload: { text, analysis: result }
      });
      addToast('ATS Resume Analysis Complete!', 'success');
    } catch (err) {
      console.error(err);
      const result = analyzeResume(text, role);
      dispatch({
        type: 'SET_RESUME_ANALYSIS',
        payload: { text, analysis: result }
      });
      addToast('Analysis complete (local fallback).', 'info');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setTargetRole(newRole);
    dispatch({ type: 'SET_TARGET_ROLE', payload: newRole });
    runAnalysis(inputText || SAMPLE_RESUME_TEXT, newRole);
  };

  const handleDemoResume = () => {
    setInputText(SAMPLE_RESUME_TEXT);
    runAnalysis(SAMPLE_RESUME_TEXT, targetRole);
  };

  const downloadPdfReport = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(124, 92, 252);
    doc.text("CareerLaunch AI — ATS Resume Report", 14, 20);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.text(`Target Role: ${TARGET_ROLES[targetRole]?.title}`, 14, 30);
    doc.text(`Overall ATS Score: ${analysis.overallScore} / 100`, 14, 37);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 44);

    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 48, 196, 48);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Score Breakdown:", 14, 58);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`• Keyword Match: ${analysis.keywordMatchScore}%`, 16, 66);
    doc.text(`• Formatting & Sections: ${analysis.formattingScore}%`, 16, 73);
    doc.text(`• Action Verbs Count: ${analysis.matchedActionVerbs.length} detected`, 16, 80);
    doc.text(`• Total Word Count: ${analysis.totalWords} words`, 16, 87);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Top Actionable Improvement Tips:", 14, 100);

    doc.setFont("helvetica", "normal");
    let yPos = 108;
    analysis.tips.forEach((tip, idx) => {
      const splitTip = doc.splitTextToSize(`${idx + 1}. ${tip}`, 180);
      doc.text(splitTip, 16, yPos);
      yPos += (splitTip.length * 6) + 2;
    });

    doc.save(`CareerLaunch_ATS_Report_${targetRole}.pdf`);
    addToast('Report downloaded as PDF!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center space-x-3">
            <FileText className="w-8 h-8 text-[#7C5CFC]" />
            <span>AI ATS Resume Checker</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Instantly scan your resume for keyword matches, section completeness, and formatting standards.
          </p>
        </div>

        {/* Target Role Dropdown */}
        <div className="flex items-center space-x-3 bg-white/5 p-2 rounded-xl border border-white/10 shrink-0">
          <label className="text-xs font-semibold text-slate-300">Target Role:</label>
          <select
            value={targetRole}
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

      {/* Main Upload / Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Drag & Drop + Textarea */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Upload Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileChange(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`glass-card rounded-2xl p-8 border-2 border-dashed text-center cursor-pointer transition-all ${
              dragActive ? 'border-[#7C5CFC] bg-[#7C5CFC]/10' : 'border-white/20 hover:border-white/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-[#7C5CFC]/20 text-[#7C5CFC] mx-auto flex items-center justify-center mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-white">Drag & drop your resume file here</p>
            <p className="text-xs text-slate-400 mt-1">Supports .pdf, .docx, .txt format</p>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Or edit / paste text below:</span>
            <button
              onClick={handleDemoResume}
              className="text-[#22D3EE] font-semibold hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Try a Demo Resume</span>
            </button>
          </div>

          {/* Resume Textarea */}
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            placeholder="Paste your full resume text here..."
            className="w-full h-64 glass-input p-4 rounded-xl text-xs leading-relaxed resize-none focus:outline-none"
          />

          <button
            onClick={() => runAnalysis(inputText, targetRole)}
            disabled={isAnalyzing || !inputText.trim()}
            className="w-full py-3.5 rounded-xl gradient-bg-accent font-semibold text-white shadow-lg shadow-[#7C5CFC]/30 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing Resume...' : 'Analyze Resume'}</span>
          </button>
        </div>

        {/* Right Column: ATS Score & Results Panel */}
        <div className="lg:col-span-7">
          {isAnalyzing ? (
            <Skeleton title="Scanning Resume against ATS Criteria..." />
          ) : (
            <div className="space-y-6">
              
              {/* ATS Score & Overall Gauge */}
              <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* Circular Animated Gauge */}
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white/10"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`${
                        analysis.overallScore >= 80
                          ? 'text-emerald-400'
                          : analysis.overallScore >= 60
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                      strokeDasharray={`${analysis.overallScore}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-extrabold text-white">{analysis.overallScore}</span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">ATS Score</span>
                  </div>
                </div>

                {/* Quick Metrics Breakdown */}
                <div className="flex-1 space-y-3 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Match Level</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      analysis.overallScore >= 80 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {analysis.overallScore >= 80 ? 'High Match' : 'Needs Optimization'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Keyword Match ({analysis.matchedKeywords.length} keywords)</span>
                        <span className="font-semibold">{analysis.keywordMatchScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#7C5CFC]" style={{ width: `${analysis.keywordMatchScore}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Formatting & Section Detection</span>
                        <span className="font-semibold">{analysis.formattingScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400" style={{ width: `${analysis.formattingScore}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <button
                      onClick={downloadPdfReport}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white flex items-center space-x-2 cursor-pointer transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Report</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Detected Sections Panel */}
              <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Detected Resume Sections</h3>
                <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
                  {Object.entries(analysis.sectionCheck).map(([sec, detected]) => (
                    <div
                      key={sec}
                      className={`p-3 rounded-xl border flex flex-col items-center text-center space-y-1 ${
                        detected
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      {detected ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      <span className="text-[10px] font-semibold capitalize">{sec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ATS Weighted Breakdown */}
              {analysis.atsBreakdown && (
                <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">ATS Score Criteria Breakdown</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Skills Match (35%)', data: analysis.atsBreakdown.skillsMatch },
                      { label: 'Experience Relevance (20%)', data: analysis.atsBreakdown.experienceRelevance },
                      { label: 'Keyword Coverage (15%)', data: analysis.atsBreakdown.keywordCoverage },
                      { label: 'Education (10%)', data: analysis.atsBreakdown.education },
                      { label: 'Resume Structure (10%)', data: analysis.atsBreakdown.resumeStructure },
                      { label: 'Projects (10%)', data: analysis.atsBreakdown.projects }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1 bg-white/5 p-3 rounded-xl border border-white/5 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-200">{item.label}</span>
                          <span className={`font-bold ${
                            item.data.score >= 80 ? 'text-emerald-400' : item.data.score >= 50 ? 'text-amber-400' : 'text-rose-400'
                          }`}>
                            {item.data.score} / 100
                          </span>
                        </div>
                        <p className="text-slate-400 text-[10px] leading-relaxed mt-0.5">{item.data.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detected and Missing Skills Grids */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Detected Skills */}
                <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Detected Skills</h3>
                    <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold">
                      {analysis.matchedKeywords?.length || 0} found
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.matchedKeywords?.length > 0 ? (
                      analysis.matchedKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-medium"
                        >
                          ✓ {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">No matching skills detected.</span>
                    )}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Missing Skills</h3>
                    <span className="text-[10px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-full font-semibold">
                      {analysis.missingKeywords?.length || 0} missing
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingKeywords?.length > 0 ? (
                      analysis.missingKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-medium"
                        >
                          + {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-emerald-400 font-semibold">
                        All key role terms detected! Great job.
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Actionable Improvement Tips */}
              <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                  <ListChecks className="w-4 h-4 text-[#7C5CFC]" />
                  <span>Prioritized Improvement Tips</span>
                </h3>
                <div className="space-y-3">
                  {analysis.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-[#7C5CFC]/20 text-[#7C5CFC] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
