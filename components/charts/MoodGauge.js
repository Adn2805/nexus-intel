'use client';
import { Activity } from 'lucide-react';
import useDashboardData from '@/hooks/useDashboardData';

export default function MoodGauge() {
  const { marketMood } = useDashboardData();
  const score = marketMood.score; // 0 to 100
  
  // Calculate arc path
  const radius = 60;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  // Determine color based on score
  let color = 'var(--mixed)';
  if (score > 60) color = 'var(--positive)';
  else if (score < 40) color = 'var(--negative)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="section-header">
        <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Activity size={14} /> OVERALL MARKET MOOD
        </h3>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: 2, textTransform: 'none' }}>Is the news generally good or bad today?</p>
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', paddingTop: 'var(--space-4)' }}>
        <svg width="200" height="110" viewBox="0 0 200 110" style={{ overflow: 'visible' }}>
          {/* Background Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Colored Gradient Def */}
          <defs>
            <linearGradient id="moodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--negative)" />
              <stop offset="50%" stopColor="var(--mixed)" />
              <stop offset="100%" stopColor="var(--positive)" />
            </linearGradient>
          </defs>
          {/* Value Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#moodGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        
        <div style={{ position: 'absolute', bottom: 0, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-4xl)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
            {score}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color, letterSpacing: '0.1em', marginTop: 4 }}>
            {marketMood.label}
          </div>
        </div>
      </div>
      
      <p style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-4)' }}>
        {marketMood.description}
      </p>
    </div>
  );
}
