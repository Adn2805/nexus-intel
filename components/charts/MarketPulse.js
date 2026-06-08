'use client';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { sectors } from '@/lib/data/sectors';
import useDashboardData from '@/hooks/useDashboardData';

export default function MarketPulse() {
  const { sectorImpacts } = useDashboardData();
  
  // Get active sectors from impacts, or default to all sectors if none active yet
  const activeSectors = Object.keys(sectorImpacts).length > 0 
    ? sectors.filter(s => sectorImpacts[s.name])
    : sectors.slice(0, 8);

  return (
    <div style={{ 
      overflow: 'hidden', 
      background: 'rgba(10, 14, 26, 0.6)', 
      borderTop: '1px solid var(--border)', 
      borderBottom: '1px solid var(--border)',
      padding: '8px 0',
      display: 'flex',
      whiteSpace: 'nowrap'
    }}>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          animation: scroll 40s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="ticker-track">
        {/* Render twice for seamless looping */}
        {[...activeSectors, ...activeSectors].map((sector, i) => {
          const impact = sectorImpacts[sector.name] || { totalScore: 0, count: 0, direction: 'neutral' };
          const avgScore = impact.count > 0 ? Math.round(Math.abs(impact.totalScore) / impact.count) : 0;
          
          let color = 'var(--text-secondary)';
          let icon = <Minus size={12} />;
          
          if (impact.direction === 'positive') {
            color = 'var(--positive)';
            icon = <TrendingUp size={12} />;
          } else if (impact.direction === 'negative') {
            color = 'var(--negative)';
            icon = <TrendingDown size={12} />;
          }

          return (
            <div key={`${sector.id}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: '0 var(--space-4)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
              <span>{sector.icon}</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{sector.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, color, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                {icon}
                {avgScore > 0 ? avgScore : '-'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
