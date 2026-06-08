'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import useStore from '@/stores/useStore';

export default function AIAssistant() {
  const showAIAssistant = useStore(s => s.showAIAssistant);
  const toggleAIAssistant = useStore(s => s.toggleAIAssistant);
  const events = useStore(s => s.events);
  const marketMood = useStore(s => s.marketMood);
  
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello. I am NexusIntel AI. I monitor global events and analyze market impacts in real-time. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showAIAssistant]);

  const quickQueries = [
    "Why is the Tech sector impacted?",
    "Show geopolitical events",
    "Market mood summary",
    "Most affected stocks today"
  ];

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('tech') || q.includes('technology')) {
      return `The Technology sector is currently seeing significant impact driven by AI infrastructure demand and recent hardware breakthroughs. Companies like NVDA and MSFT are experiencing positive momentum, while legacy IT services face mixed pressures due to rapid transition costs.`;
    }
    if (q.includes('mood') || q.includes('sentiment')) {
      return `The current market mood is ${marketMood.label} (Score: ${marketMood.score}/100). ${marketMood.description} We're seeing ${events.filter(e => e.sentiment?.score > 0).length} positive events vs ${events.filter(e => e.sentiment?.score < 0).length} negative events in the active feed.`;
    }
    if (q.includes('geopolitical') || q.includes('war') || q.includes('conflict')) {
      const geoEvents = events.filter(e => e.category === 'Geopolitical');
      if (geoEvents.length > 0) {
        return `I'm tracking ${geoEvents.length} active geopolitical events. The most critical is "${geoEvents[0].headline}", which is primarily impacting the Energy and Defense sectors with high severity.`;
      }
      return `Currently, there are no major geopolitical events dominating the real-time feed. Market drivers are primarily focused on other sectors.`;
    }
    if (q.includes('stock') || q.includes('affected')) {
      return `Based on real-time analysis, the most highly impacted stocks right now are those in the crosshairs of recent supply chain disruptions and technological shifts. Semiconductors (NVDA, AMD) are showing strong positive momentum, while traditional energy (XOM, CVX) is seeing volatility due to geopolitical tensions.`;
    }
    
    return `Based on my real-time analysis of ${events.length} active global events, the market is currently navigating mixed signals. The primary drivers are technological advancements and macroeconomic policy shifts. Would you like me to analyze a specific sector or ticker?`;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', content: generateAIResponse(userMsg) }]);
    }, 1000 + Math.random() * 1000); // 1-2s delay
  };

  const handleQuickQuery = (query) => {
    setInput(query);
    // Let state update before submitting
    setTimeout(() => handleSubmit({ preventDefault: () => {} }), 50);
  };

  return (
    <AnimatePresence>
      {showAIAssistant && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mesh-bg"
            style={{ zIndex: 90, opacity: 0.5, backdropFilter: 'blur(4px)' }}
            onClick={toggleAIAssistant}
          />
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="glass-panel"
            style={{
              position: 'fixed', right: 0, top: 0, bottom: 0, width: 400,
              zIndex: 100, display: 'flex', flexDirection: 'column',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.5)',
              borderLeft: '1px solid var(--border)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>NexusIntel AI</h3>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--positive)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--positive)' }} /> Online
                  </div>
                </div>
              </div>
              <button onClick={toggleAIAssistant} style={{ padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                <X size={18} />
              </button>
            </div>

            <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  {msg.role === 'ai' && (
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bot size={14} color="var(--accent-cyan)" />
                    </div>
                  )}
                  <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'} style={{ padding: '10px 14px', borderRadius: 'var(--radius-lg)', borderBottomRightRadius: msg.role === 'user' ? 4 : 'var(--radius-lg)', borderBottomLeftRadius: msg.role === 'ai' ? 4 : 'var(--radius-lg)', background: msg.role === 'user' ? 'var(--accent)' : 'rgba(255,255,255,0.05)', border: msg.role === 'ai' ? '1px solid var(--border)' : 'none', color: 'white', fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignSelf: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={14} color="var(--accent-cyan)" />
                  </div>
                  <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-lg)', borderBottomLeftRadius: 4, background: 'rgba(255,255,255,0.05)', display: 'flex', gap: 4, alignItems: 'center' }}>
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-secondary)' }} />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-secondary)' }} />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-secondary)' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: '0 var(--space-4) var(--space-3)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
                {quickQueries.map((q, i) => (
                  <button key={i} onClick={() => handleQuickQuery(q)} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {q}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask NexusIntel..."
                  style={{ flex: 1, padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'white', fontSize: 'var(--text-sm)', outline: 'none' }}
                />
                <button type="submit" disabled={!input.trim()} style={{ padding: '0 16px', background: input.trim() ? 'var(--accent)' : 'rgba(255,255,255,0.05)', color: input.trim() ? 'white' : 'var(--text-muted)', borderRadius: 'var(--radius-md)', transition: 'all 0.2s' }}>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
