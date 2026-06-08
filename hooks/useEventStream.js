'use client';

import { useEffect, useRef, useCallback } from 'react';
import useStore from '@/stores/useStore';

/**
 * Custom hook that manages the real-time event stream
 * Generates simulated events and manages event lifecycle
 */
export default function useEventStream() {
  const addEvent = useStore((s) => s.addEvent);
  const removeExpiredEvents = useStore((s) => s.removeExpiredEvents);
  const setMarketMood = useStore((s) => s.setMarketMood);
  const events = useStore((s) => s.events);
  const generatorRef = useRef(null);
  const cleanupRef = useRef(null);
  const initializedRef = useRef(false);

  const fetchAndAddNews = useCallback(async () => {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) return;
      const data = await response.json();
      if (!data.articles) return;

      const { generateEventFromRealNews } = await import('@/lib/engine/eventGenerator');
      const currentEvents = useStore.getState().events;
      const existingIds = new Set(currentEvents.map(e => e.id));

      let newEventsAdded = false;

      // Process articles in reverse so the newest ones are added last (at the top of the feed)
      for (const article of [...data.articles].reverse()) {
        const id = article.guid || article.link;
        if (!existingIds.has(id)) {
          const event = generateEventFromRealNews(article);
          addEvent(event);
          existingIds.add(id);
          newEventsAdded = true;
          // Slight delay to make them appear sequentially if multiple
          await new Promise(r => setTimeout(r, 400));
        }
      }

    } catch (err) {
      console.error('News fetch error:', err);
    }
  }, [addEvent]);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Initial fetch
    fetchAndAddNews();

    // Poll every 30 seconds for breaking news
    generatorRef.current = setInterval(() => {
      fetchAndAddNews();
    }, 30000);

    // Cleanup expired events every 60 seconds
    cleanupRef.current = setInterval(() => {
      removeExpiredEvents();
    }, 60000);

    return () => {
      if (generatorRef.current) clearInterval(generatorRef.current);
      if (cleanupRef.current) clearInterval(cleanupRef.current);
      initializedRef.current = false;
    };
  }, [fetchAndAddNews, removeExpiredEvents]);
}
