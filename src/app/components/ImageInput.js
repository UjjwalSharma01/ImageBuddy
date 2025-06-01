'use client';

import { useRef } from 'react';
import { useImage } from '../context/ImageContext';

export default function ImageInput() {
  const { loadImage } = useImage();
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      loadImage(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    fileInputRef.current?.click();
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="relative">
        {/* Premium header with gradient */}
        <div className="bg-gradient-to-r from-[#1a1d20] to-[#131516] px-6 py-4 rounded-t-xl border-b border-[#2d3134]/50">
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] font-[family-name:var(--font-poppins)] flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#b7cfe0] to-[#8bb3d9] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#131516]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            Upload Image
          </h2>
          <p className="text-[#a4acb2] text-sm mt-1">Drag, drop, or click to select your image</p>
        </div>
        
        <div className="p-6">
          <div 
            className="relative flex flex-col items-center gap-6 rounded-2xl border-2 border-dashed border-[#42484d] px-6 py-12 cursor-pointer hover:border-[#b7cfe0] hover:bg-[#b7cfe0]/5 transition-all duration-300 group overflow-hidden"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleClick}
          >
            {/* Premium background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#b7cfe0]/5 via-transparent to-[#8bb3d9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Upload icon with animation */}
            <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-[#2d3134] to-[#3a4144] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg className="w-10 h-10 text-[#b7cfe0] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#b7cfe0]/20 to-[#8bb3d9]/20 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-3 text-center">
              <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] font-[family-name:var(--font-poppins)]">
                Drag & Drop Your Image Here
              </h3>
              <p className="text-[#a4acb2] text-sm font-normal leading-normal max-w-[320px]">
                Supports JPG, PNG, WebP, and other common formats. Maximum file size: 50MB
              </p>
            </div>
            
            <button
              className="relative z-10 premium-button flex items-center justify-center gap-2 px-8 py-3 rounded-full text-[#131516] text-sm font-bold leading-normal tracking-[0.015em] shadow-lg transform transition-all duration-300 hover:scale-105"
              onClick={handleButtonClick}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span>Select File</span>
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </div>
      
      <div className="px-4 space-y-2">
        <p className="text-[#a4acb2] text-sm font-normal leading-normal">Supports: JPG, PNG, WEBP, GIF</p>
        <div className="bg-[#2d3134] rounded-lg p-3">
          <p className="text-[#a4acb2] text-xs lg:text-sm font-normal leading-normal">
            🔒 <span className="font-medium text-white">Private & Secure:</span> All processing happens locally in your browser. Your images never leave your device.
          </p>
        </div>
      </div>
    </>
  );
}
