'use client';

import NewsFeed from '@/components/news/NewsFeed';
import HeatMap from '@/components/impact/HeatMap';
import MoodGauge from '@/components/charts/MoodGauge';
import ImpactTimeline from '@/components/charts/ImpactTimeline';
import MarketPulse from '@/components/charts/MarketPulse';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <>
      {/* Top Stats Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-4)',
      }}>
        {/* Market Mood Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card"
          style={{ padding: 'var(--space-5)' }}
        >
          <MoodGauge />
        </motion.div>

        {/* Impact Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card span-2-desktop"
          style={{ padding: 'var(--space-5)' }}
        >
          <HeatMap />
        </motion.div>
      </div>

      {/* Market Pulse Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <MarketPulse />
      </motion.div>

      {/* Impact Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card"
        style={{ padding: 'var(--space-5)' }}
      >
        <ImpactTimeline />
      </motion.div>

      {/* Live News Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <NewsFeed />
      </motion.div>

      {/* Disclaimer */}
      <div className="disclaimer">
        <strong>⚠️ Disclaimer:</strong> NexusIntel is an AI-powered market impact intelligence and awareness tool.
        It does NOT provide financial advice, buy/sell recommendations, or guaranteed predictions.
        All analysis is for informational and educational purposes only.
      </div>
    </>
  );
}
