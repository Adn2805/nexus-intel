'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Zap, Brain, Shield, Globe, TrendingUp, BarChart3,
  Activity, Layers, ArrowRight, Sparkles, Eye, Lock,
  Radio, ChevronRight
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  })
};

const features = [
  {
    icon: <Globe size={24} />,
    title: 'Real-Time Global Monitoring',
    description: 'Continuously scans worldwide news, events, and developments from multiple sources to provide instant market awareness.',
    color: 'var(--accent)',
    bg: 'var(--accent-dim)',
  },
  {
    icon: <Brain size={24} />,
    title: 'AI-Powered Impact Analysis',
    description: 'Advanced NLP engine understands events, extracts entities, and maps potential impact to specific stocks and sectors.',
    color: 'var(--accent-secondary)',
    bg: 'var(--accent-secondary-dim)',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Explainable Intelligence',
    description: 'Every AI decision includes detailed reasoning — understand WHY a stock or sector may be impacted, not just that it is.',
    color: 'var(--positive)',
    bg: 'var(--positive-dim)',
  },
  {
    icon: <Activity size={24} />,
    title: 'Impact Scoring Engine',
    description: 'Multi-factor scoring system evaluates relevance, credibility, recency, and sentiment to produce confidence-weighted scores.',
    color: 'var(--mixed)',
    bg: 'var(--mixed-dim)',
  },
  {
    icon: <Layers size={24} />,
    title: 'Sector Chain Reactions',
    description: 'Traces impact cascades across interconnected sectors and supply chains — from raw materials to end consumers.',
    color: 'var(--accent-cyan)',
    bg: 'var(--accent-cyan-dim)',
  },
  {
    icon: <Shield size={24} />,
    title: 'Not Financial Advice',
    description: 'Purely an intelligence and awareness tool. No buy/sell recommendations, no predictions — only informed analysis.',
    color: 'var(--text-secondary)',
    bg: 'rgba(255,255,255,0.04)',
  },
];

const impactExamples = [
  {
    event: 'Middle East Oil Supply Disruptions',
    impacts: [
      { sector: 'Energy', direction: 'positive', icon: '⚡' },
      { sector: 'Airlines', direction: 'negative', icon: '✈️' },
      { sector: 'Logistics', direction: 'negative', icon: '🚚' },
    ]
  },
  {
    event: 'Global AI Infrastructure Demand Surges',
    impacts: [
      { sector: 'Semiconductors', direction: 'positive', icon: '🔬' },
      { sector: 'Cloud Computing', direction: 'positive', icon: '☁️' },
      { sector: 'GPU Manufacturers', direction: 'positive', icon: '💻' },
    ]
  },
  {
    event: 'Federal Reserve Signals Rate Cuts',
    impacts: [
      { sector: 'Banking', direction: 'mixed', icon: '🏦' },
      { sector: 'Real Estate', direction: 'positive', icon: '🏠' },
      { sector: 'Technology', direction: 'positive', icon: '💻' },
    ]
  },
];

