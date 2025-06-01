'use client';

import { useState } from 'react';
import Header from './components/Header';
import ImageInput from './components/ImageInput';
import ImageControls from './components/ImageControls';
import ImagePreview from './components/ImagePreview';
import Footer from './components/Footer';
import MobileFloatingButton from './components/MobileFloatingButton';
import { ImageProvider } from './context/ImageContext';

export default function Home() {
  const [activeTab, setActiveTab] = useState('input');

  return (
    <ImageProvider>
      <div className="relative flex size-full min-h-screen flex-col bg-gradient-to-br from-[#0a0b0c] via-[#131516] to-[#1a1d20] overflow-x-hidden">
        {/* Premium background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #b7cfe0 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #8bb3d9 0%, transparent 50%)`,
            backgroundSize: '400px 400px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>
        
        <div className="relative z-10 layout-container flex h-full grow flex-col">
          <Header />
          <div className="gap-1 px-2 lg:px-6 flex flex-1 justify-center py-4 lg:py-6">
            {/* Desktop Layout - Two Panels Side by Side */}
            <div className="hidden lg:flex gap-6 w-full max-w-[1400px] bg-gradient-to-br from-[#1a1d20]/80 to-[#2d3134]/60 backdrop-blur-xl rounded-2xl p-6 min-h-[calc(100vh-140px)] border border-[#2d3134]/50 shadow-2xl">
              {/* Premium glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
              
              <div className="relative layout-content-container flex flex-col w-[400px] xl:w-[420px] 2xl:w-[480px] min-h-0 overflow-y-auto custom-scrollbar bg-gradient-to-b from-[#131516]/90 to-[#1a1d20]/90 backdrop-blur-sm rounded-xl flex-shrink-0 border border-[#2d3134]/30">
                <div className="flex-shrink-0">
                  <ImageInput />
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                  <ImageControls />
                </div>
              </div>
              
              {/* Premium divider */}
              <div className="w-px bg-gradient-to-b from-transparent via-[#b7cfe0]/30 to-transparent flex-shrink-0"></div>
              
              <div className="relative layout-content-container flex flex-col flex-1 min-w-0 min-h-0 bg-gradient-to-b from-[#131516]/90 to-[#1a1d20]/90 backdrop-blur-sm rounded-xl overflow-hidden border border-[#2d3134]/30">
                <ImagePreview />
              </div>
            </div>
            
            {/* Mobile Layout - Single Panel with Tabs */}
            <div className="flex lg:hidden flex-col w-full max-w-[600px]">
              {/* Mobile Tab Navigation */}
              <div className="flex bg-gradient-to-r from-[#2d3134] to-[#3a4144] rounded-xl p-1 mb-4 border border-[#2d3134]/50">
                <button
                  onClick={() => setActiveTab('input')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === 'input'
                      ? 'bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] text-[#131516] shadow-lg transform scale-105'
                      : 'text-white hover:bg-[#3a4144] hover:scale-105'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    Input
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === 'preview'
                      ? 'bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] text-[#131516] shadow-lg transform scale-105'
                      : 'text-white hover:bg-[#3a4144] hover:scale-105'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    Preview
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('controls')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === 'controls'
                      ? 'bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] text-[#131516] shadow-lg transform scale-105'
                      : 'text-white hover:bg-[#3a4144] hover:scale-105'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
                    </svg>
                    Controls
                  </span>
                </button>
              </div>

              {/* Mobile Tab Content */}
              <div className="layout-content-container flex flex-col bg-gradient-to-b from-[#1a1d20]/80 to-[#2d3134]/60 backdrop-blur-xl rounded-2xl p-4 border border-[#2d3134]/50">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
                <div className="relative z-10">
                  {activeTab === 'input' && <ImageInput />}
                  {activeTab === 'preview' && <ImagePreview />}
                  {activeTab === 'controls' && <ImageControls />}
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <MobileFloatingButton activeTab={activeTab} />
        </div>
      </div>
    </ImageProvider>
  );
}
