'use client';
import { AnimatePresence } from 'framer-motion';
import useStore from '@/stores/useStore';
import NewsCard from './NewsCard';
import LiveIndicator from '@/components/common/LiveIndicator';
import { Layers } from 'lucide-react';
import useDashboardData from '@/hooks/useDashboardData';

export default function NewsFeed() {
  const { filteredEvents } = useDashboardData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="section-header" style={{ padding: 'var(--space-2) 0 var(--space-4)' }}>
        <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <LiveIndicator variant="live" label="LATEST NEWS & AI IMPACT" />
        </h3>
        <div className="badge badge-neutral">{filteredEvents.length} NEWS ITEMS</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <AnimatePresence initial={false}>
          {filteredEvents.map(event => (
            <NewsCard key={event.id} event={event} />
          ))}
        </AnimatePresence>
        
        {filteredEvents.length === 0 && (
          <div style={{ 
            padding: 'var(--space-8)', textAlign: 'center', 
            background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--border)', color: 'var(--text-muted)' 
          }}>
            <Layers size={32} style={{ margin: '0 auto var(--space-3)', opacity: 0.5 }} />
            <p>No events match the current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