function ImpactDemo() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--space-16) var(--space-8)' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
      >
        <motion.h2
          variants={fadeInUp}
          custom={0}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 700,
            marginBottom: 'var(--space-4)',
            letterSpacing: '-0.02em',
          }}
        >
          See Impact Intelligence in Action
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          custom={1}
          style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', maxWidth: 600, margin: '0 auto' }}
        >
          When events happen worldwide, NexusIntel instantly maps which markets may be affected — and explains why.
        </motion.p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {impactExamples.map((example, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="glass-card"
            style={{ padding: 'var(--space-6)', overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <Radio size={16} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Event Detected</span>
            </div>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
              {example.event}
            </h3>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              {example.impacts.map((impact, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: impact.direction === 'positive' ? 'var(--positive-dim)' : impact.direction === 'negative' ? 'var(--negative-dim)' : 'var(--mixed-dim)',
                    border: `1px solid ${impact.direction === 'positive' ? 'rgba(0,227,158,0.2)' : impact.direction === 'negative' ? 'rgba(255,71,87,0.2)' : 'rgba(255,165,2,0.2)'}`,
                  }}
                >
                  <span>{impact.icon}</span>
                  <span style={{ fontWeight: 500, fontSize: 'var(--text-base)' }}>{impact.sector}</span>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: impact.direction === 'positive' ? 'var(--positive)' : impact.direction === 'negative' ? 'var(--negative)' : 'var(--mixed)',
                  }}>
                    {impact.direction === 'positive' ? '↑ Positive' : impact.direction === 'negative' ? '↓ Negative' : '↕ Mixed'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main>
      {/* ====== HERO SECTION ====== */}
      <section className="landing-hero">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Badge */}
          <motion.div
            className="landing-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Sparkles size={14} />
            <span>AI-Powered Intelligence Platform</span>
          </motion.div>

          {/* Title */}
          <h1 className="landing-hero-title">
            <span style={{ display: 'block' }}>Real-Time Market</span>
            <span className="gradient-text" style={{ display: 'block' }}>Impact Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="landing-hero-subtitle">
            Continuously monitors global events and maps their potential impact on stocks, sectors, and markets
            — powered by AI with explainable reasoning.
          </p>

          {/* CTA Buttons */}
          <motion.div
            style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link href="/dashboard" className="btn btn-primary btn-lg">
              <Zap size={18} />
              Launch Dashboard
              <ArrowRight size={16} />
            </Link>
            <a href="#features" className="btn btn-secondary btn-lg">
              <Eye size={18} />
              See How It Works
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-2)',
            color: 'var(--text-muted)',
            fontSize: 'var(--text-xs)',
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronRight size={16} style={{ transform: 'rotate(90deg)' }} />
        </motion.div>
      </section>

      {/* ====== IMPACT DEMO SECTION ====== */}
      <ImpactDemo />

      {/* ====== FEATURES SECTION ====== */}
      <section id="features" className="landing-features">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="glass-card feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div
              className="feature-card-icon"
              style={{ background: feature.bg, color: feature.color }}
            >
              {feature.icon}
            </div>
            <h3 className="feature-card-title">{feature.title}</h3>
            <p className="feature-card-description">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* ====== ARCHITECTURE SECTION ====== */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-8)',
          textAlign: 'center'
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          marginBottom: 'var(--space-4)',
          letterSpacing: '-0.02em',
        }}>
          System Architecture
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-base)' }}>
          End-to-end event-driven pipeline from news ingestion to impact visualization
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center' }}>
          {[
            { label: 'News Sources', desc: 'GDELT • Reuters • SEC • Global feeds', icon: <Globe size={18} /> },
            { label: 'Ingestion Engine', desc: 'Real-time collection & deduplication', icon: <Radio size={18} /> },
            { label: 'NLP Processing', desc: 'Entity extraction & sentiment analysis', icon: <Brain size={18} /> },
            { label: 'Impact Mapping', desc: 'AI-powered sector & stock mapping', icon: <Layers size={18} /> },
            { label: 'Scoring Engine', desc: 'Multi-factor confidence-weighted scoring', icon: <BarChart3 size={18} /> },
            { label: 'Live Dashboard', desc: 'Real-time visualization & alerts', icon: <Activity size={18} /> },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ width: '100%', maxWidth: 500 }}
            >
              <div className="glass-card" style={{
                padding: 'var(--space-4) var(--space-6)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
              }}>
                <div style={{
                  width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-dim)',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}>
                  {step.icon}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-base)' }}>{step.label}</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{step.desc}</div>
                </div>
              </div>
              {i < 5 && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                  <ChevronRight size={14} style={{ transform: 'rotate(90deg)', color: 'var(--text-muted)' }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ====== CTA SECTION ====== */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          maxWidth: 700,
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-8)',
          textAlign: 'center',
        }}
      >
        <div className="glass-card" style={{
          padding: 'var(--space-12) var(--space-8)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Glow effect */}
          <div style={{
            position: 'absolute',
            top: -100, left: '50%', transform: 'translateX(-50%)',
            width: 400, height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <Zap size={32} style={{ color: 'var(--accent)', marginBottom: 'var(--space-4)' }} />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            marginBottom: 'var(--space-3)',
          }}>
            Ready to See the Market Through AI Eyes?
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-base)',
            marginBottom: 'var(--space-8)',
            maxWidth: 500,
            margin: '0 auto var(--space-8)',
          }}>
            Experience real-time impact intelligence with explainable AI reasoning. No sign-up required.
          </p>
          <Link href="/dashboard" className="btn btn-primary btn-lg">
            <Zap size={18} />
            Launch Intelligence Dashboard
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.section>

      {/* ====== FOOTER ====== */}
      <footer style={{
        padding: 'var(--space-8)',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <div className="disclaimer" style={{ maxWidth: 700, margin: '0 auto var(--space-6)' }}>
          <strong>⚠️ Disclaimer:</strong> NexusIntel is an AI-powered market impact intelligence and awareness tool.
          It does NOT provide financial advice, buy/sell recommendations, or guaranteed predictions.
          All analysis is AI-generated for informational and educational purposes only.
          Always consult qualified financial advisors before making investment decisions.
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-2)',
          color: 'var(--text-muted)',
          fontSize: 'var(--text-xs)',
        }}>
          <Lock size={12} />
          <span>NexusIntel © {new Date().getFullYear()} — AI Market Impact Intelligence Platform</span>
        </div>
      </footer>
    </main>
  );
}
