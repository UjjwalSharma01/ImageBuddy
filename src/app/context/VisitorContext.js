'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const VisitorContext = createContext();

export function VisitorProvider({ children }) {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    todayVisitors: 0,
    onlineNow: 0,
    photosEdited: 0,
    countries: 0,
    isLoading: true
  });

  const [isTracking, setIsTracking] = useState(false);

  // Fetch visitor stats
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/visitor-stats', {
        method: 'GET',
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(prev => ({
          ...data,
          isLoading: false
        }));
      }
    } catch (error) {
      console.error('Error fetching visitor stats:', error);
      setStats(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Track photo edit action
  const trackPhotoEdit = useCallback(async () => {
    try {
      const response = await fetch('/api/visitor-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'photo_edited' })
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(prev => ({
          ...prev,
          photosEdited: data.photosEdited
        }));
      }
    } catch (error) {
      console.error('Error tracking photo edit:', error);
    }
  }, []);

  // Initialize tracking
  useEffect(() => {
    if (!isTracking) {
      setIsTracking(true);
      fetchStats();
    }
  }, [fetchStats, isTracking]);

  // Update stats every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  // Keep online status active
  useEffect(() => {
    const heartbeat = setInterval(() => {
      if (!document.hidden) {
        fetchStats();
      }
    }, 60000); // Update every minute when page is visible

    return () => clearInterval(heartbeat);
  }, [fetchStats]);

  // Handle page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchStats();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [fetchStats]);

  const value = {
    stats,
    trackPhotoEdit,
    refreshStats: fetchStats
  };

  return (
    <VisitorContext.Provider value={value}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitorStats() {
  const context = useContext(VisitorContext);
  if (!context) {
    throw new Error('useVisitorStats must be used within a VisitorProvider');
  }
  return context;
}
