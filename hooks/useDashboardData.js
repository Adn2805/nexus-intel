import { useMemo } from 'react';
import useStore from '@/stores/useStore';
import { generateMarketMood } from '@/lib/engine/aiReasoning';

export default function useDashboardData() {
  const events = useStore(s => s.events);
  const filters = useStore(s => s.filters);

  return useMemo(() => {
    let filtered = [...events];
    const { sectors, impacts, categories, search } = filters;

    if (sectors.length > 0) {
      filtered = filtered.filter((e) =>
        e.affectedSectors?.some((s) => sectors.includes(s.name))
      );
    }
    if (impacts.length > 0) {
      filtered = filtered.filter((e) => {
        const s = e.sentiment?.score || 0;
        let eventImpact = 'mixed';
        if (s > 0) eventImpact = 'positive';
        else if (s < 0) eventImpact = 'negative';
        return impacts.includes(eventImpact);
      });
    }
    if (categories.length > 0) {
      filtered = filtered.filter((e) =>
        categories.some((c) => (e.category || '').toLowerCase().includes(c.toLowerCase()))
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((e) =>
        (e.headline || '').toLowerCase().includes(q) ||
        (e.summary || '').toLowerCase().includes(q) ||
        e.affectedStocks?.some((s) => s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))
      );
    }

    const sectorImpacts = {};
    filtered.forEach((evt) => {
      if (evt.affectedSectors) {
        evt.affectedSectors.forEach((sector) => {
          if (!sectorImpacts[sector.name]) {
            sectorImpacts[sector.name] = { totalScore: 0, count: 0, direction: 'neutral', events: [] };
          }
          const si = sectorImpacts[sector.name];
          const sign = sector.impact === 'positive' ? 1 : sector.impact === 'negative' ? -1 : 0;
          si.totalScore += (sector.score || 50) * sign;
          si.count += 1;
          si.direction = si.totalScore > 10 ? 'positive' : si.totalScore < -10 ? 'negative' : 'mixed';
          si.events.push(evt.id);
        });
      }
    });

    const marketMood = generateMarketMood(filtered);

    return { 
      filteredEvents: filtered, 
      sectorImpacts, 
      marketMood,
      activeEventsCount: filtered.length
    };
  }, [events, filters]);
}
