'use client';

import { useState } from 'react';

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: '+/=', description: 'Zoom in' },
    { key: '-', description: 'Zoom out' },
    { key: '0', description: 'Fit to screen' },
    { key: '1', description: '100% zoom' },
    { key: 'Ctrl + Scroll', description: 'Zoom with mouse wheel' },
  ];

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#2d3134] to-[#1a1d20] text-white hover:from-[#3a4144] hover:to-[#2d3134] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-white/10 backdrop-blur-sm"
        title="Keyboard Shortcuts"
      >
        <svg className="w-4 h-4 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          {/* Premium backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Premium shortcuts panel */}
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-gradient-to-br from-[#2d3134]/95 via-[#323943]/95 to-[#1a1d20]/95 rounded-xl shadow-2xl border border-white/20 p-4 z-50 backdrop-blur-md">
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-xl pointer-events-none"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white text-sm font-bold font-[family-name:var(--font-poppins)] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#b7cfe0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                  Keyboard Shortcuts
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#a4acb2] hover:text-white text-lg font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2.5">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex justify-between items-center group/item hover:bg-white/5 rounded-lg p-2 transition-all duration-200">
                    <span className="text-[#a4acb2] text-xs group-hover/item:text-white transition-colors duration-200">{shortcut.description}</span>
                    <span className="text-white text-xs font-mono bg-gradient-to-r from-[#131516] to-[#1a1d20] px-2.5 py-1.5 rounded-md border border-white/10 shadow-sm">
                      {shortcut.key}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Premium tip */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs text-[#8bb3d9] text-center">
                  <span className="inline-block w-2 h-2 bg-[#b7cfe0] rounded-full mr-2 animate-pulse"></span>
                  Pro tip: Use these shortcuts for faster editing
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
