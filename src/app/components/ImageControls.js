'use client';

import { useEffect, useState } from 'react';
import { useImage } from '../context/ImageContext';

export default function ImageControls() {
  const { 
    state, 
    dispatch, 
    applyFiltersToImage,
    resizeImage, 
    rotateImage, 
    flipImage, 
    applyGrayscale, 
    applySepia, 
    downloadImage,
    compressImage,
    startCrop,
    cancelCrop,
    cropImage
  } = useImage();

  const { settings, originalImage, processedImage, originalSize, cropMode } = state;

  // Local state for optional operations
  const [enableResize, setEnableResize] = useState(false);
  const [enableCompression, setEnableCompression] = useState(false);
  const [enableFilters, setEnableFilters] = useState(false);
  const [customFileName, setCustomFileName] = useState('');

  // Set initial filename when image is loaded
  useEffect(() => {
    if (state.fileName && !customFileName) {
      const nameWithoutExtension = state.fileName.replace(/\.[^/.]+$/, '');
      setCustomFileName(nameWithoutExtension);
    }
  }, [state.fileName]);

  // Apply filters when settings change (only if filters are enabled)
  useEffect(() => {
    if (processedImage && enableFilters) {
      const timeoutId = setTimeout(() => {
        applyFiltersToImage();
      }, 100); // Debounce for better performance
      
      return () => clearTimeout(timeoutId);
    }
  }, [settings.brightness, settings.contrast, settings.saturation, processedImage, enableFilters]);

  const handleResize = () => {
    const width = parseInt(settings.width);
    const height = parseInt(settings.height);
    if (width > 0 && height > 0 && enableResize) {
      resizeImage(width, height);
    }
  };

  const handleCompress = () => {
    if (enableCompression) {
      compressImage();
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;

    const format = settings.format;
    const quality = settings.quality / 100;
    const fileName = customFileName || 'edited-image';
    
    processedImage.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName + '.' + format;
      link.click();
      URL.revokeObjectURL(link.href);
    }, `image/${format}`, quality);
  };

  const handleWidthChange = (e) => {
    const width = e.target.value;
    let newSettings = { width };
    
    if (settings.lockAspectRatio && originalImage && width) {
      const aspectRatio = originalImage.height / originalImage.width;
      newSettings.height = Math.round(parseInt(width) * aspectRatio).toString();
    }
    
    dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
  };

  const handleHeightChange = (e) => {
    const height = e.target.value;
    let newSettings = { height };
    
    if (settings.lockAspectRatio && originalImage && height) {
      const aspectRatio = originalImage.width / originalImage.height;
      newSettings.width = Math.round(parseInt(height) * aspectRatio).toString();
    }
    
    dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const estimatedSize = originalSize * 0.4; // Rough estimation

  return (
    <div className="space-y-1">
      {/* Resize Section */}
      <div className="group">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1" style={{fontFamily: 'var(--font-heading)'}}>
            Smart Resize
          </h2>
        </div>
      </div>
      
      <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">Enable Resize</span>
            <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">Pro Feature</span>
          </div>
          <div className="shrink-0">
            <label
              className={`relative flex h-7 w-12 cursor-pointer items-center rounded-full border-none p-0.5 transition-all duration-300 ${
                enableResize 
                  ? 'justify-end bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25' 
                  : 'justify-start bg-slate-600 hover:bg-slate-500'
              }`}
            >
              <div className={`h-6 w-6 rounded-full bg-white shadow-lg transition-all duration-300 ${enableResize ? 'shadow-blue-500/25' : 'shadow-slate-400/25'}`}></div>
              <input 
                type="checkbox" 
                className="invisible absolute"
                checked={enableResize}
                onChange={(e) => setEnableResize(e.target.checked)}
              />
            </label>
          </div>
        </div>
        {enableResize && (
          <div className="space-y-4 mt-4 pt-4 border-t border-slate-600/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  Width (px)
                </label>
                <input
                  className="premium-input w-full h-11 px-4 bg-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-lg text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:bg-slate-600/50 transition-all duration-300"
                  value={settings.width}
                  onChange={handleWidthChange}
                  type="number"
                  placeholder="Enter width"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7V3m0 0l4 4m-4-4l-4 4m-6 0v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  Height (px)
                </label>
                <input
                  className="premium-input w-full h-11 px-4 bg-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-lg text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:bg-slate-600/50 transition-all duration-300"
                  value={settings.height}
                  onChange={handleHeightChange}
                  type="number"
                  placeholder="Enter height"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/20">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-white font-medium">Lock Aspect Ratio</span>
              </div>
              <label
                className={`relative flex h-6 w-11 cursor-pointer items-center rounded-full border-none p-0.5 transition-all duration-300 ${
                  settings.lockAspectRatio 
                    ? 'justify-end bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25' 
                    : 'justify-start bg-slate-600 hover:bg-slate-500'
                }`}
              >
                <div className={`h-5 w-5 rounded-full bg-white shadow-lg transition-all duration-300 ${settings.lockAspectRatio ? 'shadow-blue-500/25' : 'shadow-slate-400/25'}`}></div>
                <input 
                  type="checkbox" 
                  className="invisible absolute"
                  checked={settings.lockAspectRatio}
                  onChange={(e) => dispatch({ 
                    type: 'UPDATE_SETTINGS', 
                    payload: { lockAspectRatio: e.target.checked }
                  })}
                />
              </label>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleResize}
                disabled={!processedImage}
                className="premium-button bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-700 px-6 py-2.5 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Apply Resize
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Compress Section */}
      <div className="group">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1" style={{fontFamily: 'var(--font-heading)'}}>
            Smart Compression
          </h2>
        </div>
      </div>
      
      <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">Enable Compression</span>
            <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">AI Powered</span>
          </div>
          <label
            className={`relative flex h-7 w-12 cursor-pointer items-center rounded-full border-none p-0.5 transition-all duration-300 ${
              enableCompression 
                ? 'justify-end bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25' 
                : 'justify-start bg-slate-600 hover:bg-slate-500'
            }`}
          >
            <div className={`h-6 w-6 rounded-full bg-white shadow-lg transition-all duration-300 ${enableCompression ? 'shadow-purple-500/25' : 'shadow-slate-400/25'}`}></div>
            <input 
              type="checkbox" 
              className="invisible absolute"
              checked={enableCompression}
              onChange={(e) => setEnableCompression(e.target.checked)}
            />
          </label>
        </div>
        {enableCompression && (
          <div className="space-y-4 mt-4 pt-4 border-t border-slate-600/30">
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/20">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Original</span>
                <span className="text-white font-medium text-sm">{formatFileSize(originalSize)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Compressed</span>
                <span className="text-green-400 font-medium text-sm">{formatFileSize(estimatedSize)}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Output Format
                </label>
                <select
                  className="premium-select w-full h-11 px-4 bg-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-lg text-white focus:border-purple-500/50 focus:bg-slate-600/50 transition-all duration-300 appearance-none cursor-pointer"
                  value={settings.format}
                  onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { format: e.target.value } })}
                >
                  <option value="jpeg">JPEG - Best for photos</option>
                  <option value="png">PNG - Best for graphics</option>
                  <option value="webp">WebP - Modern & efficient</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <label className="text-white text-sm font-medium flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                    Quality
                  </span>
                  <span className="text-purple-400 font-medium">{settings.quality}%</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={settings.quality}
                    onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { quality: parseInt(e.target.value) } })}
                    className="premium-range w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${settings.quality}%, rgb(71, 85, 105) ${settings.quality}%, rgb(71, 85, 105) 100%)`
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleCompress}
                disabled={!processedImage}
                className="premium-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-600 disabled:to-slate-700 px-6 py-2.5 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Apply Compression
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Adjustments Section */}
      <div className="group">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1" style={{fontFamily: 'var(--font-heading)'}}>
            Color Adjustments
          </h2>
        </div>
      </div>
      
      <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">Enable Filters</span>
            <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">Real-time</span>
          </div>
          <label
            className={`relative flex h-7 w-12 cursor-pointer items-center rounded-full border-none p-0.5 transition-all duration-300 ${
              enableFilters 
                ? 'justify-end bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25' 
                : 'justify-start bg-slate-600 hover:bg-slate-500'
            }`}
          >
            <div className={`h-6 w-6 rounded-full bg-white shadow-lg transition-all duration-300 ${enableFilters ? 'shadow-emerald-500/25' : 'shadow-slate-400/25'}`}></div>
            <input 
              type="checkbox" 
              className="invisible absolute"
              checked={enableFilters}
              onChange={(e) => setEnableFilters(e.target.checked)}
            />
          </label>
        </div>
      
        {enableFilters && (
          <div className="space-y-4 mt-4 pt-4 border-t border-slate-600/30">
            {/* Brightness Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Brightness
                </label>
                <span className="text-yellow-400 font-medium bg-slate-700/50 px-2 py-1 rounded-md text-sm">
                  {settings.brightness}%
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.brightness}
                  onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { brightness: parseInt(e.target.value) } })}
                  className="premium-range w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(251, 191, 36) 0%, rgb(251, 191, 36) ${settings.brightness}%, rgb(71, 85, 105) ${settings.brightness}%, rgb(71, 85, 105) 100%)`
                  }}
                />
              </div>
            </div>

            {/* Contrast Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                  Contrast
                </label>
                <span className="text-orange-400 font-medium bg-slate-700/50 px-2 py-1 rounded-md text-sm">
                  {settings.contrast}%
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.contrast}
                  onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { contrast: parseInt(e.target.value) } })}
                  className="premium-range w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(251, 146, 60) 0%, rgb(251, 146, 60) ${settings.contrast}%, rgb(71, 85, 105) ${settings.contrast}%, rgb(71, 85, 105) 100%)`
                  }}
                />
              </div>
            </div>

            {/* Saturation Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                  Saturation
                </label>
                <span className="text-pink-400 font-medium bg-slate-700/50 px-2 py-1 rounded-md text-sm">
                  {settings.saturation}%
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.saturation}
                  onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { saturation: parseInt(e.target.value) } })}
                  className="premium-range w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(244, 114, 182) 0%, rgb(244, 114, 182) ${settings.saturation}%, rgb(71, 85, 105) ${settings.saturation}%, rgb(71, 85, 105) 100%)`
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transform & Effects Section */}
      {!cropMode ? (
        <>
          <div className="group">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1" style={{fontFamily: 'var(--font-heading)'}}>
                Transform & Effects
              </h2>
            </div>
          </div>
          
          <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
            {/* Transform Buttons */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <h3 className="text-white font-semibold">Transform Tools</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={startCrop}
                  disabled={!processedImage}
                  className="premium-button bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 px-4 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1" />
                  </svg>
                  <span className="truncate">Crop</span>
                </button>
                <button
                  onClick={() => rotateImage(-90)}
                  disabled={!processedImage}
                  className="premium-button bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 px-4 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="truncate">Rotate ↺</span>
                </button>
                <button
                  onClick={() => rotateImage(90)}
                  disabled={!processedImage}
                  className="premium-button bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 px-4 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 20v-5h-.581m0 0a8.003 8.003 0 00-15.357-2m15.357 2H15v5m5-5h-5.419m0 0a8.001 8.001 0 00.001 0z" />
                  </svg>
                  <span className="truncate">Rotate ↻</span>
                </button>
                <button
                  onClick={() => flipImage(true)}
                  disabled={!processedImage}
                  className="premium-button bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 px-4 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span className="truncate">Flip ⇄</span>
                </button>
              </div>
              <button
                onClick={() => flipImage(false)}
                disabled={!processedImage}
                className="premium-button w-full bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 px-4 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span className="truncate">Flip Vertical ⇅</span>
              </button>
            </div>

            {/* Color Effects */}
            <div className="mt-6 pt-6 border-t border-slate-600/30">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
                <h3 className="text-white font-semibold">Color Effects</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={applyGrayscale}
                  disabled={!processedImage}
                  className="premium-button bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 disabled:from-slate-800 disabled:to-slate-900 px-4 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="truncate">Grayscale</span>
                </button>
                <button
                  onClick={applySepia}
                  disabled={!processedImage}
                  className="premium-button bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:from-slate-800 disabled:to-slate-900 px-4 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="truncate">Sepia</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="relative">
          {/* Premium Crop Mode Header */}
          <div className="bg-gradient-to-r from-[#1a1d20] to-[#131516] px-6 py-4 rounded-t-xl border-b border-[#2d3134]/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#131516]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1" />
                </svg>
              </div>
              <div>
                <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] font-[family-name:var(--font-poppins)]">
                  Crop Mode Active
                </h3>
                <p className="text-[#a4acb2] text-sm">Precision cropping tool</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-[#1a1d20] via-[#131516] to-[#0f1214] rounded-b-xl">
            {/* Instructions with premium styling */}
            <div className="bg-gradient-to-r from-[#2d3134]/50 to-[#3a4144]/30 border border-[#42484d]/50 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#131516]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium mb-1">How to use:</p>
                  <p className="text-[#a4acb2] text-xs leading-relaxed">
                    Drag to select the area you want to crop. Use the corner handles to resize, or drag the area to reposition. 
                    Preview updates in real-time for precision editing.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Premium action buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelCrop}
                className="premium-button bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 px-6 py-2.5 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button
                onClick={() => cropImage(state.cropArea)}
                className="premium-button bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] px-6 py-2.5 rounded-lg text-[#131516] font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Finalize Section */}
      <div className="relative">
        {/* Premium header with gradient */}
        <div className="bg-gradient-to-r from-[#1a1d20] to-[#131516] px-6 py-4 rounded-t-xl border-b border-[#2d3134]/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] font-[family-name:var(--font-poppins)]">
                Finalize & Export
              </h2>
              <p className="text-[#a4acb2] text-sm">Ready to save your masterpiece</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-[#1a1d20] via-[#131516] to-[#0f1214] rounded-b-xl">
          {/* Premium filename input */}
          <div className="mb-6">
            <label className="block">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 1H7a2 2 0 00-2 2v16a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-base font-semibold">Custom Filename</span>
              </div>
              <div className="relative">
                <input
                  className="premium-input w-full h-12 px-4 bg-gradient-to-r from-[#2d3134] to-[#3a4144] border border-[#42484d] rounded-lg text-white placeholder:text-[#a4acb2] focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all duration-300"
                  value={customFileName}
                  onChange={(e) => setCustomFileName(e.target.value)}
                  placeholder="Enter your filename..."
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/5 to-[#059669]/5 rounded-lg opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </label>
          </div>
          
          {/* Premium action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              className="premium-button bg-gradient-to-r from-[#6b7280] to-[#4b5563] hover:from-[#4b5563] hover:to-[#374151] px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Changes
            </button>
            <button
              onClick={handleDownload}
              disabled={!processedImage}
              className="premium-button bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] disabled:from-slate-600 disabled:to-slate-700 px-6 py-3 rounded-lg text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Image
            </button>
          </div>
          
          {/* Premium start over button */}
          <div className="flex justify-center">
            <button
              onClick={() => dispatch({ type: 'START_OVER' })}
              className="px-6 py-2.5 bg-transparent text-[#a4acb2] hover:text-white text-sm font-medium rounded-lg border border-[#42484d] hover:border-[#6b7280] hover:bg-[#2d3134]/30 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Start Over with New Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
