'use client';
import { Grid } from 'lucide-react';
import { sectors } from '@/lib/data/sectors';
import useDashboardData from '@/hooks/useDashboardData';
import useStore from '@/stores/useStore';

export default function HeatMap() {
  const { sectorImpacts } = useDashboardData();
  const toggleSectorFilter = useStore(s => s.toggleSectorFilter);
  const filters = useStore(s => s.filters);

  return (
    <div>
      <div className="section-header">
        <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Grid size={14} /> HOW INDUSTRIES ARE REACTING
        </h3>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: 2, textTransform: 'none' }}>Green means companies are benefiting. Red means they are hurting.</p>
      </div>
      <div className="heatmap-grid">
        {sectors.map(sector => {
          const impact = sectorImpacts[sector.name] || { totalScore: 0, count: 0, direction: 'neutral' };
          const avgScore = impact.count > 0 ? Math.round(Math.abs(impact.totalScore) / impact.count) : 0;
          
          let bgColor = 'rgba(255,255,255,0.03)';
          let textColor = 'var(--text-secondary)';
          if (impact.count > 0) {
            const intensity = Math.min(avgScore / 100, 1);
            if (impact.direction === 'positive') {
              bgColor = `rgba(0, 227, 158, ${0.1 + intensity * 0.3})`;
              textColor = 'var(--positive)';
            } else if (impact.direction === 'negative') {
              bgColor = `rgba(255, 71, 87, ${0.1 + intensity * 0.3})`;
              textColor = 'var(--negative)';
            } else {
              bgColor = `rgba(255, 165, 2, ${0.1 + intensity * 0.3})`;
              textColor = 'var(--mixed)';
            }
          }

          const isActive = filters.sectors.includes(sector.name);
          const borderStyle = isActive ? `1px solid ${textColor}` : '';
          
          let impactClass = 'impact-neutral';
          if (impact.count > 0) {
            impactClass = impact.direction === 'positive' ? 'impact-up' : impact.direction === 'negative' ? 'impact-down' : 'impact-mixed';
          }

          return (
            <div
              key={sector.id}
              className={`heatmap-cell ${impactClass}`}
              style={{ border: borderStyle }}
              onClick={() => toggleSectorFilter(sector.name)}
              title={`${sector.name}: ${avgScore} avg impact`}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{sector.icon}</div>
              <div className="heatmap-cell-label" style={{ color: impact.count > 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {sector.name}
              </div>
              <div className="heatmap-cell-value" style={{ color: textColor }}>
                {impact.count > 0 ? `${impact.direction === 'positive' ? '+' : impact.direction === 'negative' ? '-' : ''}${avgScore}` : '-'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
