'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useImage } from '../context/ImageContext';
import KeyboardShortcuts from './KeyboardShortcuts';

export default function ImagePreview() {
  const { state, dispatch, loadImage } = useImage();
  const { processedImage, originalImage, cropMode, cropArea } = state;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [fitToScreen, setFitToScreen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const displayImage = processedImage || originalImage;

  useEffect(() => {
    if (processedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas size to match processed image
      canvas.width = processedImage.width;
      canvas.height = processedImage.height;
      
      // Clear and draw the processed image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(processedImage, 0, 0);
      
      // Auto-fit to screen
      if (fitToScreen) {
        const container = canvas.parentElement;
        if (container) {
          const containerWidth = container.clientWidth - 32; // Account for padding
          const containerHeight = container.clientHeight - 32;
          const scaleX = containerWidth / canvas.width;
          const scaleY = containerHeight / canvas.height;
          const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%
          setScale(newScale);
        }
      }
    }
  }, [processedImage, fitToScreen]);

  const handleFitToScreen = () => {
    setFitToScreen(true);
  };

  const handle100Percent = () => {
    setScale(1);
    setFitToScreen(false);
  };

  const handleZoomIn = () => {
    setFitToScreen(false);
    setScale(prevScale => Math.min(prevScale * 1.2, 5)); // Max zoom 5x
  };

  const handleZoomOut = () => {
    setFitToScreen(false);
    setScale(prevScale => Math.max(prevScale / 1.2, 0.1)); // Min zoom 10%
  };

  const getZoomPercentage = () => {
    return Math.round(scale * 100);
  };

  // Handle keyboard shortcuts for zooming
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!displayImage) return;
      
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        handleFitToScreen();
      } else if (e.key === '1') {
        e.preventDefault();
        handle100Percent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayImage]);

  // Handle drag and drop on preview area
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      loadImage(files[0]);
    }
  }, [loadImage]);

  // Handle mouse wheel zooming
  const handleWheel = useCallback((e) => {
    if (!displayImage || !e.ctrlKey) return;
    
    e.preventDefault();
    
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  }, [displayImage]);

  // Convert screen coordinates to image coordinates
  const screenToImageCoords = useCallback((screenX, screenY) => {
    if (!canvasRef.current || !containerRef.current) return { x: 0, y: 0 };
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    
    const x = (screenX - canvasRect.left) / scale;
    const y = (screenY - canvasRect.top) / scale;
    
    return { x: Math.max(0, Math.min(canvas.width, x)), y: Math.max(0, Math.min(canvas.height, y)) };
  }, [scale]);

  // Handle crop area dragging
  const handleMouseDown = useCallback((e) => {
    if (!cropMode || !processedImage) return;
    
    const coords = screenToImageCoords(e.clientX, e.clientY);
    
    // Check if clicking on resize handles
    const handleSize = 10 / scale;
    const right = cropArea.x + cropArea.width;
    const bottom = cropArea.y + cropArea.height;
    
    if (Math.abs(coords.x - right) < handleSize && Math.abs(coords.y - bottom) < handleSize) {
      setResizing('se');
    } else if (Math.abs(coords.x - right) < handleSize && Math.abs(coords.y - cropArea.y) < handleSize) {
      setResizing('ne');
    } else if (Math.abs(coords.x - cropArea.x) < handleSize && Math.abs(coords.y - bottom) < handleSize) {
      setResizing('sw');
    } else if (Math.abs(coords.x - cropArea.x) < handleSize && Math.abs(coords.y - cropArea.y) < handleSize) {
      setResizing('nw');
    } else if (coords.x >= cropArea.x && coords.x <= right && coords.y >= cropArea.y && coords.y <= bottom) {
      // Dragging the crop area
      setIsDragging(true);
      setDragStart({ x: coords.x - cropArea.x, y: coords.y - cropArea.y });
    } else {
      // Start new crop area
      const newCropArea = { x: coords.x, y: coords.y, width: 0, height: 0 };
      dispatch({ type: 'SET_CROP_AREA', payload: newCropArea });
      setResizing('se');
    }
  }, [cropMode, processedImage, cropArea, scale, screenToImageCoords, dispatch]);

  const handleMouseMove = useCallback((e) => {
    if (!cropMode || !processedImage) return;
    
    const coords = screenToImageCoords(e.clientX, e.clientY);
    
    if (resizing) {
      let newCropArea = { ...cropArea };
      
      switch (resizing) {
        case 'se':
          newCropArea.width = Math.max(10, coords.x - cropArea.x);
          newCropArea.height = Math.max(10, coords.y - cropArea.y);
          break;
        case 'ne':
          newCropArea.y = Math.min(coords.y, cropArea.y + cropArea.height - 10);
          newCropArea.height = (cropArea.y + cropArea.height) - newCropArea.y;
          newCropArea.width = Math.max(10, coords.x - cropArea.x);
          break;
        case 'sw':
          newCropArea.x = Math.min(coords.x, cropArea.x + cropArea.width - 10);
          newCropArea.width = (cropArea.x + cropArea.width) - newCropArea.x;
          newCropArea.height = Math.max(10, coords.y - cropArea.y);
          break;
        case 'nw':
          newCropArea.x = Math.min(coords.x, cropArea.x + cropArea.width - 10);
          newCropArea.y = Math.min(coords.y, cropArea.y + cropArea.height - 10);
          newCropArea.width = (cropArea.x + cropArea.width) - newCropArea.x;
          newCropArea.height = (cropArea.y + cropArea.height) - newCropArea.y;
          break;
      }
      
      // Ensure crop area stays within image bounds
      newCropArea.x = Math.max(0, Math.min(processedImage.width - newCropArea.width, newCropArea.x));
      newCropArea.y = Math.max(0, Math.min(processedImage.height - newCropArea.height, newCropArea.y));
      
      dispatch({ type: 'SET_CROP_AREA', payload: newCropArea });
    } else if (isDragging) {
      const newCropArea = {
        ...cropArea,
        x: Math.max(0, Math.min(processedImage.width - cropArea.width, coords.x - dragStart.x)),
        y: Math.max(0, Math.min(processedImage.height - cropArea.height, coords.y - dragStart.y)),
      };
      dispatch({ type: 'SET_CROP_AREA', payload: newCropArea });
    }
  }, [cropMode, processedImage, resizing, isDragging, cropArea, dragStart, scale, screenToImageCoords, dispatch]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setResizing(null);
  }, []);

  useEffect(() => {
    if (cropMode) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [cropMode, handleMouseMove, handleMouseUp]);

  return (
    <>
      <div className="flex w-full grow bg-gradient-to-br from-[#1a1d20] via-[#131516] to-[#0f1214] p-2 lg:p-4">
        <div 
          ref={containerRef}
          className={`relative w-full gap-1 overflow-hidden bg-gradient-to-br from-[#1a1d20] via-[#131516] to-[#0f1214] border border-[#2d3134]/50 min-[480px]:gap-2 aspect-[3/2] lg:aspect-[3/2] rounded-xl flex items-center justify-center transition-all duration-300 group ${
            isDragOver ? 'bg-gradient-to-br from-[#1a1d20] to-[#131516] border-[#b7cfe0] shadow-[0_0_30px_rgba(183,207,224,0.3)]' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Premium glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 rounded-xl pointer-events-none"></div>
          
          {displayImage ? (
            <div className="relative z-10">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-[#2d3134]/30"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'center',
                  transition: fitToScreen ? 'transform 0.3s ease' : 'none',
                  filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))'
                }}
                onMouseDown={handleMouseDown}
                onWheel={handleWheel}
              />
              {/* Premium crop overlay with enhanced styling */}
              {cropMode && cropArea.width > 0 && cropArea.height > 0 && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `calc(50% + ${(cropArea.x - displayImage.width / 2) * scale}px)`,
                    top: `calc(50% + ${(cropArea.y - displayImage.height / 2) * scale}px)`,
                    width: `${cropArea.width * scale}px`,
                    height: `${cropArea.height * scale}px`,
                    border: '2px solid rgb(251, 191, 36)',
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    boxSizing: 'border-box',
                    borderRadius: '4px',
                    boxShadow: '0 0 20px rgba(251, 191, 36, 0.3), inset 0 0 10px rgba(251, 191, 36, 0.1)'
                  }}
                >
                  {/* Premium resize handles with glow effect */}
                  <div className="absolute w-3 h-3 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] border-2 border-white -top-1 -left-1 cursor-nw-resize pointer-events-auto rounded-sm shadow-lg" style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }} />
                  <div className="absolute w-3 h-3 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] border-2 border-white -top-1 -right-1 cursor-ne-resize pointer-events-auto rounded-sm shadow-lg" style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }} />
                  <div className="absolute w-3 h-3 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] border-2 border-white -bottom-1 -left-1 cursor-sw-resize pointer-events-auto rounded-sm shadow-lg" style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }} />
                  <div className="absolute w-3 h-3 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] border-2 border-white -bottom-1 -right-1 cursor-se-resize pointer-events-auto rounded-sm shadow-lg" style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }} />
                </div>
              )}
            </div>
          ) : (
            /* Premium empty state with enhanced styling */
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 h-full">
              <div className={`relative w-32 h-32 border-2 border-dashed rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                isDragOver 
                  ? 'border-[#b7cfe0] bg-gradient-to-br from-[#b7cfe0]/20 to-[#8bb3d9]/10 scale-105' 
                  : 'border-[#42484d] hover:border-[#6b7280] hover:bg-[#2d3134]/30'
              }`}>
                {/* Background glow effect */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                  isDragOver ? 'opacity-100' : 'opacity-0'
                }`} style={{ 
                  background: 'radial-gradient(circle, rgba(183, 207, 224, 0.1) 0%, transparent 70%)',
                  filter: 'blur(10px)'
                }}></div>
                
                <svg 
                  className={`relative z-10 w-12 h-12 transition-all duration-300 ${
                    isDragOver 
                      ? 'text-[#b7cfe0] scale-110' 
                      : 'text-[#42484d] group-hover:text-[#6b7280]'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 font-[family-name:var(--font-poppins)] ${
                isDragOver ? 'text-[#b7cfe0]' : 'text-white'
              }`}>
                {isDragOver ? 'Drop Your Image Here' : 'Ready for Your Image'}
              </h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDragOver ? 'text-[#8bb3d9]' : 'text-[#a4acb2]'
              }`}>
                {isDragOver 
                  ? 'Release to load and start editing' 
                  : 'Upload an image or drag one here to begin your creative journey'
                }
              </p>
            </div>
          )}
        </div>
      </div>
      {!cropMode && (
        <div className="flex justify-stretch bg-gradient-to-r from-black/10 via-black/5 to-black/10 backdrop-blur-sm border-t border-white/5">
          <div className="flex flex-1 gap-2 lg:gap-3 flex-wrap px-2 lg:px-4 py-3 justify-between lg:justify-end">
            {/* Premium Zoom Controls */}
            <div className="flex items-center gap-2 order-1 lg:order-none bg-black/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
              <button
                onClick={handleZoomOut}
                disabled={!displayImage || scale <= 0.1}
                className="flex w-8 h-8 lg:w-10 lg:h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#2d3134] to-[#1a1d20] text-white text-lg lg:text-xl font-bold leading-normal hover:from-[#3a4144] hover:to-[#2d3134] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 border border-white/10"
                title="Zoom Out"
              >
                <span className="drop-shadow-sm">−</span>
              </button>
              <span className="text-white text-xs lg:text-sm font-medium min-w-[40px] text-center bg-black/30 px-2 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                {getZoomPercentage()}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={!displayImage || scale >= 5}
                className="flex w-8 h-8 lg:w-10 lg:h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#2d3134] to-[#1a1d20] text-white text-lg lg:text-xl font-bold leading-normal hover:from-[#3a4144] hover:to-[#2d3134] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 border border-white/10"
                title="Zoom In"
              >
                <span className="drop-shadow-sm">+</span>
              </button>
            </div>
            
            {/* Premium View Controls */}
            <div className="flex gap-2 lg:gap-3 order-2 lg:order-none items-center">
              <button
                onClick={handleFitToScreen}
                disabled={!displayImage}
                className="group flex min-w-[70px] lg:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 lg:h-10 px-3 lg:px-4 bg-gradient-to-r from-[#2d3134] via-[#323943] to-[#2d3134] text-white text-xs lg:text-sm font-bold leading-normal tracking-[0.015em] hover:from-[#3a4144] hover:via-[#404958] hover:to-[#3a4144] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 border border-white/10 backdrop-blur-sm"
              >
                <span className="truncate drop-shadow-sm group-hover:text-[#b7cfe0] transition-colors duration-300">Fit Screen</span>
              </button>
              <button
                onClick={handle100Percent}
                disabled={!displayImage}
                className="group flex min-w-[50px] lg:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 lg:h-10 px-3 lg:px-4 bg-gradient-to-r from-[#2d3134] via-[#323943] to-[#2d3134] text-white text-xs lg:text-sm font-bold leading-normal tracking-[0.015em] hover:from-[#3a4144] hover:via-[#404958] hover:to-[#3a4144] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 border border-white/10 backdrop-blur-sm"
              >
                <span className="truncate drop-shadow-sm group-hover:text-[#b7cfe0] transition-colors duration-300">100%</span>
              </button>
              <div className="hidden lg:block">
                <KeyboardShortcuts />
              </div>
            </div>
          </div>
        </div>
      )}
      {displayImage && !cropMode && (
        <div className="hidden lg:flex px-2 lg:px-4 pb-2 justify-between items-center">
          <div className="text-xs text-[#a4acb2]">
            {displayImage.width} × {displayImage.height} px
          </div>
          <p className="text-[#a4acb2] text-xs text-center">
            Shortcuts: +/- to zoom, 0 to fit screen, 1 for 100%, Ctrl+scroll to zoom
          </p>
        </div>
      )}
      {displayImage && !cropMode && (
        <div className="lg:hidden px-2 lg:px-4 pb-2">
          <p className="text-[#a4acb2] text-xs text-center">
            Shortcuts: +/- to zoom, 0 to fit screen, 1 for 100%, Ctrl+scroll to zoom
          </p>
        </div>
      )}
    </>
  );
}
