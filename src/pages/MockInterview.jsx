import React, { useState } from 'react';
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
  TrendingUp 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QUESTION_BANK, TARGET_ROLES } from '../data/mockData';
import { 
  evaluateInterviewAnswer, 
  generateAdaptiveQuestionsLocal, 
  generateAdaptiveQuestionsGemini, 
  evaluateAnswerGemini 
} from '../lib/aiEngine';
import Skeleton from '../components/Skeleton';

export default function MockInterview() {
  const { state, dispatch, addToast } = useApp();
  
  // Setup State
  const [selectedRole, setSelectedRole] = useState(state.user.targetRole || 'frontend');
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  
  // Session State
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isGeneratingQs, setIsGeneratingQs] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [chatLog, setChatLog] = useState([]); // [{ sender: 'ai'|'user', text, eval }]
  const [sessionResults, setSessionResults] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const startInterviewSession = async () => {
    setIsGeneratingQs(true);
    addToast('Analyzing resume & generating questions...', 'info');

    try {
      let qList = [];
      if (state.apiKey && state.resumeText) {
        qList = await generateAdaptiveQuestionsGemini(state.apiKey, state.resumeText, selectedRole, selectedDifficulty);
      } else {
        qList = generateAdaptiveQuestionsLocal(state.resumeText || '', selectedRole, selectedDifficulty);
      }
      setQuestions(qList);
      setIsSessionActive(true);
      setCurrentQuestionIdx(0);
      setSessionResults(null);
      setChatLog([
        {
          sender: 'ai',
          text: `Welcome to your AI Mock Interview for ${TARGET_ROLES[selectedRole]?.title || selectedRole} (${selectedDifficulty.toUpperCase()} level). Let's begin with Question 1:\n\n"${qList[0].question}"`
        }
      ]);
      addToast('Adaptive Interview Started!', 'success');
    } catch (err) {
      console.error(err);
      const fallbackQs = generateAdaptiveQuestionsLocal(state.resumeText || '', selectedRole, selectedDifficulty);
      setQuestions(fallbackQs);
      setIsSessionActive(true);
      setCurrentQuestionIdx(0);
      setSessionResults(null);
      setChatLog([
        {
          sender: 'ai',
          text: `Welcome. Let's begin with Question 1:\n\n"${fallbackQs[0].question}"`
        }
      ]);
      addToast('Started with standard questions.', 'info');
    } finally {
      setIsGeneratingQs(false);
    }
  };

  const handleSendAnswer = () => {
    if (!userAnswer.trim() || isAiThinking) return;

    const currentQ = questions[currentQuestionIdx];
    const answerText = userAnswer;
    setUserAnswer('');

    const updatedLog = [...chatLog, { sender: 'user', text: answerText }];
    setChatLog(updatedLog);
    setIsAiThinking(true);

    const runEvaluation = async () => {
      try {
        let evalResult;
        if (state.apiKey) {
          evalResult = await evaluateAnswerGemini(state.apiKey, currentQ.question, answerText, currentQ.keywords || []);
        } else {
          evalResult = evaluateInterviewAnswer(answerText, currentQ);
        }

        const aiResponseMsg = {
          sender: 'ai',
          text: `Score: ${evalResult.score}/10\n\n🎯 Technical Accuracy:\n${evalResult.technicalAccuracy || 'Analyzed'}\n\n💪 Strengths:\n${evalResult.strengths}\n\n⚠️ Weaknesses:\n${evalResult.weaknesses}\n\n🔄 STAR Format Detected: ${evalResult.starDetected ? 'Yes ✓' : 'No ✗'}\n\n💡 Tip: ${evalResult.tip}\n\nGeneral Feedback: ${evalResult.feedback}`,
          eval: evalResult
        };

        const newLogWithAi = [...updatedLog, aiResponseMsg];
        setChatLog(newLogWithAi);
        setIsAiThinking(false);

        if (currentQuestionIdx + 1 < questions.length) {
          const nextIdx = currentQuestionIdx + 1;
          setCurrentQuestionIdx(nextIdx);
          const nextQ = questions[nextIdx];
          
          setTimeout(() => {
            setChatLog((prev) => [
              ...prev,
              {
                sender: 'ai',
                text: `Question ${nextIdx + 1} of ${questions.length}:\n\n"${nextQ.question}"`
              }
            ]);
          }, 800);
        } else {
          finishInterviewSession(newLogWithAi);
        }
      } catch (err) {
        console.error(err);
        const evalResult = evaluateInterviewAnswer(answerText, currentQ);
        const aiResponseMsg = {
          sender: 'ai',
          text: `[Local Evaluation] Score: ${evalResult.score}/10\n\n💪 Strengths:\n${evalResult.strengths}\n\n⚠️ Weaknesses:\n${evalResult.weaknesses}\n\n💡 Tip: ${evalResult.tip}\n\nGeneral Feedback: ${evalResult.feedback}`,
          eval: evalResult
        };
        const newLogWithAi = [...updatedLog, aiResponseMsg];
        setChatLog(newLogWithAi);
        setIsAiThinking(false);

        if (currentQuestionIdx + 1 < questions.length) {
          const nextIdx = currentQuestionIdx + 1;
          setCurrentQuestionIdx(nextIdx);
          const nextQ = questions[nextIdx];
          setTimeout(() => {
            setChatLog((prev) => [
              ...prev,
              {
                sender: 'ai',
                text: `Question ${nextIdx + 1} of ${questions.length}:\n\n"${nextQ.question}"`
              }
            ]);
          }, 800);
        } else {
          finishInterviewSession(newLogWithAi);
        }
      }
    };

    runEvaluation();
  };

  const finishInterviewSession = (finalLog) => {
    const aiEvals = finalLog.filter(m => m.eval).map(m => m.eval);
    const avgScore = Number((aiEvals.reduce((acc, curr) => acc + curr.score, 0) / aiEvals.length).toFixed(1));

    const resultObj = {
      id: `hist-${Date.now()}`,
      roleTitle: TARGET_ROLES[selectedRole]?.title || selectedRole,
      roleKey: selectedRole,
      difficulty: selectedDifficulty,
      date: new Date().toISOString().split('T')[0],
      overallScore: avgScore,
      totalQuestions: questions.length,
      chatLog: finalLog
    };

    setSessionResults(resultObj);
    setIsSessionActive(false);
    dispatch({ type: 'ADD_INTERVIEW_RESULT', payload: resultObj });
    addToast(`Interview Completed! Score: ${avgScore}/10`, 'success');
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
            Simulate real interview questions with instant rule-based feedback on structure, keywords, and STAR method.
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
                  <span>{item.date}</span>
                  <span>{item.totalQuestions} Questions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SETUP VIEW (Before starting interview) */}
      {!isSessionActive && !sessionResults && (
        isGeneratingQs ? (
          <div className="max-w-3xl mx-auto">
            <Skeleton title="Generating Adaptive Interview Questions..." />
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-8 border border-white/10 max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl gradient-bg-accent mx-auto flex items-center justify-center shadow-lg shadow-[#7C5CFC]/30">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Configure Your Mock Interview</h2>
              <p className="text-xs text-slate-400">Select your focus role track and difficulty level to begin.</p>
              {state.resumeText ? (
                <p className="text-[11px] text-emerald-400 font-semibold mt-2">
                  ✓ Extracted resume detected! Questions will be tailored to your projects & experience.
                </p>
              ) : (
                <p className="text-[11px] text-cyan-300 font-semibold mt-2">
                  💡 Tip: Upload a resume on the Resume Checker page to generate customized project questions.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Role Track Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Select Target Role Track:</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-[#1E1B3A] text-white text-xs font-semibold p-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#7C5CFC]"
                >
                  <option value="frontend">Frontend Developer</option>
                  <option value="backend">Backend Engineer</option>
                  <option value="data-analyst">Data Analyst</option>
                  <option value="product-manager">Product Manager</option>
                  <option value="hr-behavioral">HR & Behavioral Interview</option>
                </select>
              </div>

              {/* Difficulty Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Select Difficulty Level:</label>
                <div className="grid grid-cols-3 gap-2">
                  {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedDifficulty(lvl)}
                      className={`py-2.5 rounded-xl text-xs font-semibold capitalize border transition-all ${
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
                className="w-full sm:w-auto px-10 py-4 rounded-xl gradient-bg-accent font-semibold text-white shadow-xl shadow-[#7C5CFC]/40 hover:scale-105 transition-transform flex items-center justify-center space-x-2 mx-auto"
              >
                <span>Start Interactive Interview</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )
      )}

      {/* ACTIVE INTERVIEW CHAT VIEW */}
      {isSessionActive && (
        <div className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col min-h-[550px] max-w-4xl mx-auto">
          
          {/* Top Progress Bar */}
          <div className="bg-[#16132D] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="w-5 h-5 text-[#22D3EE]" />
              <span className="font-bold text-sm text-white">
                {TARGET_ROLES[selectedRole]?.title || selectedRole} Interview
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <span className="text-slate-400">
                Question <strong className="text-white">{currentQuestionIdx + 1}</strong> of {activeQuestions.length}
              </span>
              <button 
                onClick={() => setIsSessionActive(false)}
                className="text-rose-400 hover:underline"
              >
                Exit Session
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[420px]">
            {chatLog.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl p-4 rounded-2xl space-y-2 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#7C5CFC] text-white rounded-br-none shadow-md'
                      : 'bg-white/10 border border-white/10 text-slate-100 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center space-x-2 font-bold text-[11px] opacity-80">
                    {msg.sender === 'user' ? (
                      <>
                        <User className="w-3.5 h-3.5" />
                        <span>You</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-3.5 h-3.5 text-[#22D3EE]" />
                        <span>AI Interviewer</span>
                      </>
                    )}
                  </div>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </motion.div>
            ))}

            {/* AI Typing Indicator */}
            {isAiThinking && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-4 rounded-2xl rounded-bl-none text-xs text-cyan-300 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>AI is evaluating your answer structure...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-[#16132D] border-t border-white/10 flex items-center space-x-3">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendAnswer();
                }
              }}
              placeholder="Type your response here... (Press Enter to send)"
              className="flex-1 glass-input p-3 rounded-xl text-xs resize-none h-16 focus:outline-none"
            />
            <button
              onClick={handleSendAnswer}
              disabled={!userAnswer.trim() || isAiThinking}
              className="w-12 h-12 rounded-xl gradient-bg-accent flex items-center justify-center text-white disabled:opacity-50 hover:scale-105 transition-transform shrink-0 cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
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
              {sessionResults.roleTitle} ({sessionResults.difficulty.toUpperCase()})
            </p>
          </div>

          {/* Score Metric Card */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Session Rating</span>
            <div className="text-5xl font-extrabold gradient-text-cyan">{sessionResults.overallScore} / 10</div>
            <p className="text-xs text-slate-300">
              {sessionResults.overallScore >= 8 ? 'Outstanding clarity and structure!' : 'Good effort! Review concrete tips below.'}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={startInterviewSession}
              className="flex-1 py-3.5 rounded-xl gradient-bg-accent font-semibold text-white text-xs flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Interview</span>
            </button>
            <button
              onClick={() => setSessionResults(null)}
              className="flex-1 py-3.5 rounded-xl bg-white/10 border border-white/10 font-semibold text-white text-xs hover:bg-white/20"
            >
              Try Different Role
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
