'use client';

import { create } from 'zustand';

/**
 * NexusIntel Global State Store
 * Manages all application state including events, filters, and UI state
 */
const useStore = create((set, get) => ({
  // ---- Event Data ----
  events: [],
  selectedEvent: null,
  eventHistory: [],

  // ---- Sector Impacts ----
  sectorImpacts: {},

  // ---- Market Mood ----
  marketMood: {
    score: 50,
    label: 'NEUTRAL',
    description: 'Market conditions are balanced with no dominant sentiment trend.',
  },

  // ---- Filters ----
  filters: {
    sectors: [],
    impacts: [],       // 'positive', 'negative', 'mixed'
    categories: [],    // 'geopolitical', 'economic', etc.
    search: '',
  },

  // ---- UI State ----
  showAIAssistant: false,
  showDetail: false,
  isMobileMenuOpen: false,
  theme: 'dark',

  // ---- Stats ----
  stats: {
    totalEvents: 0,
    activeEvents: 0,
    positiveImpacts: 0,
    negativeImpacts: 0,
  },

  // ---- Actions ----

  /**
   * Add a new event to the feed
   */
  addEvent: (event) => set((state) => {
    const newEvents = [event, ...state.events].slice(0, 100); // Keep max 100 events
    const newHistory = [...state.eventHistory, { timestamp: Date.now(), eventId: event.id }].slice(-500);

    // Recalculate sector impacts
    const sectorImpacts = {};
    newEvents.forEach((evt) => {
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

    // Recalculate stats
    let positiveImpacts = 0;
    let negativeImpacts = 0;
    newEvents.forEach((evt) => {
      if (evt.sentiment && evt.sentiment.score > 0.1) positiveImpacts++;
      if (evt.sentiment && evt.sentiment.score < -0.1) negativeImpacts++;
    });

    return {
      events: newEvents,
      eventHistory: newHistory,
      sectorImpacts,
      stats: {
        totalEvents: state.stats.totalEvents + 1,
        activeEvents: newEvents.length,
        positiveImpacts,
        negativeImpacts,
      },
    };
  }),

  /**
   * Remove expired events
   */
  removeExpiredEvents: () => set((state) => {
    const now = Date.now();
    const activeEvents = state.events.filter((e) => !e.expiresAt || e.expiresAt > now);
    return { events: activeEvents };
  }),

  /**
   * Select an event to show in detail panel
   */
  selectEvent: (event) => set({
    selectedEvent: event,
    showDetail: true,
  }),

  /**
   * Clear selected event
   */
  clearSelectedEvent: () => set({
    selectedEvent: null,
    showDetail: false,
  }),

  /**
   * Update filter values
   */
  setFilter: (filterKey, value) => set((state) => ({
    filters: { ...state.filters, [filterKey]: value },
  })),

  /**
   * Toggle a sector filter on/off
   */
  toggleSectorFilter: (sector) => set((state) => {
    const sectors = state.filters.sectors.includes(sector)
      ? state.filters.sectors.filter((s) => s !== sector)
      : [...state.filters.sectors, sector];
    return { filters: { ...state.filters, sectors } };
  }),

  /**
   * Toggle an impact filter on/off
   */
  toggleImpactFilter: (impact) => set((state) => {
    const impacts = state.filters.impacts.includes(impact)
      ? state.filters.impacts.filter((i) => i !== impact)
      : [...state.filters.impacts, impact];
    return { filters: { ...state.filters, impacts } };
  }),

  /**
   * Toggle a category filter on/off
   */
  toggleCategoryFilter: (category) => set((state) => {
    const categories = state.filters.categories.includes(category)
      ? state.filters.categories.filter((c) => c !== category)
      : [...state.filters.categories, category];
    return { filters: { ...state.filters, categories } };
  }),

  /**
   * Toggle AI assistant visibility
   */
  toggleAIAssistant: () => set((state) => ({
    showAIAssistant: !state.showAIAssistant,
  })),

  /**
   * Toggle detail panel visibility
   */
  toggleDetail: () => set((state) => ({
    showDetail: !state.showDetail,
  })),

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu: () => set((state) => ({
    isMobileMenuOpen: !state.isMobileMenuOpen,
  })),

  /**
   * Update market mood
   */
  setMarketMood: (mood) => set({ marketMood: mood }),

  /**
   * Clear all filters
   */
  clearFilters: () => set({
    filters: { sectors: [], impacts: [], categories: [], search: '' },
  }),

  /**
   * Get filtered events
   */
  getFilteredEvents: () => {
    const state = get();
    let filtered = [...state.events];
    const { sectors, impacts, categories, search } = state.filters;

    if (sectors.length > 0) {
      filtered = filtered.filter((e) =>
        e.affectedSectors?.some((s) => sectors.includes(s.name))
      );
    }

    if (impacts.length > 0) {
      filtered = filtered.filter((e) =>
        e.affectedSectors?.some((s) => impacts.includes(s.impact))
      );
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

    return filtered;
  },
}));

export default useStore;
