'use client';

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import DetailPanel from '@/components/layout/DetailPanel';
import useEventStream from '@/hooks/useEventStream';
import useStore from '@/stores/useStore';

export default function DashboardLayout({ children }) {
  // Initialize the real-time event stream
  useEventStream();

  const showDetail = useStore((s) => s.showDetail);
  const selectedEvent = useStore((s) => s.selectedEvent);
  const isMobileMenuOpen = useStore((s) => s.isMobileMenuOpen);
  const toggleMobileMenu = useStore((s) => s.toggleMobileMenu);

  return (
    <div className="dashboard-shell">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <div className={`dashboard-body ${!showDetail || !selectedEvent ? 'detail-closed' : ''}`}>
        
        {/* Mobile Backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-only"
            onClick={() => toggleMobileMenu()}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', 
              backdropFilter: 'blur(4px)', zIndex: 150
            }} 
          />
        )}

        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Content */}
        <main className="dashboard-main">
          {children}
        </main>

        {/* Right Detail Panel */}
        {showDetail && selectedEvent && (
          <DetailPanel />
        )}
      </div>
    </div>
  );
}
