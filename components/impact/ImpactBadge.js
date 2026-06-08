'use client';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function ImpactBadge({ impact, score, size = 'md' }) {
  let icon = <Minus size={size === 'sm' ? 12 : 14} />;
  let label = 'Mixed';
  let className = 'badge-mixed';

  if (impact === 'positive') {
    icon = <TrendingUp size={size === 'sm' ? 12 : 14} />;
    label = 'Positive';
    className = 'badge-positive';
  } else if (impact === 'negative') {
    icon = <TrendingDown size={size === 'sm' ? 12 : 14} />;
    label = 'Negative';
    className = 'badge-negative';
  }

  const padding = size === 'sm' ? '2px 6px' : '4px 10px';
  const fontSize = size === 'sm' ? 'var(--text-xs)' : 'var(--text-sm)';

  return (
    <div className={`badge ${className}`} style={{ padding, fontSize }}>
      {icon}
      <span>{label}</span>
      {score !== undefined && (
        <span style={{ marginLeft: 4, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{score}</span>
      )}
    </div>
  );
}
