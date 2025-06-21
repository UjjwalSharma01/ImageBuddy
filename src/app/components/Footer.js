export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-[#2d3134] bg-gradient-to-r from-[#0a0b0c] to-[#131516]">
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#b7cfe0]/3 via-transparent to-[#b7cfe0]/3 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-10 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <div className="size-8 p-1.5 bg-gradient-to-br from-[#b7cfe0] to-[#8bb3d9] rounded-lg">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#131516]">
                <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9H15V15H9V9Z" fill="currentColor"/>
                <path d="M4 4L9 9M20 4L15 9M20 20L15 15M4 20L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg font-[family-name:var(--font-poppins)]">ImageBuddy</h3>
              <p className="text-[#a4acb2] text-sm">Professional Image Editing</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            <a className="group flex items-center gap-2 text-[#a4acb2] hover:text-[#b7cfe0] text-sm font-medium transition-all duration-300" href="/privacy">
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              Privacy
            </a>
            <a className="group flex items-center gap-2 text-[#a4acb2] hover:text-[#b7cfe0] text-sm font-medium transition-all duration-300" href="/terms">
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Terms
            </a>
            <a className="group flex items-center gap-2 text-[#a4acb2] hover:text-[#b7cfe0] text-sm font-medium transition-all duration-300" href="/gdpr">
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              GDPR
            </a>
            <a className="group flex items-center gap-2 text-[#a4acb2] hover:text-[#b7cfe0] text-sm font-medium transition-all duration-300" href="https://github.com/imagebuddy/imagebuddy" target="_blank" rel="noopener noreferrer">
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Copyright and Feature Highlights */}
        <div className="mt-8 pt-6 border-t border-[#2d3134] flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col lg:flex-row items-center gap-4 text-sm text-[#a4acb2]">
            <p>© 2025 ImageBuddy. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Secure Processing
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                Advanced Tools
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
                Lightning Fast
              </span>
            </div>
          </div>
          
          <div className="text-xs text-[#6a737b]">
            Made with ❤️ for creators worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}
