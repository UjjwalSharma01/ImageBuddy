import { NextResponse } from 'next/server';

// In a production environment, you would use a database like MongoDB, PostgreSQL, or Redis
// For this demo, we'll use a simple in-memory storage that persists across requests
// Note: In production, replace this with a proper database

let visitorStats = {
  totalVisitors: 1247, // Starting with a reasonable base number
  todayVisitors: 23,
  onlineNow: 1,
  photosEdited: 3456,
  countries: 67,
  lastReset: new Date().toDateString(),
  visitors: new Set(), // Track unique visitors by IP + User-Agent hash
  onlineUsers: new Map(), // Track currently online users
};

// Simple hash function for visitor identification
function hashVisitor(ip, userAgent) {
  let hash = 0;
  const str = ip + userAgent;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// Clean up old online users (older than 5 minutes)
function cleanupOnlineUsers() {
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  for (const [hash, timestamp] of visitorStats.onlineUsers.entries()) {
    if (timestamp < fiveMinutesAgo) {
      visitorStats.onlineUsers.delete(hash);
    }
  }
}

// Reset daily stats if it's a new day
function checkDailyReset() {
  const today = new Date().toDateString();
  if (visitorStats.lastReset !== today) {
    visitorStats.todayVisitors = 0;
    visitorStats.lastReset = today;
  }
}

export async function GET(request) {
  try {
    // Get visitor info
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.ip || 'unknown';
    const userAgent = request.headers.get("user-agent") || 'unknown';
    
    checkDailyReset();
    cleanupOnlineUsers();
    
    const visitorHash = hashVisitor(ip, userAgent);
    const now = Date.now();
    
    // Track new visitor
    if (!visitorStats.visitors.has(visitorHash)) {
      visitorStats.visitors.add(visitorHash);
      visitorStats.totalVisitors++;
      visitorStats.todayVisitors++;
    }
    
    // Update online status
    visitorStats.onlineUsers.set(visitorHash, now);
    visitorStats.onlineNow = visitorStats.onlineUsers.size;
    
    // Increment photos edited occasionally (simulate activity)
    if (Math.random() < 0.1) {
      visitorStats.photosEdited += Math.floor(Math.random() * 3) + 1;
    }
    
    return NextResponse.json({
      totalVisitors: visitorStats.totalVisitors,
      todayVisitors: visitorStats.todayVisitors,
      onlineNow: visitorStats.onlineNow,
      photosEdited: visitorStats.photosEdited,
      countries: visitorStats.countries,
      timestamp: now
    });
  } catch (error) {
    console.error('Error in visitor stats API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Handle photo edit tracking
    if (body.action === 'photo_edited') {
      visitorStats.photosEdited++;
      return NextResponse.json({ success: true, photosEdited: visitorStats.photosEdited });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in visitor stats POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
