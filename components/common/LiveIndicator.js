'use client';
export default function LiveIndicator({ label = 'LIVE', variant = 'live' }) {
  const getColors = () => {
    switch (variant) {
      case 'breaking': return { color: 'var(--negative)', bg: 'var(--negative-dim)' };
      case 'updating': return { color: 'var(--accent)', bg: 'var(--accent-dim)' };
      case 'live':
      default: return { color: 'var(--positive)', bg: 'var(--positive-dim)' };
    }
  };
  
  const { color, bg } = getColors();

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: -3, left: -3, right: -3, bottom: -3,
          borderRadius: '50%',
          backgroundColor: color,
          opacity: 0.4,
          animation: 'pulseGlow 2s ease-in-out infinite'
        }} />
      </div>
      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color, letterSpacing: '0.05em' }}>{label}</span>
    </div>
  );
}
