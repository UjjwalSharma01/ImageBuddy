'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to landing page by default
    router.push('/landing');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0c] via-[#131516] to-[#1a1d20] flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#b7cfe0] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading ImageBuddy...</p>
      </div>
    </div>
  );
}
