'use client';
import { useState, useEffect } from 'react';
import { BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import useStore from '@/stores/useStore';
import useDashboardData from '@/hooks/useDashboardData';

export default function ImpactTimeline() {
  const [data, setData] = useState([]);
  const events = useStore(s => s.events);
  const { filteredEvents } = useDashboardData();

  useEffect(() => {
    // Generate mock historical data that accurately scales with current filters
    const filterRatio = events.length > 0 ? filteredEvents.length / events.length : 1;
    
    const mockData = [];
    let positive = 20;
    let negative = 15;
    
    for (let i = 24; i >= 0; i--) {
      // Add random walk
      positive = Math.max(0, positive + (Math.random() * 20 - 8));
      negative = Math.max(0, negative + (Math.random() * 20 - 8));
      
      const date = new Date();
      date.setHours(date.getHours() - i);
      
      mockData.push({
        time: i === 0 ? 'Now' : `${i}h`,
        // Scale the historical data down based on how restrictive the current filter is
        positive: Math.round(positive * filterRatio),
        negative: Math.round(negative * filterRatio),
        timestamp: date.getTime()
      });
    }
    
    // Add real recent filtered events to the last data point (Now)
    const recentPositive = filteredEvents.filter(e => e.sentiment?.score > 0).reduce((sum, e) => sum + e.impactScore, 0) / 10;
    const recentNegative = filteredEvents.filter(e => e.sentiment?.score < 0).reduce((sum, e) => sum + e.impactScore, 0) / 10;
    
    if (mockData.length > 0) {
      mockData[mockData.length - 1].positive += Math.round(recentPositive);
      mockData[mockData.length - 1].negative += Math.round(recentNegative);
    }
    
    setData(mockData);
  }, [events.length, filteredEvents]); // Update when new events arrive or filters change

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="section-header">
        <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <BarChart2 size={14} /> IMPACT TIMELINE — LAST 24H
        </h3>
      </div>
      
      <div style={{ flex: 1, minHeight: 200, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--positive)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--positive)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--negative)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--negative)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
              itemStyle={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}
              labelStyle={{ color: 'var(--text-secondary)', marginBottom: 4, fontSize: 'var(--text-xs)' }}
            />
            <Area type="monotone" dataKey="positive" name="Positive Impact" stroke="var(--positive)" strokeWidth={2} fillOpacity={1} fill="url(#colorPositive)" />
            <Area type="monotone" dataKey="negative" name="Negative Impact" stroke="var(--negative)" strokeWidth={2} fillOpacity={1} fill="url(#colorNegative)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
