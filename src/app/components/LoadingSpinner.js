'use client';

export default function LoadingSpinner({ size = 'md', text = 'Processing...', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      {/* Premium loading spinner */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className={`${sizeClasses[size]} rounded-full border-2 border-transparent bg-gradient-to-r from-[#b7cfe0] via-[#8bb3d9] to-[#b7cfe0] animate-spin`}>
          <div className="absolute inset-0.5 rounded-full bg-[#131516]"></div>
        </div>
        
        {/* Inner pulse */}
        <div className={`absolute inset-2 rounded-full bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] animate-pulse opacity-60`}></div>
      </div>
      
      {/* Loading text */}
      {text && (
        <p className="text-sm text-[#a4acb2] font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
