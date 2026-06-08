'use client';
import { useState, useEffect } from 'react';
import { Search, Activity, Menu } from 'lucide-react';
import useStore from '@/stores/useStore';
import useDashboardData from '@/hooks/useDashboardData';

export default function Navbar() {
  const [time, setTime] = useState('');
  const { activeEventsCount, marketMood } = useDashboardData();
  const setFilter = useStore(s => s.setFilter);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="glass-nav" style={{
      height: 'var(--navbar-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--space-4)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <button 
          className="mobile-only" 
          onClick={() => useStore.getState().toggleMobileMenu()}
          style={{ display: 'flex', alignItems: 'center', color: 'var(--text-primary)' }}
        >
          <Menu size={20} />
        </button>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'var(--text-xl)',
          letterSpacing: '-0.02em',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          NexusIntel
        </div>
        <div className="badge badge-neutral hide-on-mobile" style={{ fontSize: 10 }}>INTELLIGENCE</div>
      </div>

      <div style={{ flex: 1, maxWidth: 400, margin: '0 var(--space-4)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
          background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-full)', padding: '6px 16px'
        }}>
          <Search size={16} color="var(--text-secondary)" />
          <input
            type="text"
            placeholder="Search events, tickers, sectors..."
            onChange={(e) => setFilter('search', e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Activity size={16} color="var(--positive)" />
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>{activeEventsCount}</strong> ACTIVE
          </span>
        </div>

        <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: marketMood.score > 55 ? 'var(--positive)' : marketMood.score < 45 ? 'var(--negative)' : 'var(--mixed)'
          }} />
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>MOOD: {marketMood.label}</span>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          {time}
        </div>
      </div>
    </nav>
  );
}
