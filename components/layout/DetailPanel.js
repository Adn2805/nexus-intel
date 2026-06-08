'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, AlertTriangle, TrendingUp, TrendingDown, Target, ShieldCheck } from 'lucide-react';
import useStore from '@/stores/useStore';
import ImpactBadge from '@/components/impact/ImpactBadge';
import { timeAgo } from '@/lib/utils';

export default function DetailPanel() {
  const selectedEvent = useStore(s => s.selectedEvent);
  const clearSelectedEvent = useStore(s => s.clearSelectedEvent);
  const showDetail = useStore(s => s.showDetail);

  if (!selectedEvent || !showDetail) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="dashboard-detail glass-panel"
        style={{ width: 'var(--detail-width)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div className="badge badge-neutral">{selectedEvent.category}</div>
          <button onClick={clearSelectedEvent} style={{ padding: 4, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
            <X size={16} />
          </button>
        </div>

        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-2)', lineHeight: 1.3 }}>
          {selectedEvent.headline}
        </h2>
        
        <div style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
          <span>{selectedEvent.source}</span>
          <span>•</span>
          <span>{timeAgo(selectedEvent.timestamp)}</span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'var(--space-4)', background: 'rgba(255,255,255,0.03)',
          borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
          marginBottom: 'var(--space-6)'
        }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 4 }}>OVERALL IMPACT</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
              {selectedEvent.impactScore}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--accent)' }}>{selectedEvent.impactLabel}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>SEVERITY: {selectedEvent.severity.toUpperCase()}</div>
          </div>
        </div>

        <div className="section-header"><h3 className="section-title"><Brain size={14} /> AI EXPLANATION (WHY IS THIS HAPPENING?)</h3></div>
        <div style={{
          padding: 'var(--space-4)',
          background: 'var(--accent-dim)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0',
          fontSize: 'var(--text-sm)', color: 'var(--text-primary)',
          lineHeight: 1.6, marginBottom: 'var(--space-6)'
        }}>
          {selectedEvent.aiReasoning}
        </div>

        <div className="section-header">
          <h3 className="section-title">AFFECTED STOCKS</h3>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: 2, textTransform: 'none' }}>Specific companies impacted by this news</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
          {selectedEvent.affectedStocks.map(stock => (
            <div key={stock.ticker} style={{
              display: 'flex', flexDirection: 'column', padding: 'var(--space-3)',
              background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{stock.ticker}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{stock.name}</span>
                </div>
                <ImpactBadge impact={stock.impact} score={stock.score} size="sm" />
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{stock.reasoning}</div>
            </div>
          ))}
        </div>

        <div className="section-header">
          <h3 className="section-title">DOMINO EFFECT (INDUSTRIES)</h3>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: 2, textTransform: 'none' }}>How this ripples through different sectors</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
          {selectedEvent.affectedSectors.map(sector => (
            <div key={sector.name} className={`tag ${sector.impact === 'positive' ? 'impact-bg-positive' : sector.impact === 'negative' ? 'impact-bg-negative' : 'impact-bg-mixed'}`}>
              {sector.name}
            </div>
          ))}
        </div>

        <div className="section-header">
          <h3 className="section-title">HOW SURE IS THE AI?</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          {[
            { label: 'Source Credibility', val: selectedEvent.credibilityScore, icon: <ShieldCheck size={14} /> },
            { label: 'AI Confidence', val: 92, icon: <Target size={14} /> },
            { label: 'Market Urgency', val: 85, icon: <AlertTriangle size={14} /> }
          ].map((metric, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                {metric.icon} {metric.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div className="score-bar" style={{ width: 60, background: 'rgba(255,255,255,0.1)' }}>
                  <div className="score-bar-fill" style={{ width: `${metric.val}%`, background: 'var(--accent)' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', width: 24, textAlign: 'right' }}>{metric.val}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
