import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Skeleton({ title = "Analyzing with CareerLaunch AI..." }) {
  return (
    <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto space-y-6 text-center animate-pulse">
      <div className="flex items-center justify-center space-x-3 text-[#7C5CFC]">
        <Sparkles className="w-6 h-6 animate-spin" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      
      <div className="space-y-4 max-w-lg mx-auto">
        <div className="h-4 bg-white/10 rounded-full w-3/4 mx-auto"></div>
        <div className="h-4 bg-white/10 rounded-full w-full"></div>
        <div className="h-4 bg-white/10 rounded-full w-5/6 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="h-20 bg-white/5 rounded-xl border border-white/10"></div>
        <div className="h-20 bg-white/5 rounded-xl border border-white/10"></div>
        <div className="h-20 bg-white/5 rounded-xl border border-white/10"></div>
      </div>
    </div>
  );
}
