'use client';

import { useImage } from '../context/ImageContext';
import { useToast } from './ToastProvider';

export default function MobileFloatingButton({ activeTab }) {
  const { state } = useImage();
  const { addToast } = useToast();
  const { processedImage } = state;

  const handleDownload = () => {
    if (!processedImage) {
      addToast('No image to download', 'warning');
      return;
    }

    try {
      const format = state.settings.format;
      const quality = state.settings.quality / 100;
      const fileName = state.fileName ? 
        state.fileName.replace(/\.[^/.]+$/, '') + '.' + format :
        'edited-image.' + format;
      
      processedImage.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          URL.revokeObjectURL(link.href);
          addToast('Image downloaded successfully!', 'success');
        } else {
          addToast('Failed to generate download', 'error');
        }
      }, `image/${format}`, quality);
    } catch (error) {
      console.error('Download error:', error);
      addToast('Failed to download image', 'error');
    }
  };

  // Only show the floating button on mobile when viewing preview and image is loaded
  if (activeTab !== 'preview' || !processedImage) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 lg:hidden z-50">
      {/* Premium floating button with enhanced styling */}
      <div className="relative">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] rounded-full blur-md opacity-75 animate-pulse-glow"></div>
        
        {/* Main button */}
        <button
          onClick={handleDownload}
          className="relative bg-gradient-to-br from-[#b7cfe0] via-[#a5c3d6] to-[#8bb3d9] text-[#131516] rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center touch-manipulation transform hover:scale-110 active:scale-95 border border-white/20 backdrop-blur-sm"
          aria-label="Download Image"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 rounded-full pointer-events-none"></div>
          
          {/* Enhanced download icon */}
          <svg 
            className="relative w-6 h-6 drop-shadow-sm" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </button>
        
        {/* Premium tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md text-white text-sm px-3 py-2 rounded-lg border border-white/20 whitespace-nowrap">
            Download Image
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
