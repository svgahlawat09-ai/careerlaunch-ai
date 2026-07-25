# 🚀 CareerLaunch AI — AI-Powered Job-Readiness Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**CareerLaunch AI** is a complete, production-grade, web application designed to help students, fresh graduates, and career seekers become job-ready through intelligent resume analysis, AI mock interviews, skill gap radar visualization, personalized learning roadmaps, and curated internship recommendations.

---

## 🌟 Key Features

### 📄 1. AI ATS Resume Checker (`/resume-checker`)
- **Drag-and-Drop Parsing**: Upload `.pdf`, `.docx`, or `.txt` resumes, or try a demo resume with one click.
- **ATS Compatibility Score**: Animated circular gauge measuring keyword match, section completeness (Contact, Summary, Experience, Education, Skills), action verb usage, and word count health.
- **Missing Keywords Chips**: Identifies exact target-role keywords missing from your resume.
- **PDF Report Download**: Export formatted ATS analysis summaries instantly using `jspdf`.

### 🎙️ 2. AI Mock Interview Simulator (`/mock-interview`)
- **Role & Difficulty Tracks**: Choose from Frontend Developer, Backend Engineer, Data Analyst, Product Manager, or HR/Behavioral interviews across Beginner, Intermediate, and Advanced tiers.
- **Real-Time Evaluation Engine**: Interactive chat interface scoring answer length, STAR method structure, filler word ratio, and technical keyword precision (scored out of 10).
- **Session Reports & History**: Saves interview history locally so candidates can track progress over time.

### 🎯 3. Interactive Skill Gap Analysis (`/skill-gap`)
- **Recharts Radar Chart**: Interactive 0-5 skill sliders comparing your current self-ratings against industry benchmark levels.
- **Severity Badges**: Categorizes gaps into *Critical*, *Moderate*, and *Minor* priorities.
- **Roadmap Deep-Links**: Direct links into recommended learning resources based on identified gaps.

### 🗺️ 4. Personalized Learning Roadmap (`/roadmap`)
- **Role-Based Stepper Timeline**: Step-by-step phases (*Foundations*, *Core Skills*, *Projects*, *Advanced*, *Interview Prep*).
- **Checkable Milestones**: Check off completed items to update a top circular progress ring with celebration animations powered by `canvas-confetti`.
- **Verified Resources**: Curated outbound links to freeCodeCamp, MDN Web Docs, LeetCode, Coursera, and roadmap.sh.

### 💼 5. Smart Internship Recommendations (`/internships`)
- **Curated Listing Board**: 16+ realistic internship listings with match percentages calculated against candidate skills.
- **Live Search & Filters**: Filter by keyword, location (Remote/On-site/Hybrid), role category, and stipend range.
- **One-Click Application Flow**: Submit applications and track status progression (*Applied* / *Under Review*) in a dedicated "My Applications" dashboard.

### 📊 6. Central Student Dashboard (`/dashboard`)
- **Editable Profile**: Customize student name, active target role, and dynamic DiceBear avatar.
- **Metrics Summary**: Live widgets displaying latest ATS score, interview rating, roadmap progress %, and total applications.
- **Activity Log**: Real-time stream tracking recent actions across the platform.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom Dark SaaS Theme `#0F0B1E` base, glassmorphism, glowing gradients, Space Grotesk + Inter fonts)
- **Routing**: React Router v6 (Client-side SPA routing with `vercel.json` rewrite rules)
- **Icons**: `lucide-react`
- **Charts**: `recharts` (Radar Chart visualization)
- **Animations & Effects**: `framer-motion`, `canvas-confetti`
- **File Parsing & Export**: `mammoth` (DOCX), `jspdf` (PDF reports)
- **State Management**: React Context API + `useReducer` with automatic `localStorage` persistence
- **AI Simulation Layer**: Client-side rule-based NLP evaluation engine (`/src/lib/aiEngine.js`) — 100% zero configuration, no API keys required!

---

## ⚡ Quick Start / Local Setup

Follow these steps to run CareerLaunch AI locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_GITHUB_USERNAME/careerlaunch-ai.git
cd careerlaunch-ai

# 2. Install dependencies
npm install

# 3. Start the Vite local development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Production Build

To build the project for static production deployment:

```bash
npm run build
```

This creates an optimized production bundle in the `dist/` directory, ready to deploy to Vercel, Netlify, or GitHub Pages.

---

## 🌐 Live Demo & Deployment

- **Live URL**: *(Update after deploying on Vercel/Netlify)*
- **Vercel Deployment**: Connect repository to Vercel -> Framework: Vite -> Build command: `npm run build` -> Output directory: `dist`.

---

## 🔮 Future Improvements

- [ ] Connect real OpenAI / Anthropic / Gemini LLM API endpoints for dynamic question generation.
- [ ] Multi-user authentication (Firebase / Supabase Auth).
- [ ] Audio speech-to-text input for voice-based mock interviews.
- [ ] Enterprise recruiter dashboard for candidate shortlisting.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
