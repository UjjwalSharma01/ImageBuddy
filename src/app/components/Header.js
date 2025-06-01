'use client';

import { useState } from 'react';
import AboutModal from './AboutModal';

export default function Header() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <header className="relative flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2d3134] px-4 lg:px-10 py-4 bg-gradient-to-r from-[#131516] to-[#1a1d20] backdrop-blur-sm">
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#b7cfe0]/5 via-transparent to-[#b7cfe0]/5 pointer-events-none"></div>
      
      <div className="flex items-center gap-4 text-white relative z-10">
        {/* Premium Logo */}
        <div className="relative">
          <div className="size-10 p-2 bg-gradient-to-br from-[#b7cfe0] to-[#8bb3d9] rounded-xl shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#131516]">
              <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9H15V15H9V9Z" fill="currentColor"/>
              <path d="M4 4L9 9M20 4L15 9M20 20L15 15M4 20L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#b7cfe0]/20 to-[#8bb3d9]/20 rounded-xl blur opacity-75"></div>
        </div>
        
        {/* Brand Name */}
        <div className="flex flex-col">
          <h1 className="text-white text-xl lg:text-2xl font-bold leading-tight tracking-[-0.02em] font-[family-name:var(--font-poppins)]">
            ImageBuddy
          </h1>
          <span className="text-[#b7cfe0] text-xs font-medium tracking-wide">PREMIUM EDITOR</span>
        </div>
      </div>
      
      <div className="flex flex-1 justify-end gap-4 lg:gap-8 relative z-10">
        <div className="flex items-center gap-4 lg:gap-6">
          <button 
            className="hidden sm:flex items-center gap-2 text-[#a4acb2] hover:text-[#b7cfe0] text-sm font-medium leading-normal transition-colors group"
            onClick={() => setShowAbout(true)}
          >
            <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            About
          </button>
          <a className="flex items-center gap-2 text-[#a4acb2] hover:text-[#b7cfe0] text-sm font-medium leading-normal transition-colors group" href="#">
            <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <button 
            className="hidden lg:flex items-center gap-2 text-[#a4acb2] hover:text-[#b7cfe0] text-sm font-medium leading-normal transition-colors group"
            onClick={() => setShowAbout(true)}
          >
            <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Help
          </button>
        </div>
      </div>
    </header>

    {/* About Modal */}
    <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
}
