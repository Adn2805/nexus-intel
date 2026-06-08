'use client';
import { sectors } from '@/lib/data/sectors';
import useStore from '@/stores/useStore';
import { Filter } from 'lucide-react';
import useDashboardData from '@/hooks/useDashboardData';

export default function Sidebar() {
  const toggleSectorFilter = useStore(s => s.toggleSectorFilter);
  const toggleImpactFilter = useStore(s => s.toggleImpactFilter);
  const toggleCategoryFilter = useStore(s => s.toggleCategoryFilter);
  const isMobileMenuOpen = useStore(s => s.isMobileMenuOpen);
  const filters = useStore(s => s.filters);
  const { sectorImpacts } = useDashboardData();

  const categories = ['Geopolitical', 'Economic', 'Technology', 'Corporate', 'Energy', 'Healthcare', 'Crypto'];

  return (
    <aside className={`glass-sidebar dashboard-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{ width: 'var(--sidebar-width)', height: '100%' }}>
      <div className="section-header">
        <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Filter size={14} /> FILTER BY IMPACT
        </h3>
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        {['positive', 'negative', 'mixed'].map(impact => (
          <button
            key={impact}
            onClick={() => toggleImpactFilter(impact)}
            className={`tag ${filters.impacts.includes(impact) ? 'tag-active' : ''}`}
            style={{ flex: 1, justifyContent: 'center', textTransform: 'capitalize' }}
          >
            {impact}
          </button>
        ))}
      </div>

      <div className="section-header">
        <h3 className="section-title">FILTER BY INDUSTRY</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-4)', flex: 1, overflowY: 'auto' }}>
        {sectors.map(sector => {
          const isActive = filters.sectors.includes(sector.name);
          const impactData = sectorImpacts[sector.name] || { direction: 'neutral' };
          const dotColor = impactData.direction === 'positive' ? 'var(--positive)' : impactData.direction === 'negative' ? 'var(--negative)' : 'var(--mixed)';
          
          return (
            <button
              key={sector.id}
              onClick={() => toggleSectorFilter(sector.name)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '6px 10px', borderRadius: 'var(--radius-sm)',
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                transition: 'all 0.2s', textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span>{sector.icon}</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: isActive ? 600 : 400 }}>{sector.name}</span>
              </div>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: impactData.count > 0 ? dotColor : 'transparent' }} />
            </button>
          );
        })}
      </div>

      <div className="section-header">
        <h3 className="section-title">FILTER BY TOPIC</h3>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => toggleCategoryFilter(cat)}
            className={`tag ${filters.categories.includes(cat) ? 'tag-active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </aside>
  );
}
