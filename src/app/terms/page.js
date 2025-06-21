'use client';

import { useState } from 'react';
import { FiScale, FiShield, FiUsers, FiFileText, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('overview');
  const router = useRouter();

  const sections = [
    { id: 'overview', title: 'Overview', icon: <FiFileText className="w-4 h-4" /> },
    { id: 'acceptance', title: 'Acceptance of Terms', icon: <FiScale className="w-4 h-4" /> },
    { id: 'service-description', title: 'Service Description', icon: <FiShield className="w-4 h-4" /> },
    { id: 'user-responsibilities', title: 'User Responsibilities', icon: <FiUsers className="w-4 h-4" /> },
    { id: 'limitations', title: 'Limitations & Disclaimers', icon: <FiAlertTriangle className="w-4 h-4" /> },
    { id: 'changes-termination', title: 'Changes & Termination', icon: <FiFileText className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0c] via-[#131516] to-[#1a1d20] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #b7cfe0 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #8bb3d9 0%, transparent 50%)`,
          backgroundSize: '400px 400px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="py-8 border-b border-[#2d3134]/50">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#b7cfe0] hover:text-white transition-colors duration-300 mb-6"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#b7cfe0] to-[#8bb3d9] rounded-xl flex items-center justify-center">
              <FiScale className="w-6 h-6 text-[#131516]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">Terms of Service</h1>
              <p className="text-[#b7cfe0] text-lg">Simple terms for using ImageBuddy</p>
            </div>
          </div>
          
          <p className="text-gray-300 text-lg max-w-3xl">
            These terms govern your use of ImageBuddy, a client-side image editor that processes 
            all images locally on your device. By using our service, you agree to these simple terms.
          </p>
          
          <div className="mt-6 p-4 bg-blue-900/30 rounded-xl border border-blue-500/30">
            <p className="text-blue-400 font-semibold">
              📋 Last Updated: June 2, 2025
            </p>
            <p className="text-blue-400 font-semibold">
              📋 Effective Date: June 2, 2025
            </p>
          </div>
        </div>

        {/* Navigation & Content */}
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8 bg-gradient-to-br from-[#1a1d20]/80 to-[#2d3134]/60 backdrop-blur-xl rounded-xl border border-[#2d3134]/50 p-4">
              <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-[#b7cfe0]/20 to-[#8bb3d9]/20 border border-[#b7cfe0]/30 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-[#2d3134]/50'
                    }`}
                  >
                    {section.icon}
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-[#1a1d20]/80 to-[#2d3134]/60 backdrop-blur-xl rounded-xl border border-[#2d3134]/50 p-6 lg:p-8">
              
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#b7cfe0]">Terms Overview</h2>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      Welcome to ImageBuddy! These Terms of Service govern your use of our client-side 
                      image editing web application. ImageBuddy processes all images locally in your browser - 
                      we never see, store, or have access to your images.
                    </p>
                    
                    <div className="p-4 bg-[#b7cfe0]/10 rounded-lg border border-[#b7cfe0]/30">
                      <h3 className="text-lg font-semibold text-[#b7cfe0] mb-2">Key Points</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• ImageBuddy is a free, browser-based image editing tool</li>
                        <li>• All image processing happens locally on your device</li>
                        <li>• We don't collect, store, or have access to your images</li>
                        <li>• No account creation or registration required</li>
                        <li>• Service provided "as-is" with reasonable effort for reliability</li>
                        <li>• No data collection or tracking whatsoever</li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Who These Terms Apply To</h3>
                    <p>
                      These terms apply to all users of ImageBuddy, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Individual users editing personal images</li>
                      <li>Content creators and professionals</li>
                      <li>Businesses using the service for commercial purposes</li>
                      <li>Educational institutions and students</li>
                    </ul>
                    
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                      <h3 className="text-lg font-semibold text-green-400 mb-2">Privacy-First Approach</h3>
                      <p className="text-sm">
                        ImageBuddy is designed with privacy by default. Your images never leave your device, 
                        and we collect absolutely no personal data. These terms reflect our commitment to your privacy.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'acceptance' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#b7cfe0]">Acceptance of Terms</h2>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <h3 className="text-xl font-semibold text-white">Agreement to Terms</h3>
                    <p>
                      By accessing or using ImageBuddy, you agree to be bound by these Terms of Service and our Privacy Policy. 
                      This agreement is effective immediately upon your first use of the service.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white">Age Requirements</h3>
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <p className="text-sm">
                        You must be at least 13 years old to use ImageBuddy. If you are under 18, you confirm that you have 
                        obtained permission from your parent or legal guardian to use this service.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Capacity to Accept Terms</h3>
                    <p>
                      By using ImageBuddy, you represent and warrant that:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>You have the legal capacity to enter into this agreement</li>
                      <li>Your use of the service complies with all applicable laws and regulations</li>
                      <li>You will not use the service for any unlawful or prohibited purpose</li>
                      <li>All information you provide (if any) is accurate and current</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white">Updates to Terms</h3>
                    <p>
                      We may modify these Terms from time to time. When we make changes:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>We'll update the "Last Modified" date at the top of these Terms</li>
                      <li>For significant changes, we'll provide notice on our website</li>
                      <li>Your continued use of the service constitutes acceptance of the new terms</li>
                      <li>If you don't agree to the new terms, you should stop using the service</li>
                    </ul>
                    
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                      <h3 className="text-lg font-semibold text-green-400 mb-2">No Registration Required</h3>
                      <p className="text-sm">
                        Unlike many online services, ImageBuddy doesn't require account creation or registration. 
                        You accept these terms simply by using the service, and your privacy is protected by 
                        our local processing architecture.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'service-description' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#b7cfe0]">Service Description</h2>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <h3 className="text-xl font-semibold text-white">What ImageBuddy Provides</h3>
                    <p>
                      ImageBuddy is a web-based image editing application that provides the following features:
                    </p>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                        <h4 className="font-semibold text-[#b7cfe0] mb-2">Core Features</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Image resizing with aspect ratio control</li>
                          <li>• Precision cropping tools</li>
                          <li>• Color adjustments (brightness, contrast, saturation)</li>
                          <li>• Image rotation and flipping</li>
                          <li>• File format conversion</li>
                          <li>• Smart compression with quality control</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                        <h4 className="font-semibold text-[#b7cfe0] mb-2">Technical Features</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Local processing (no image uploads)</li>
                          <li>• Multiple image format support</li>
                          <li>• Real-time preview</li>
                          <li>• Undo/redo functionality</li>
                          <li>• Keyboard shortcuts</li>
                          <li>• Mobile-responsive interface</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">How the Service Works</h3>
                    <div className="p-4 bg-[#b7cfe0]/10 rounded-lg border border-[#b7cfe0]/30">
                      <ol className="space-y-2 text-sm">
                        <li><strong>1. Access:</strong> Visit ImageBuddy in your web browser (no downloads or installations required)</li>
                        <li><strong>2. Upload:</strong> Select an image from your device using the file picker</li>
                        <li><strong>3. Edit:</strong> Use our tools to modify your image - all processing happens in your browser</li>
                        <li><strong>4. Download:</strong> Save the edited image directly to your device</li>
                      </ol>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Supported Browsers & Devices</h3>
                    <p>
                      ImageBuddy works on all modern browsers that support HTML5 Canvas and File APIs:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Chrome 60+ (recommended)</li>
                      <li>Firefox 55+</li>
                      <li>Safari 12+</li>
                      <li>Edge 79+</li>
                      <li>Mobile browsers on iOS 12+ and Android 8+</li>
                    </ul>
                    
                    <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                      <h3 className="text-lg font-semibold text-orange-400 mb-2">Service Availability</h3>
                      <p className="text-sm">
                        We strive to maintain high service availability, but ImageBuddy is provided "as-is" without 
                        guarantees of uninterrupted access. We may temporarily suspend the service for maintenance, 
                        updates, or other operational reasons.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'user-responsibilities' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#b7cfe0]">User Responsibilities</h2>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <h3 className="text-xl font-semibold text-white">Acceptable Use</h3>
                    <p>
                      You agree to use ImageBuddy only for lawful purposes and in accordance with these Terms. 
                      You are responsible for ensuring that your use complies with all applicable laws and regulations.
                    </p>
                    
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                      <h3 className="text-lg font-semibold text-green-400 mb-2">Permitted Uses</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Personal image editing and enhancement</li>
                        <li>• Commercial use for business purposes</li>
                        <li>• Educational and research purposes</li>
                        <li>• Content creation and design work</li>
                        <li>• Social media content preparation</li>
                        <li>• Professional photography work</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                      <h3 className="text-lg font-semibold text-red-400 mb-2">Prohibited Uses</h3>
                      <p className="text-sm mb-2">You may not use ImageBuddy to:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Process images that violate any laws or regulations</li>
                        <li>• Edit images for fraudulent, deceptive, or harmful purposes</li>
                        <li>• Create content that infringes on others' intellectual property rights</li>
                        <li>• Generate deepfakes or misleading manipulated content without disclosure</li>
                        <li>• Process images containing illegal content</li>
                        <li>• Attempt to reverse engineer or extract our source code</li>
                        <li>• Use automated tools to abuse the service</li>
                        <li>• Interfere with the service's operation or security</li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Content Responsibility</h3>
                    <p>
                      While we don't have access to your images due to local processing, you are fully responsible for:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Ensuring you have the right to edit and modify any images you process</li>
                      <li>Respecting copyright, trademark, and other intellectual property rights</li>
                      <li>Complying with privacy laws when editing images of other people</li>
                      <li>Not processing images that contain illegal or harmful content</li>
                      <li>Using edited images responsibly and ethically</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white">Browser and Device Security</h3>
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <p className="text-sm">
                        You are responsible for maintaining the security of your device and browser. This includes:
                        keeping your browser updated, using appropriate security software, and ensuring your 
                        device is secure from malware that could potentially access your local files.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Reporting Violations</h3>
                    <p>
                      If you become aware of any misuse of ImageBuddy or violations of these terms, 
                      please contact us at: <span className="text-[#b7cfe0]">ujjwalsharmacloud@gmail.com</span>
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'limitations' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#b7cfe0]">Limitations & Disclaimers</h2>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                      <h3 className="text-lg font-semibold text-orange-400 mb-2">Service Provided "As-Is"</h3>
                      <p className="text-sm">
                        ImageBuddy is provided on an "as-is" and "as-available" basis. We make no warranties, 
                        express or implied, regarding the service's reliability, accuracy, or fitness for any particular purpose.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Limitation of Liability</h3>
                    <p>
                      To the maximum extent permitted by law, ImageBuddy and its developers shall not be liable for:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Any direct, indirect, incidental, or consequential damages</li>
                      <li>Loss of data, including images processed through the service</li>
                      <li>Service interruptions or downtime</li>
                      <li>Browser compatibility issues</li>
                      <li>Any damages resulting from your use or inability to use the service</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white">Technical Limitations</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                        <h4 className="font-semibold text-[#b7cfe0] mb-2">Processing Limits</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Large image files may affect browser performance</li>
                          <li>• Processing speed depends on your device capabilities</li>
                          <li>• Some features may not work on older browsers</li>
                          <li>• Memory limitations may restrict very large images</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                        <h4 className="font-semibold text-[#b7cfe0] mb-2">Browser Dependencies</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Requires JavaScript to be enabled</li>
                          <li>• Dependent on HTML5 Canvas support</li>
                          <li>• File API support required for image loading</li>
                          <li>• Performance varies by browser and device</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Data Backup Responsibility</h3>
                    <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                      <p className="text-sm">
                        <strong>Important:</strong> Always keep backups of your original images. While ImageBuddy 
                        processes images locally and doesn't upload them, you should maintain copies of important 
                        images before editing them.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Third-Party Content</h3>
                    <p>
                      ImageBuddy may include links to third-party websites or services. We are not responsible for:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>The content, privacy policies, or practices of third-party sites</li>
                      <li>Any damages or losses related to your use of third-party services</li>
                      <li>The availability or functionality of external links</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white">Indemnification</h3>
                    <p>
                      You agree to indemnify and hold harmless ImageBuddy and its developers from any claims, 
                      damages, or expenses arising from your use of the service, including your violation of 
                      these terms or infringement of any rights of another party.
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'changes-termination' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#b7cfe0]">Changes & Termination</h2>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <h3 className="text-xl font-semibold text-white">Changes to the Service</h3>
                    <p>
                      We reserve the right to modify, update, or discontinue ImageBuddy at any time, with or without notice. 
                      This may include:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Adding new features or editing tools</li>
                      <li>Removing or modifying existing features</li>
                      <li>Updating the user interface or design</li>
                      <li>Changing technical requirements or browser support</li>
                      <li>Implementing new security measures</li>
                    </ul>
                    
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Notice of Major Changes</h3>
                      <p className="text-sm">
                        For significant changes that materially affect the service, we will provide reasonable 
                        advance notice through our website or other appropriate means.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Changes to Terms</h3>
                    <p>
                      We may revise these Terms of Service from time to time. When we make changes:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>The updated terms will be posted on this page</li>
                      <li>The "Last Modified" date will be updated</li>
                      <li>Significant changes will be highlighted on our website</li>
                      <li>Continued use of the service constitutes acceptance of new terms</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white">Service Termination</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                        <h4 className="font-semibold text-[#b7cfe0] mb-2">Your Right to Stop Using</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• You can stop using ImageBuddy at any time</li>
                          <li>• No account deletion needed (no accounts exist)</li>
                          <li>• No data cleanup required (nothing is stored)</li>
                          <li>• Simply close your browser to end your session</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                        <h4 className="font-semibold text-[#b7cfe0] mb-2">Our Right to Terminate</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• We may discontinue the service</li>
                          <li>• We may block access for terms violations</li>
                          <li>• We may suspend service for maintenance</li>
                          <li>• Notice will be provided when possible</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Effect of Termination</h3>
                    <p>
                      Upon termination of your access to ImageBuddy:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Your right to use the service ends immediately</li>
                      <li>These terms remain in effect for previous use</li>
                      <li>No refunds are applicable (service is free)</li>
                      <li>Local data on your device remains yours</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white">Governing Law</h3>
                    <div className="p-4 bg-[#b7cfe0]/10 rounded-lg border border-[#b7cfe0]/30">
                      <p className="text-sm">
                        These Terms are governed by and construed in accordance with applicable laws. 
                        Any disputes will be resolved through binding arbitration or in courts of competent jurisdiction.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Contact for Legal Questions</h3>
                    <p>
                      For questions about these Terms of Service, please contact us at:
                    </p>
                    <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                      <ul className="space-y-1 text-sm">
                        <li><strong>Email:</strong> <span className="text-[#b7cfe0]">ujjwalsharmacloud@gmail.com</span></li>
                        <li><strong>Subject Line:</strong> Terms of Service Inquiry</li>
                        <li><strong>Response Time:</strong> Within 5-7 business days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
