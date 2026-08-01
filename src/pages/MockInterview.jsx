import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  History, 
  Award, 
  ChevronRight, 
  Bot, 
  User, 
  HelpCircle, 
  TrendingUp,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Lightbulb,
  Check,
  X,
  Mic,
  MicOff,
  Clock,
  Zap,
  CheckSquare,
  Square,
  Printer,
  Download,
  Info,
  ShieldCheck,
  Activity,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QUESTION_BANK, TARGET_ROLES } from '../data/mockData';
import { evaluateInterviewAnswer } from '../lib/aiEngine';

export default function MockInterview() {
  const { state, dispatch, addToast } = useApp();
  
  // Setup State
  const [selectedRole, setSelectedRole] = useState(state.user.targetRole || 'frontend');
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const [interviewMode, setInterviewMode] = useState('practice'); // 'practice' | 'timed'
  const [timerSecondsPerQ, setTimerSecondsPerQ] = useState(120); // 2 minutes default

  // Session State
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [chatLog, setChatLog] = useState([]); // [{ sender: 'ai'|'user', text, eval }]
  const [sessionResults, setSessionResults] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [openModelAnswers, setOpenModelAnswers] = useState({});

  // Feature States (Timer, Voice, Hints, STAR Checklist)
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [isRecording, setIsRecording] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showStarGuide, setShowStarGuide] = useState(false);
  const [starChecklist, setStarChecklist] = useState({ s: false, t: false, a: false, r: false });

  const recognitionRef = useRef(null);

  // Retrieve current active question bank
  const activeQuestions = QUESTION_BANK[selectedRole]?.[selectedDifficulty] || QUESTION_BANK['frontend']['beginner'];
  const currentQ = activeQuestions[currentQuestionIdx] || activeQuestions[0];

  // Timer countdown hook for Timed Mode
  useEffect(() => {
    let timerInterval = null;
    if (isSessionActive && interviewMode === 'timed' && !isAiThinking && timeRemaining > 0) {
      timerInterval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            handleSendAnswer(userAnswer.trim() || "Time expired before answer was fully submitted.");
            addToast("Time's up for this question!", "warning");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isSessionActive, interviewMode, isAiThinking, timeRemaining, userAnswer]);

  // Voice Input Speech-to-Text handler
  const toggleVoiceRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      addToast('Voice recording stopped.', 'info');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addToast('Speech Recognition is not supported in this browser. Please type your response.', 'warning');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        addToast('Listening... Speak your interview answer clearly.', 'info');
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setUserAnswer((prev) => (prev ? `${prev} ${transcript.trim()}` : transcript.trim()));
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        addToast(`Voice input error: ${event.error}`, 'error');
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      addToast('Could not initialize microphone.', 'error');
    }
  };

  const toggleModelAnswer = (idx) => {
    setOpenModelAnswers(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleStarCheck = (key) => {
    setStarChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const startInterviewSession = () => {
    setIsSessionActive(true);
    setCurrentQuestionIdx(0);
    setSessionResults(null);
    setOpenModelAnswers({});
    setShowHint(false);
    setStarChecklist({ s: false, t: false, a: false, r: false });
    setTimeRemaining(timerSecondsPerQ);

    const firstQ = activeQuestions[0];
    setChatLog([
      {
        sender: 'ai',
        text: `Welcome to your AI Mock Interview for ${TARGET_ROLES[selectedRole]?.title || selectedRole} (${selectedDifficulty.toUpperCase()} level - ${interviewMode.toUpperCase()} mode).\n\nLet's begin with Question 1 of ${activeQuestions.length}:\n\n"${firstQ.question}"`
      }
    ]);
    addToast(`Interview Session Started (${interviewMode} mode)! Good luck.`, 'info');
  };

  const handleSendAnswer = (overrideText = null) => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    const answerText = (overrideText !== null ? overrideText : userAnswer).trim();
    if (!answerText || isAiThinking) return;

    const activeQ = activeQuestions[currentQuestionIdx];
    setUserAnswer('');
    setShowHint(false);

    // Append user message
    const updatedLog = [...chatLog, { sender: 'user', text: answerText }];
    setChatLog(updatedLog);
    setIsAiThinking(true);

    // Simulate AI evaluation processing delay (1.2s)
    setTimeout(() => {
      const evalResult = evaluateInterviewAnswer(answerText, activeQ);
      
      const aiResponseMsg = {
        sender: 'ai',
        text: evalResult.feedback,
        eval: evalResult,
        question: activeQ
      };

      const newLogWithAi = [...updatedLog, aiResponseMsg];
      setChatLog(newLogWithAi);
      setIsAiThinking(false);

      // Reset checklist and timer for next question
      setStarChecklist({ s: false, t: false, a: false, r: false });
      setTimeRemaining(timerSecondsPerQ);

      // Automatically open model answer if user didn't know or response was off-topic
      if (evalResult.isIgnorant || evalResult.isOffTopic) {
        setOpenModelAnswers(prev => ({ ...prev, [newLogWithAi.length - 1]: true }));
      }

      // Check if more questions exist
      if (currentQuestionIdx + 1 < activeQuestions.length) {
        const nextIdx = currentQuestionIdx + 1;
        setCurrentQuestionIdx(nextIdx);
        const nextQ = activeQuestions[nextIdx];
        
        setTimeout(() => {
          setChatLog((prev) => [
            ...prev,
            {
              sender: 'ai',
              text: `Question ${nextIdx + 1} of ${activeQuestions.length}:\n\n"${nextQ.question}"`
            }
          ]);
        }, 900);
      } else {
        // Session Complete!
        finishInterviewSession(newLogWithAi);
      }
    }, 1200);
  };

  const finishInterviewSession = (finalLog) => {
    const aiEvals = finalLog.filter(m => m.eval).map(m => m.eval);
    const avgScore = Number((aiEvals.reduce((acc, curr) => acc + curr.score, 0) / (aiEvals.length || 1)).toFixed(1));

    // Calculate aggregated rubric metrics
    const totalKeywordsMatched = aiEvals.reduce((acc, curr) => acc + (curr.matchedKeywords?.length || 0), 0);
    const starRatio = Math.round((aiEvals.filter(e => e.metrics?.starDetected).length / (aiEvals.length || 1)) * 100);
    const avgWordCount = Math.round(aiEvals.reduce((acc, curr) => acc + (curr.metrics?.wordCount || 0), 0) / (aiEvals.length || 1));

    const resultObj = {
      id: `hist-${Date.now()}`,
      roleTitle: TARGET_ROLES[selectedRole]?.title || selectedRole,
      roleKey: selectedRole,
      difficulty: selectedDifficulty,
      mode: interviewMode,
      date: new Date().toISOString().split('T')[0],
      overallScore: avgScore,
      totalQuestions: activeQuestions.length,
      metrics: {
        keywordsMatched: totalKeywordsMatched,
        starStructureRatio: `${starRatio}%`,
        avgWordCount
      },
      chatLog: finalLog
    };

    setSessionResults(resultObj);
    setIsSessionActive(false);
    dispatch({ type: 'ADD_INTERVIEW_RESULT', payload: resultObj });
    addToast(`Interview Completed! Overall Score: ${avgScore}/10`, 'success');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center space-x-3">
            <MessageSquare className="w-8 h-8 text-[#22D3EE]" />
            <span>AI Mock Interview Simulator</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Simulate real technical & behavioral interview questions with intelligent evaluation, live speech recognition, timed mode, and STAR method analysis.
          </p>
        </div>

        {/* History Toggle Button */}
        {state.interviewHistory?.length > 0 && (
          <button
            onClick={() => setShowHistoryModal(!showHistoryModal)}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center space-x-2 cursor-pointer transition-all self-start md:self-auto"
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span>Past Interviews ({state.interviewHistory.length})</span>
          </button>
        )}
      </div>

      {/* Past History Modal Drawer */}
      {showHistoryModal && (
        <div className="glass-card p-6 rounded-2xl border border-white/15 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <History className="w-4 h-4 text-cyan-400" />
              <span>Saved Interview Session History</span>
            </h3>
            <button 
              onClick={() => setShowHistoryModal(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.interviewHistory.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{item.roleTitle}</span>
                  <span className="font-extrabold text-cyan-300">{item.overallScore} / 10</span>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>{item.date} • {item.difficulty?.toUpperCase()}</span>
                  <span>{item.totalQuestions} Questions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SETUP VIEW (Before starting interview) */}
      {!isSessionActive && !sessionResults && (
        <div className="glass-card rounded-3xl p-8 border border-white/10 max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl gradient-bg-accent mx-auto flex items-center justify-center shadow-lg shadow-[#7C5CFC]/30">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Configure Your Mock Interview</h2>
            <p className="text-xs text-slate-400">Select your target career track, interview mode, and difficulty level.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Role Track Selector */}
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Select Target Role Track:</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-[#1E1B3A] text-white text-xs font-semibold p-3.5 rounded-xl border border-white/20 focus:outline-none focus:border-[#7C5CFC]"
              >
                <option value="frontend">Frontend Developer</option>
                <option value="backend">Backend Engineer</option>
                <option value="software-engineer">Software Engineer (Generalist SDE)</option>
                <option value="ml-engineer">Machine Learning Engineer</option>
                <option value="data-analyst">Data Analyst</option>
                <option value="product-manager">Product Manager (APM)</option>
                <option value="system-design">System Design & Architecture</option>
                <option value="hr-behavioral">HR & Behavioral Interview</option>
              </select>
            </div>

            {/* Mode Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Select Practice Mode:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setInterviewMode('practice')}
                  className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    interviewMode === 'practice'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Practice Mode</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInterviewMode('timed')}
                  className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    interviewMode === 'timed'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Timed Test (2m/Q)</span>
                </button>
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Select Difficulty Level:</label>
              <div className="grid grid-cols-3 gap-2">
                {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedDifficulty(lvl)}
                    className={`py-3 rounded-xl text-xs font-semibold capitalize border transition-all cursor-pointer ${
                      selectedDifficulty === lvl
                        ? 'bg-[#7C5CFC] text-white border-[#7C5CFC] shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 text-center">
            <button
              onClick={startInterviewSession}
              className="w-full sm:w-auto px-10 py-4 rounded-xl gradient-bg-accent font-semibold text-white shadow-xl shadow-[#7C5CFC]/40 hover:scale-105 transition-transform flex items-center justify-center space-x-2 mx-auto cursor-pointer"
            >
              <span>Start Interactive Interview</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE INTERVIEW CHAT VIEW */}
      {isSessionActive && (
        <div className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col min-h-[620px] max-w-4xl mx-auto">
          
          {/* Top Progress & Timer Bar */}
          <div className="bg-[#16132D] px-6 py-4 border-b border-white/10 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-3">
              <Bot className="w-5 h-5 text-[#22D3EE]" />
              <span className="font-bold text-sm text-white">
                {TARGET_ROLES[selectedRole]?.title || selectedRole} ({selectedDifficulty.toUpperCase()})
              </span>
            </div>

            <div className="flex items-center space-x-4 text-xs">
              {interviewMode === 'timed' && (
                <div className={`px-3 py-1 rounded-xl font-bold flex items-center space-x-1.5 border ${
                  timeRemaining <= 30 ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timer: {formatTime(timeRemaining)}</span>
                </div>
              )}

              <span className="text-slate-400">
                Question <strong className="text-white">{currentQuestionIdx + 1}</strong> of {activeQuestions.length}
              </span>

              <button 
                onClick={() => setIsSessionActive(false)}
                className="text-rose-400 hover:underline cursor-pointer"
              >
                Exit Session
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[480px]">
            {chatLog.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl p-5 rounded-2xl space-y-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#7C5CFC] text-white rounded-br-none shadow-md'
                      : 'bg-[#1D1836] border border-white/15 text-slate-100 rounded-bl-none shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center space-x-2 font-bold text-[11px] opacity-90">
                      {msg.sender === 'user' ? (
                        <>
                          <User className="w-3.5 h-3.5 text-cyan-300" />
                          <span>Candidate Answer</span>
                        </>
                      ) : (
                        <>
                          <Bot className="w-3.5 h-3.5 text-[#22D3EE]" />
                          <span>AI Technical Interviewer</span>
                        </>
                      )}
                    </div>

                    {/* Score Badge for AI Feedback */}
                    {msg.eval && (
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] border ${
                        msg.eval.score >= 8 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                          : msg.eval.score >= 5 
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}>
                        Rating: {msg.eval.score} / 10
                      </span>
                    )}
                  </div>

                  {/* Main Message Text */}
                  <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>

                  {/* Detailed AI Feedback Accordions & Concept Tags */}
                  {msg.eval && (
                    <div className="space-y-3 pt-2 border-t border-white/10">
                      
                      {/* Ignorance / Off-Topic Notice Card */}
                      {msg.eval.isIgnorant && (
                        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>
                            <strong>Honesty Acknowledged:</strong> It's completely fine to say "I don't know". Review the model answer below to learn this concept for your real interview.
                          </span>
                        </div>
                      )}

                      {msg.eval.isOffTopic && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>
                            <strong>Off-Topic Response:</strong> Your answer did not mention the key technical terms expected for this question.
                          </span>
                        </div>
                      )}

                      {/* Keyword Concept Badges */}
                      {msg.eval.matchedKeywords?.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold text-slate-300">Matched Concepts:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.eval.matchedKeywords.map((kw, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-medium border border-emerald-500/30 flex items-center space-x-1">
                                <Check className="w-3 h-3" />
                                <span>{kw}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Model Answer Expandable Accordion */}
                      {msg.eval.modelAnswer && (
                        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                          <button
                            onClick={() => toggleModelAnswer(idx)}
                            className="w-full p-2.5 text-left text-xs font-semibold text-cyan-300 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <span className="flex items-center space-x-2">
                              <BookOpen className="w-4 h-4 text-cyan-400" />
                              <span>View Ideal Model Answer & Key Points</span>
                            </span>
                            {openModelAnswers[idx] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>

                          {openModelAnswers[idx] && (
                            <div className="p-3.5 space-y-3 bg-[#131027] text-xs border-t border-white/10">
                              <div>
                                <h4 className="font-bold text-white text-[11px] uppercase tracking-wider mb-1 text-cyan-400">Model Answer Explanation:</h4>
                                <p className="text-slate-200 leading-relaxed bg-black/20 p-2.5 rounded-lg border border-white/5">{msg.eval.modelAnswer}</p>
                              </div>

                              {msg.eval.keyConcepts?.length > 0 && (
                                <div className="space-y-1">
                                  <h4 className="font-bold text-white text-[11px] uppercase tracking-wider text-cyan-400">Key Concepts to Include:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                                    {msg.eval.keyConcepts.map((concept, cIdx) => (
                                      <li key={cIdx}>{concept}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* AI Typing Indicator */}
            {isAiThinking && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-4 rounded-2xl rounded-bl-none text-xs text-cyan-300 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>AI is analyzing your response for accuracy, keywords, and STAR structure...</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Hint Teaser Box */}
          {showHint && currentQ?.hint && (
            <div className="px-6 py-3 bg-[#1F193D] border-t border-cyan-500/30 text-xs text-cyan-200 flex items-start justify-between gap-2 animate-in fade-in">
              <div className="flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-bold">AI Hint / Concept Teaser:</strong>
                  <p className="mt-0.5 text-slate-300">{currentQ.hint}</p>
                </div>
              </div>
              <button onClick={() => setShowHint(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STAR Method Helper / Checklist Widget */}
          {showStarGuide && (
            <div className="px-6 py-3 bg-[#171330] border-t border-white/10 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white uppercase text-[10px] tracking-wider flex items-center space-x-1.5 text-rose-300">
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>STAR Method Answering Checklist</span>
                </span>
                <button onClick={() => setShowStarGuide(false)} className="text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 's', label: 'Situation', desc: 'Context & Background' },
                  { key: 't', label: 'Task', desc: 'Challenge & Goal' },
                  { key: 'a', label: 'Action', desc: 'Specific steps you took' },
                  { key: 'r', label: 'Result', desc: 'Outcome & Metrics' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleStarCheck(item.key)}
                    className={`p-2 rounded-lg border text-left flex items-start space-x-2 transition-all cursor-pointer ${
                      starChecklist[item.key]
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {starChecklist[item.key] ? <CheckSquare className="w-4 h-4 shrink-0" /> : <Square className="w-4 h-4 shrink-0" />}
                    <div>
                      <div className="font-bold text-[11px] text-white">{item.label}</div>
                      <div className="text-[9px] opacity-80">{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input Bar */}
          <div className="p-4 bg-[#16132D] border-t border-white/10 space-y-2">
            
            {/* Quick Action Helpers */}
            <div className="flex items-center justify-between text-xs flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium flex items-center space-x-1 cursor-pointer transition-all"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Hide Hint' : 'Need a Hint'}</span>
                </button>

                <button
                  onClick={() => setShowStarGuide(!showStarGuide)}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-medium flex items-center space-x-1 cursor-pointer transition-all"
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>STAR Helper</span>
                </button>
              </div>

              <button
                onClick={() => handleSendAnswer("I don't know this concept. Please explain the correct answer.")}
                disabled={isAiThinking}
                className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-medium flex items-center space-x-1 cursor-pointer transition-all"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>I don't know / Explain to me</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {/* Voice Microphone Practice Toggle */}
              <button
                type="button"
                onClick={toggleVoiceRecording}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
                  isRecording 
                    ? 'bg-rose-500 text-white animate-pulse border-rose-400 shadow-lg shadow-rose-500/40' 
                    : 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10'
                }`}
                title="Practice speaking (Speech-to-Text)"
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-cyan-400" />}
              </button>

              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendAnswer();
                  }
                }}
                placeholder={isRecording ? "Listening... Speak your answer now..." : "Type your answer here... (e.g. Explain concepts, STAR method, or click Mic for voice input)"}
                className="flex-1 glass-input p-3.5 rounded-xl text-xs resize-none h-14 focus:outline-none"
              />

              <button
                onClick={() => handleSendAnswer()}
                disabled={!userAnswer.trim() || isAiThinking}
                className="w-12 h-12 rounded-xl gradient-bg-accent flex items-center justify-center text-white disabled:opacity-50 hover:scale-105 transition-transform shrink-0 cursor-pointer shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* SESSION SUMMARY REPORT VIEW */}
      {sessionResults && (
        <div className="glass-card rounded-3xl p-8 border border-white/15 max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Interview Session Completed!</h2>
            <p className="text-xs text-slate-400">
              {sessionResults.roleTitle} ({sessionResults.difficulty.toUpperCase()} • {sessionResults.mode?.toUpperCase()} Mode)
            </p>
          </div>

          {/* Score Metric Card & Analytics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1 sm:col-span-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Session Rating</span>
              <div className="text-5xl font-extrabold gradient-text-cyan">{sessionResults.overallScore} / 10</div>
              <p className="text-xs text-slate-300">
                {sessionResults.overallScore >= 8 ? 'Outstanding technical accuracy, clarity, and STAR structure!' : 'Good effort! Review model answers to solidify technical concepts.'}
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Total Keywords Matched</span>
              <div className="text-xl font-bold text-emerald-300">{sessionResults.metrics?.keywordsMatched || 0} Terms</div>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">STAR Structure Ratio</span>
              <div className="text-xl font-bold text-cyan-300">{sessionResults.metrics?.starStructureRatio || '0%'}</div>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Avg Answer Depth</span>
              <div className="text-xl font-bold text-purple-300">{sessionResults.metrics?.avgWordCount || 0} words</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={startInterviewSession}
              className="flex-1 py-3.5 rounded-xl gradient-bg-accent font-semibold text-white text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Interview</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-6 py-3.5 rounded-xl bg-white/10 border border-white/10 font-semibold text-white text-xs hover:bg-white/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Save / Print Report</span>
            </button>

            <button
              onClick={() => setSessionResults(null)}
              className="flex-1 py-3.5 rounded-xl bg-white/5 border border-white/10 font-semibold text-slate-300 text-xs hover:bg-white/10 cursor-pointer"
            >
              Try Different Track
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
