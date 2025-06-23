'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVisitorStats } from '../context/VisitorContext';
import { 
  FiLock, 
  FiZap, 
  FiTarget, 
  FiDollarSign,
  FiCrop,
  FiImage,
  FiScissors,
  FiMinimize2,
  FiStar,
  FiShield,
  FiEye,
  FiSmartphone,
  FiDollarSign as FiMoney,
  FiArrowDown,
  FiCheckCircle,
  FiAlertTriangle,
  FiUsers,
  FiActivity,
  FiGlobe
} from 'react-icons/fi';
import { 
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineChatBubbleBottomCenterText
} from 'react-icons/hi2';
import { IoShieldCheckmarkOutline, IoRocketOutline } from 'react-icons/io5';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ users: 0, photos: 0, countries: 0, online: 0 });
  const router = useRouter();
  const { stats } = useVisitorStats();

  useEffect(() => {
    setIsVisible(true);
    
    // Advanced mouse tracking for interactive effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate features demo
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animated stats counter that updates with real data
  useEffect(() => {
    if (stats.isLoading) return;

    const targets = {
      users: stats.totalVisitors,
      photos: stats.photosEdited,
      countries: stats.countries,
      online: stats.onlineNow
    };

    const duration = 2000;
    const steps = 60;
    const increment = {
      users: targets.users / steps,
      photos: targets.photos / steps,
      countries: targets.countries / steps,
      online: targets.online / steps
    };

    let step = 0;
    const timer = setInterval(() => {
      if (step < steps) {
        setAnimatedStats({
          users: Math.floor(increment.users * step),
          photos: Math.floor(increment.photos * step),
          countries: Math.floor(increment.countries * step),
          online: Math.floor(increment.online * step)
        });
        step++;
      } else {
        setAnimatedStats(targets);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [stats]);

  const benefits = [
    {
      icon: <FiLock className="w-12 h-12" />,
      title: 'Your Photos Stay Private',
      description: 'Edit locally on your device. Zero uploads to sketchy cloud services.',
      highlight: 'No data collection. No privacy violations. 100% secure.'
    },
    {
      icon: <FiZap className="w-12 h-12" />,
      title: 'Quick & Simple Edits',
      description: 'Resize, crop, adjust brightness, and compress in seconds.',
      highlight: 'Basic tools that just work, without the complexity.'
    },
    {
      icon: <FiTarget className="w-12 h-12" />,
      title: 'No Account Required',
      description: 'Open the app and start editing. No signups, no passwords, no hassle.',
      highlight: 'Anonymous editing for maximum privacy.'
    },
    {
      icon: <FiDollarSign className="w-12 h-12" />,
      title: 'Completely Free Forever',
      description: 'Why pay subscriptions for basic image operations?',
      highlight: 'Essential tools without the premium price tag.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Content Creator',
      avatar: <HiOutlineUserGroup className="w-8 h-8" />,
      quote: 'Finally, I can resize my photos without uploading them to random websites.',
      metric: 'Privacy Protected'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Small Business Owner',
      avatar: <HiOutlineAcademicCap className="w-8 h-8" />,
      quote: 'Perfect for quick edits without learning complicated software.',
      metric: 'Time Saved Daily'
    },
    {
      name: 'Emily Thompson',
      role: 'Blogger',
      avatar: <HiOutlineChatBubbleBottomCenterText className="w-8 h-8" />,
      quote: 'Simple tools that work instantly. No more privacy concerns.',
      metric: 'Peace of Mind'
    }
  ];

  const features = [
    {
      title: 'Smart Resize',
      description: 'Resize images while maintaining aspect ratio',
      demo: <FiCrop className="w-16 h-16" />
    },
    {
      title: 'Quick Adjustments',
      description: 'Brightness, contrast, and saturation controls',
      demo: <FiImage className="w-16 h-16" />
    },
    {
      title: 'Precise Cropping',
      description: 'Crop to exact dimensions you need',
      demo: <FiScissors className="w-16 h-16" />
    },
    {
      title: 'File Compression',
      description: 'Reduce file size while keeping quality',
      demo: <FiMinimize2 className="w-16 h-16" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0c] via-[#131516] to-[#1a1d20] text-white overflow-x-hidden">
      {/* Dynamic animated background with mouse tracking */}
      <div className="fixed inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #b7cfe0 0%, transparent 50%), 
                             radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, #8bb3d9 0%, transparent 50%)`,
            backgroundSize: '800px 800px',
            animation: 'float 20s ease-in-out infinite',
            transition: 'background-image 0.3s ease'
          }}
        />
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#b7cfe0]/30 rounded-full animate-pulse"
              style={{
                left: `${(i * 47) % 100}%`,
                top: `${(i * 23) % 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + (i % 3)}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#b7cfe0] to-[#8bb3d9] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
            <FiImage className="text-[#131516] w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] bg-clip-text text-transparent truncate">
            ImageBuddy
          </span>
        </div>
        <button
          onClick={() => router.push('/editor')}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="px-3 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] text-[#131516] font-semibold text-xs sm:text-base rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex-shrink-0 relative overflow-hidden"
        >
          <span className="relative z-10">
            <span className="hidden sm:inline">Start Editing Free</span>
            <span className="sm:hidden">Start</span>
          </span>
          {isHovering && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#8bb3d9] to-[#b7cfe0] animate-pulse" />
          )}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-3 sm:px-6 text-center pt-16 sm:pt-0">
        <div className={`transform transition-all duration-1000 max-w-5xl mx-auto ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            Stop Giving Your Photos to
            <span className="block bg-gradient-to-r from-[#ff6b6b] via-[#ff8e8e] to-[#ff6b6b] bg-clip-text text-transparent">
              Companies That Spy
            </span>
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Resize, crop, and enhance your images safely on your device. 
            No uploads, no tracking, no data harvesting.
          </p>

          {/* Social Proof */}
          <div className="flex flex-col xs:flex-row items-center justify-center gap-3 xs:gap-4 sm:gap-8 mb-8 sm:mb-10 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="whitespace-nowrap">4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineUserGroup className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="whitespace-nowrap">50K+ happy users</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineSparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="whitespace-nowrap">Zero learning curve</span>
            </div>
          </div>

          {/* Real-time Animated Stats Counter */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-gradient-to-br from-[#1a1d20]/80 to-[#2d3134]/60 backdrop-blur-xl rounded-xl border border-[#2d3134]/50 hover:border-[#b7cfe0]/30 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <FiUsers className="w-5 h-5 text-[#b7cfe0] mr-2" />
                <div className="text-lg sm:text-2xl font-bold text-[#b7cfe0]">
                  {animatedStats.users.toLocaleString()}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Total Users</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-[#1a1d20]/80 to-[#2d3134]/60 backdrop-blur-xl rounded-xl border border-[#2d3134]/50 hover:border-[#b7cfe0]/30 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <FiActivity className="w-5 h-5 text-green-400 mr-2" />
                <div className="text-lg sm:text-2xl font-bold text-green-400">
                  {animatedStats.online}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Online Now</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-[#1a1d20]/80 to-[#2d3134]/60 backdrop-blur-xl rounded-xl border border-[#2d3134]/50 hover:border-[#b7cfe0]/30 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <FiImage className="w-5 h-5 text-purple-400 mr-2" />
                <div className="text-lg sm:text-2xl font-bold text-purple-400">
                  {animatedStats.photos > 1000000 
                    ? `${(animatedStats.photos / 1000000).toFixed(1)}M` 
                    : `${(animatedStats.photos / 1000).toFixed(0)}K`}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Photos Edited</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-[#1a1d20]/80 to-[#2d3134]/60 backdrop-blur-xl rounded-xl border border-[#2d3134]/50 hover:border-[#b7cfe0]/30 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <FiGlobe className="w-5 h-5 text-blue-400 mr-2" />
                <div className="text-lg sm:text-2xl font-bold text-blue-400">
                  {animatedStats.countries}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Countries</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
            <button
              onClick={() => router.push('/editor')}
              className="w-full px-6 sm:px-8 py-4 bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] text-[#131516] font-bold text-base sm:text-lg rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Start Editing Privately</span>
              <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="w-full px-6 sm:px-8 py-4 border-2 border-[#b7cfe0] text-[#b7cfe0] font-semibold text-base sm:text-lg rounded-xl hover:bg-[#b7cfe0]/10 transition-all duration-300">
              Watch 30s Demo
            </button>
          </div>
        </div>

        {/* Scroll Indicator - Hide on mobile */}
        <div className="absolute bottom-8 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-[#b7cfe0] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#b7cfe0] rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 px-4">
            Why Choose <span className="bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] bg-clip-text text-transparent">ImageBuddy</span>
          </h2>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group p-6 sm:p-8 bg-gradient-to-br from-[#1a1d20]/80 to-[#2d3134]/60 backdrop-blur-xl rounded-2xl border border-[#2d3134]/50 hover:border-[#b7cfe0]/30 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#b7cfe0]/5 to-[#8bb3d9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="text-[#b7cfe0] mb-4 flex justify-center sm:justify-start transform group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-center sm:text-left group-hover:text-[#b7cfe0] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-base sm:text-lg text-center sm:text-left">
                    {benefit.description}
                  </p>
                  <div className="text-[#b7cfe0] font-semibold text-base sm:text-lg text-center sm:text-left">
                    {benefit.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-red-900/20 to-red-800/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 px-4">
            Tired of Uploading Photos to <span className="text-red-400">Strangers</span>?
          </h2>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3 mb-8 sm:mb-12">
            <div className="p-4 sm:p-6 bg-red-900/30 rounded-xl border border-red-500/30">
              <div className="text-red-400 mb-3 flex justify-center">
                <FiEye className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="font-bold mb-2 text-base sm:text-lg">Data Harvesting</h3>
              <p className="text-gray-300 text-sm sm:text-base">Companies scan your photos for AI training</p>
            </div>
            <div className="p-4 sm:p-6 bg-red-900/30 rounded-xl border border-red-500/30">
              <div className="text-red-400 mb-3 flex justify-center">
                <FiSmartphone className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="font-bold mb-2 text-base sm:text-lg">Privacy Violations</h3>
              <p className="text-gray-300 text-sm sm:text-base">Your personal images stored on remote servers</p>
            </div>
            <div className="p-4 sm:p-6 bg-red-900/30 rounded-xl border border-red-500/30">
              <div className="text-red-400 mb-3 flex justify-center">
                <FiMoney className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="font-bold mb-2 text-base sm:text-lg">Hidden Costs</h3>
              <p className="text-gray-300 text-sm sm:text-base">Free tools that sell your data for profit</p>
            </div>
          </div>

          <div className="text-4xl sm:text-6xl mb-6 flex justify-center">
            <FiArrowDown className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
          </div>
          
          <div className="p-6 sm:p-8 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl border border-green-500/30">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-green-400">
              ImageBuddy: Edit Safely on Your Device
            </h3>
            <p className="text-lg sm:text-xl text-gray-200">
              Simple image operations without compromising your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 px-4">
            See the <span className="bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] bg-clip-text text-transparent">Magic</span> in Action
          </h2>
          
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-full p-4 sm:p-6 rounded-xl text-left transition-all duration-300 ${
                      activeFeature === index 
                        ? 'bg-gradient-to-r from-[#b7cfe0]/20 to-[#8bb3d9]/20 border-2 border-[#b7cfe0]/50' 
                        : 'bg-[#1a1d20]/50 border border-[#2d3134]/50 hover:bg-[#1a1d20]/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="text-[#b7cfe0] flex-shrink-0">{feature.demo}</div>
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold truncate">{feature.title}</h3>
                        <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#1a1d20]/80 to-[#2d3134]/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-[#2d3134]/50">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-[#b7cfe0]">
                {features[activeFeature]?.demo}
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{features[activeFeature]?.title}</h3>
                <p className="text-gray-300 text-base sm:text-lg">{features[activeFeature]?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof/Testimonials */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-[#1a1d20]/50 to-[#2d3134]/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 px-4">
            Join <span className="bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] bg-clip-text text-transparent">Thousands</span> of Privacy-Conscious Users
          </h2>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 sm:p-8 bg-gradient-to-br from-[#1a1d20]/80 to-[#2d3134]/60 backdrop-blur-xl rounded-2xl border border-[#2d3134]/50 hover:border-[#b7cfe0]/30 transition-all duration-300 group relative overflow-hidden"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Quote decoration */}
                <div className="absolute top-4 right-4 text-4xl text-[#b7cfe0]/20 group-hover:text-[#b7cfe0]/40 transition-colors duration-300">
                  "
                </div>
                
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="text-[#b7cfe0] flex-shrink-0 p-2 bg-gradient-to-br from-[#b7cfe0]/10 to-[#8bb3d9]/10 rounded-full">
                    {testimonial.avatar}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm sm:text-base truncate">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic text-sm sm:text-base relative z-10">"{testimonial.quote}"</p>
                <div className="text-[#b7cfe0] font-bold text-base sm:text-lg flex items-center gap-2 relative z-10">
                  <FiCheckCircle className="w-4 h-4 flex-shrink-0" />
                  {testimonial.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency/Scarcity Section */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-6 sm:p-8 bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl border border-orange-500/30 mb-8">
            <div className="text-orange-400 mb-4 flex justify-center">
              <FiAlertTriangle className="w-12 h-12 sm:w-16 sm:h-16" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4">
              Don't Let Another Day Pass Uploading to Strangers
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 mb-6 px-4">
              Every photo you upload to online tools becomes data for companies to exploit.
            </p>
            <div className="bg-red-900/50 p-4 rounded-xl border border-red-500/50">
              <p className="text-base sm:text-lg font-semibold text-red-300">
                Your photos = Their profit. Take back control of your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#b7cfe0]/10 to-[#8bb3d9]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 px-4">
            Ready to Edit Photos 
            <span className="block bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] bg-clip-text text-transparent">
              Without Privacy Risks?
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto px-4">
            Join thousands who've taken back control of their photos with secure, local editing.
          </p>

          {/* Value Props */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 mb-8 sm:mb-10 text-xs sm:text-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 bg-green-900/30 rounded-lg border border-green-500/30">
              <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 bg-green-900/30 rounded-lg border border-green-500/30">
              <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
              <span>No Sign-up</span>
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 bg-green-900/30 rounded-lg border border-green-500/30">
              <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 bg-green-900/30 rounded-lg border border-green-500/30">
              <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
              <span>Privacy Secure</span>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <button
              onClick={() => router.push('/editor')}
              className="w-full px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] text-[#131516] font-bold text-lg sm:text-2xl rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group animate-glow"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <span className="relative z-10">Edit Photos Safely Now</span>
              <IoShieldCheckmarkOutline className="w-6 h-6 sm:w-8 sm:h-8 relative z-10 group-hover:animate-pulse" />
            </button>
          </div>

          <p className="text-gray-400 mt-4 text-sm sm:text-base px-4">
            Start editing in seconds. No uploads, no accounts, no privacy risks.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 border-t border-[#2d3134]/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#b7cfe0] to-[#8bb3d9] rounded-lg flex items-center justify-center">
                <FiImage className="text-[#131516] w-3 h-3 sm:w-5 sm:h-5" />
              </div>
              <span className="text-base sm:text-lg font-bold">ImageBuddy</span>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm text-center">
              © 2025 ImageBuddy. Made with ❤️ for privacy-conscious users.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(183, 207, 224, 0.3); 
          }
          50% { 
            box-shadow: 0 0 40px rgba(183, 207, 224, 0.6); 
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}