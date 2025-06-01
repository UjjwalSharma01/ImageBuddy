'use client';

import { useState } from 'react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Premium backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal container */}
        <div 
          className="bg-gradient-to-br from-[#2d3134]/95 via-[#323943]/95 to-[#1a1d20]/95 rounded-2xl shadow-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-2xl pointer-events-none"></div>
          
          <div className="relative p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#b7cfe0] to-[#8bb3d9] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-[#131516]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)]">ImageBuddy</h2>
                  <p className="text-sm text-[#8bb3d9]">Premium Image Editor v1.0.0</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-[#a4acb2] hover:text-white transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* About Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 font-[family-name:var(--font-poppins)]">About ImageBuddy</h3>
                <p className="text-[#a4acb2] leading-relaxed">
                  ImageBuddy is a premium, browser-based image editor that processes your images entirely on your device. 
                  No uploads, no privacy concerns - just powerful editing tools at your fingertips.
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 font-[family-name:var(--font-poppins)]">Premium Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { icon: '🎨', title: 'Smart Editing', desc: 'Advanced color adjustments and filters' },
                    { icon: '✂️', title: 'Precision Crop', desc: 'Pixel-perfect cropping tools' },
                    { icon: '📏', title: 'Smart Resize', desc: 'Intelligent scaling with aspect ratio control' },
                    { icon: '🗜️', title: 'AI Compression', desc: 'Optimal file size without quality loss' },
                    { icon: '🔒', title: 'Privacy First', desc: 'All processing happens on your device' },
                    { icon: '⚡', title: 'Real-time Preview', desc: 'Instant feedback on all adjustments' },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-xl">{feature.icon}</span>
                      <div>
                        <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                        <p className="text-xs text-[#a4acb2] mt-1">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keyboard Shortcuts */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 font-[family-name:var(--font-poppins)]">Keyboard Shortcuts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    { key: '+/=', desc: 'Zoom in' },
                    { key: '-', desc: 'Zoom out' },
                    { key: '0', desc: 'Fit to screen' },
                    { key: '1', desc: '100% zoom' },
                    { key: 'Ctrl + Scroll', desc: 'Zoom with mouse' },
                    { key: 'Ctrl + Z', desc: 'Undo last action' },
                  ].map((shortcut, index) => (
                    <div key={index} className="flex justify-between items-center p-2 rounded bg-black/20">
                      <span className="text-[#a4acb2] text-sm">{shortcut.desc}</span>
                      <span className="text-white text-sm font-mono bg-[#131516] px-2 py-1 rounded border border-white/10">
                        {shortcut.key}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#8bb3d9]">
                    Made with ❤️ for creative professionals
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-xs text-[#a4acb2]">All systems operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
