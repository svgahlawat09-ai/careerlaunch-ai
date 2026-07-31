import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { SAMPLE_RESUME_TEXT, TARGET_ROLES, MOCK_INTERNSHIPS, ROLE_ROADMAPS } from '../data/mockData';
import { analyzeResume, computeSkillGap } from '../lib/aiEngine';

const AppContext = createContext();

const STORAGE_KEY = 'careerlaunch_ai_state_v1';

// Default initial state
const getInitialState = () => {
  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData) {
    try {
      return JSON.parse(localData);
    } catch (e) {
      console.error('Failed to parse state from localStorage', e);
    }
  }

  // Pre-fill initial skill ratings based on frontend default
  const defaultSkills = {};
  TARGET_ROLES.frontend.benchmarkSkills.forEach(s => {
    defaultSkills[s.name] = 3.0; // default initial slider value
  });

  // Default initial analysis
  const initialAnalysis = analyzeResume(SAMPLE_RESUME_TEXT, 'frontend');

  return {
    user: {
      name: 'Alex Morgan',
      email: 'alex.morgan@college.edu',
      targetRole: 'frontend',
      avatarSeed: 'Alex Morgan'
    },
    resumeText: SAMPLE_RESUME_TEXT,
    resumeAnalysis: initialAnalysis,
    interviewHistory: [
      {
        id: 'hist-1',
        roleTitle: 'Frontend Developer',
        roleKey: 'frontend',
        date: '2026-07-24',
        overallScore: 8.5,
        totalQuestions: 3,
        answers: [
          { question: "What is Virtual DOM in React?", score: 9.0, feedback: "Great explanation of reconciliation!" },
          { question: "Box model in CSS?", score: 8.0, feedback: "Solid understanding of border-box." }
        ]
      }
    ],
    userSkills: defaultSkills,
    roadmapProgress: {
      'fe-1': true,
      'fe-2': true
    },
    myApplications: [
      {
        id: 'app-1',
        internshipId: 'int-1',
        title: 'Frontend React Engineering Intern',
        company: 'Apex Cloud Systems',
        appliedAt: '2026-07-23',
        status: 'Under Review'
      }
    ],
    toasts: [],
    apiKey: ''
  };
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_API_KEY':
      return {
        ...state,
        apiKey: action.payload
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    case 'SET_TARGET_ROLE':
      const newRole = action.payload;
      const newSkills = {};
      (TARGET_ROLES[newRole]?.benchmarkSkills || []).forEach(s => {
        newSkills[s.name] = state.userSkills[s.name] ?? 2.5;
      });
      return {
        ...state,
        user: { ...state.user, targetRole: newRole },
        userSkills: { ...state.userSkills, ...newSkills },
        resumeAnalysis: state.resumeText ? analyzeResume(state.resumeText, newRole) : state.resumeAnalysis
      };

    case 'SET_RESUME_ANALYSIS':
      return {
        ...state,
        resumeText: action.payload.text,
        resumeAnalysis: action.payload.analysis
      };

    case 'ADD_INTERVIEW_RESULT':
      return {
        ...state,
        interviewHistory: [action.payload, ...state.interviewHistory]
      };

    case 'UPDATE_SKILL_RATING':
      return {
        ...state,
        userSkills: {
          ...state.userSkills,
          [action.payload.skillName]: action.payload.rating
        }
      };

    case 'TOGGLE_ROADMAP_ITEM':
      const currentVal = !!state.roadmapProgress[action.payload];
      return {
        ...state,
        roadmapProgress: {
          ...state.roadmapProgress,
          [action.payload]: !currentVal
        }
      };

    case 'APPLY_INTERNSHIP':
      if (state.myApplications.some(a => a.internshipId === action.payload.id)) {
        return state;
      }
      const newApp = {
        id: `app-${Date.now()}`,
        internshipId: action.payload.id,
        title: action.payload.title,
        company: action.payload.company,
        appliedAt: new Date().toISOString().split('T')[0],
        status: 'Applied'
      };
      return {
        ...state,
        myApplications: [newApp, ...state.myApplications]
      };

    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, { id: Date.now(), ...action.payload }]
      };

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.payload)
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, null, getInitialState);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    if (state) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    dispatch({ type: 'ADD_TOAST', payload: { message, type } });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
    }, 4000);
  };

  return (
    <AppContext.Provider value={{ state, dispatch, addToast }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
