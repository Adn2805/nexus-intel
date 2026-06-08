'use client';
import { motion } from 'framer-motion';
import LiveIndicator from '@/components/common/LiveIndicator';
import { timeAgo } from '@/lib/utils';
import useStore from '@/stores/useStore';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function NewsCard({ event }) {
  const selectEvent = useStore(s => s.selectEvent);
  
  const getImpactColor = () => {
    const s = event.sentiment?.score || 0;
    if (s > 0) return 'var(--positive)';
    if (s < 0) return 'var(--negative)';
    return 'var(--mixed)';
  };
  const impactColor = getImpactColor();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0, padding: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card glass-card-interactive"
      onClick={() => selectEvent(event)}
      style={{
        padding: 'var(--space-4)',
        borderLeft: `3px solid ${impactColor}`,
        display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {event.isBreaking && <LiveIndicator variant="breaking" />}
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {event.source.toUpperCase()}
          </span>
        </div>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
          {timeAgo(event.timestamp)}
        </span>
      </div>

      <div>
        <h4 style={{ fontSize: 'var(--text-md)', fontWeight: 600, lineHeight: 1.4, color: 'var(--text-primary)', marginBottom: 4 }}>
          {event.headline}
        </h4>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {event.summary}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        {event.affectedSectors.slice(0, 3).map((sec, i) => (
          <span key={i} className="badge badge-neutral" style={{ background: 'rgba(255,255,255,0.03)' }}>
            {sec.name}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
        {event.affectedStocks.slice(0, 4).map(stock => (
          <div key={stock.ticker} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: stock.impact === 'positive' ? 'var(--positive)' : stock.impact === 'negative' ? 'var(--negative)' : 'var(--mixed)' }}>
              {stock.impact === 'positive' ? <TrendingUp size={10} /> : stock.impact === 'negative' ? <TrendingDown size={10} /> : <Minus size={10} />}
            </span>
            {stock.ticker}
          </div>
        ))}
        {event.affectedStocks.length > 4 && (
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>+{event.affectedStocks.length - 4}</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--space-2)', paddingTop: 'var(--space-3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flex: 1, paddingRight: 'var(--space-4)' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>IMPACT</span>
          <div className="score-bar" style={{ flex: 1 }}>
            <div className="score-bar-fill" style={{ width: `${event.impactScore}%`, background: impactColor }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 700, color: impactColor }}>{event.impactScore}</span>
        </div>
        <div className={`badge ${event.severity === 'critical' ? 'badge-negative' : 'badge-neutral'}`} style={{ fontSize: 9 }}>
          {event.severity.toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
}
