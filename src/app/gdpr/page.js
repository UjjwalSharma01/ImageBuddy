'use client';

import { useState } from 'react';
import { FiShield, FiGlobe, FiUser, FiDatabase, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export const metadata = {
  title: 'GDPR Compliance - ImageBuddy',
  description: 'Learn about ImageBuddy\'s GDPR compliance. Local processing ensures no personal data transfer.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function GDPRCompliance() {
  const [activeSection, setActiveSection] = useState('overview');
  const router = useRouter();

  const sections = [
    { id: 'overview', title: 'GDPR Overview', icon: <FiShield className="w-4 h-4" /> },
    { id: 'data-protection', title: 'Data Protection', icon: <FiDatabase className="w-4 h-4" /> },
    { id: 'user-rights', title: 'Your GDPR Rights', icon: <FiUser className="w-4 h-4" /> },
    { id: 'legal-basis', title: 'Legal Basis', icon: <FiGlobe className="w-4 h-4" /> },
    { id: 'compliance', title: 'Compliance Measures', icon: <FiCheckCircle className="w-4 h-4" /> }
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
              <FiShield className="w-6 h-6 text-[#131516]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">GDPR Compliance</h1>
              <p className="text-[#b7cfe0] text-lg">European data protection compliance</p>
            </div>
          </div>
          
          <p className="text-gray-300 text-lg max-w-3xl">
            ImageBuddy is designed with GDPR compliance at its core. Our local processing architecture 
            ensures maximum privacy protection and minimal data collection in accordance with EU data protection laws.
          </p>
          
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-green-900/30 rounded-xl border border-green-500/30">
              <FiCheckCircle className="w-6 h-6 text-green-400 mb-2" />
              <h3 className="font-semibold text-green-400 mb-1">Privacy by Design</h3>
              <p className="text-sm text-green-300">Built with GDPR principles from the ground up</p>
            </div>
            <div className="p-4 bg-green-900/30 rounded-xl border border-green-500/30">
              <FiCheckCircle className="w-6 h-6 text-green-400 mb-2" />
              <h3 className="font-semibold text-green-400 mb-1">Minimal Data Collection</h3>
              <p className="text-sm text-green-300">Only anonymous analytics, no personal data</p>
            </div>
            <div className="p-4 bg-green-900/30 rounded-xl border border-green-500/30">
              <FiCheckCircle className="w-6 h-6 text-green-400 mb-2" />
              <h3 className="font-semibold text-green-400 mb-1">Local Processing</h3>
              <p className="text-sm text-green-300">Your images never leave your device</p>
            </div>
          </div>
        </div>

        {/* Navigation & Content */}
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8 bg-gradient-to-br from-[#1a1d20]/80 to-[#2d3134]/60 backdrop-blur-xl rounded-xl border border-[#2d3134]/50 p-4">
              <h3 className="text-lg font-semibold mb-4">Compliance Topics</h3>
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
                  <h2 className="text-2xl font-bold text-[#b7cfe0]">GDPR Compliance Overview</h2>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      The General Data Protection Regulation (GDPR) is a comprehensive data protection law that 
                      applies to all companies processing personal data of EU residents. ImageBuddy has been 
                      designed from the ground up to comply with GDPR requirements.
                    </p>
                    
                    <div className="p-4 bg-[#b7cfe0]/10 rounded-lg border border-[#b7cfe0]/30">
                      <h3 className="text-lg font-semibold text-[#b7cfe0] mb-2">Why ImageBuddy is GDPR-Compliant by Design</h3>
                      <ul className="space-y-2 text-sm">
                        <li><strong>Local Processing:</strong> Your images are processed entirely on your device, never uploaded to our servers</li>
                        <li><strong>No Personal Data:</strong> We don't collect names, emails, IP addresses, or any personally identifiable information</li>
                        <li><strong>Anonymous Analytics:</strong> Only aggregated, anonymous usage statistics are collected</li>
                        <li><strong>No Account Required:</strong> No registration means no personal data to protect</li>
                        <li><strong>Transparent Practices:</strong> Clear privacy policy and data practices</li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">GDPR Principles We Follow</h3>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                        <h4 className="font-semibold text-[#b7cfe0] mb-2">Lawfulness, Fairness & Transparency</h4>
                        <p className="text-sm">We process data lawfully, fairly, and in a transparent manner. Our privacy policy clearly explains what data we collect and why.</p>
                      </div>
                      <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                        <h4 className="font-semibold text-[#b7cfe0] mb-2">Purpose Limitation</h4>
                        <p className="text-sm">Data is collected only for specific, explicit, and legitimate purposes - improving our service through anonymous analytics.</p>
                      </div>
                      <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                        <h4 className="font-semibold text-[#b7cfe0] mb-2">Data Minimization</h4>
                        <p className="text-sm">We collect only the minimum data necessary - anonymous usage statistics without personal identification.</p>
                      </div>
                      <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                        <h4 className="font-semibold text-[#b7cfe0] mb-2">Storage Limitation</h4>
                        <p className="text-sm">Anonymous data is retained only as long as necessary (maximum 24 months) and then automatically deleted.</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                      <h3 className="text-lg font-semibold text-green-400 mb-2">Data Controller Information</h3>
                      <div className="text-sm space-y-1">
                        <p><strong>Entity:</strong> ImageBuddy</p>
                        <p><strong>Contact:</strong> privacy@imagebuddy.app</p>
                        <p><strong>Purpose:</strong> Providing privacy-focused image editing services</p>
                        <p><strong>Data Protection Officer:</strong> Available upon request</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'data-protection' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#b7cfe0]">Data Protection Measures</h2>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <h3 className="text-xl font-semibold text-white">Technical Safeguards</h3>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                        <h4 className="font-semibold text-green-400 mb-2">Client-Side Processing</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• All image processing happens in your browser</li>
                          <li>• No server-side image storage or processing</li>
                          <li>• Images never transmitted over the internet</li>
                          <li>• Complete user control over their data</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                        <h4 className="font-semibold text-blue-400 mb-2">Data Encryption</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• HTTPS encryption for all web traffic</li>
                          <li>• Secure hosting infrastructure</li>
                          <li>• Anonymous data transmission only</li>
                          <li>• No unencrypted data collection</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Organizational Measures</h3>
                    
                    <div className="p-4 bg-[#b7cfe0]/10 rounded-lg border border-[#b7cfe0]/30">
                      <h4 className="font-semibold text-[#b7cfe0] mb-2">Privacy by Design Implementation</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <strong>Architecture Level:</strong>
                          <ul className="ml-4 mt-1 space-y-1">
                            <li>- Client-side processing eliminates data collection risks</li>
                            <li>- No image upload endpoints in our infrastructure</li>
                            <li>- No personal data storage systems implemented</li>
                          </ul>
                        </div>
                        <div>
                          <strong>Development Process:</strong>
                          <ul className="ml-4 mt-1 space-y-1">
                            <li>- Privacy impact assessments for new features</li>
                            <li>- Regular security audits and code reviews</li>
                            <li>- GDPR considerations in all development decisions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Data Breach Prevention</h3>
                    <p>
                      Our architecture provides inherent protection against data breaches:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>No Image Data to Breach:</strong> Since images are processed locally, there's no central repository to compromise</li>
                      <li><strong>Minimal Attack Surface:</strong> Only anonymous analytics data exists on our servers</li>
                      <li><strong>Rapid Detection:</strong> Monitoring systems alert us to any unusual activity</li>
                      <li><strong>Incident Response:</strong> Documented procedures for handling any security incidents</li>
                    </ul>
                    
                    <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                      <h3 className="text-lg font-semibold text-orange-400 mb-2">Data Breach Notification</h3>
                      <p className="text-sm">
                        In the unlikely event of a data breach affecting any anonymous analytics data, 
                        we will notify relevant supervisory authorities within 72 hours as required by GDPR Article 33. 
                        Since we don't collect personal data, individual notifications would not be applicable.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Third-Party Data Processors</h3>
                    <p>
                      We work only with GDPR-compliant service providers:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Analytics Provider:</strong> Privacy-focused analytics with data processing agreements</li>
                      <li><strong>Hosting Provider:</strong> EU-based or adequacy decision-covered hosting with appropriate safeguards</li>
                      <li><strong>CDN Provider:</strong> Content delivery with strict data protection terms</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeSection === 'user-rights' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#b7cfe0]">Your GDPR Rights</h2>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      Under GDPR, you have specific rights regarding your personal data. Due to ImageBuddy's 
                      privacy-focused architecture, many of these rights are automatically protected.
                    </p>
                    
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Rights Automatically Protected</h3>
                        
                        <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                          <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                            <FiCheckCircle className="w-4 h-4" />
                            Right to Data Portability (Article 20)
                          </h4>
                          <p className="text-sm">Your images never leave your device, so you maintain complete portability and control over your data at all times.</p>
                        </div>
                        
                        <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                          <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                            <FiCheckCircle className="w-4 h-4" />
                            Right of Access (Article 15)
                          </h4>
                          <p className="text-sm">Since we don't collect personal data about you, there's no personal data for us to provide access to.</p>
                        </div>
                        
                        <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                          <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                            <FiCheckCircle className="w-4 h-4" />
                            Right to Erasure (Article 17)
                          </h4>
                          <p className="text-sm">Your images are automatically "erased" from our perspective since they never reach our servers.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Rights You Can Exercise</h3>
                        
                        <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                          <h4 className="font-semibold text-blue-400 mb-2">Right to Object (Article 21)</h4>
                          <p className="text-sm">You can object to the processing of anonymous analytics data. Contact us to opt out completely.</p>
                        </div>
                        
                        <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                          <h4 className="font-semibold text-blue-400 mb-2">Right to Withdraw Consent</h4>
                          <p className="text-sm">You can withdraw consent for optional analytics tracking at any time through your browser settings or by contacting us.</p>
                        </div>
                        
                        <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                          <h4 className="font-semibold text-blue-400 mb-2">Right to Lodge a Complaint</h4>
                          <p className="text-sm">You have the right to file a complaint with your local Data Protection Authority if you believe we've violated GDPR.</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">How to Exercise Your Rights</h3>
                    
                    <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                      <h4 className="font-semibold text-[#b7cfe0] mb-3">Contact Information for GDPR Requests</h4>
                      <div className="grid gap-4 md:grid-cols-2 text-sm">
                        <div>
                          <p><strong>Email:</strong> gdpr@imagebuddy.app</p>
                          <p><strong>Subject Line:</strong> GDPR Rights Request</p>
                          <p><strong>Response Time:</strong> Within 30 days (as required by law)</p>
                        </div>
                        <div>
                          <p><strong>Required Information:</strong></p>
                          <ul className="ml-4 mt-1 space-y-1">
                            <li>- Specific right you want to exercise</li>
                            <li>- Any relevant details about your request</li>
                            <li>- Verification of your identity (if needed)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">No Fees for Rights Requests</h3>
                    <p>
                      We will not charge you for exercising your GDPR rights unless your requests are:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Manifestly unfounded or excessive</li>
                      <li>Repetitive in nature</li>
                      <li>Clearly intended to cause disruption</li>
                    </ul>
                    
                    <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                      <h3 className="text-lg font-semibold text-purple-400 mb-2">Supervisory Authority Contact</h3>
                      <p className="text-sm">
                        If you're not satisfied with how we handle your GDPR request, you can contact your local 
                        Data Protection Authority. For EU residents, you can find your local authority at: 
                        <span className="text-purple-300"> edpb.europa.eu</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'legal-basis' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#b7cfe0]">Legal Basis for Processing</h2>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      Under GDPR Article 6, we must have a lawful basis for processing any personal data. 
                      ImageBuddy's minimal data collection is based on the following legal grounds:
                    </p>
                    
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="p-4 bg-[#b7cfe0]/10 rounded-lg border border-[#b7cfe0]/30">
                        <h3 className="text-lg font-semibold text-[#b7cfe0] mb-2">Legitimate Interest (Article 6(1)(f))</h3>
                        <div className="space-y-2 text-sm">
                          <p><strong>Purpose:</strong> Improving service quality and technical functionality</p>
                          <p><strong>Data Processed:</strong> Anonymous usage statistics, performance metrics</p>
                          <p><strong>Balancing Test:</strong> Our legitimate interest in service improvement is balanced against minimal privacy impact</p>
                          <p><strong>Safeguards:</strong> Data is anonymized and aggregated, with no personal identification possible</p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                        <h3 className="text-lg font-semibold text-green-400 mb-2">Consent (Article 6(1)(a))</h3>
                        <div className="space-y-2 text-sm">
                          <p><strong>Purpose:</strong> Optional enhanced analytics and feedback</p>
                          <p><strong>Data Processed:</strong> Additional usage patterns (if explicitly consented)</p>
                          <p><strong>Characteristics:</strong> Freely given, specific, informed, and unambiguous</p>
                          <p><strong>Withdrawal:</strong> Can be withdrawn at any time without affecting service access</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Legitimate Interest Assessment</h3>
                    
                    <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                      <h4 className="font-semibold text-white mb-3">Three-Part Test for Legitimate Interest</h4>
                      
                      <div className="space-y-3 text-sm">
                        <div>
                          <strong className="text-[#b7cfe0]">1. Purpose Test - Is there a legitimate interest?</strong>
                          <p className="mt-1">✅ Yes - Improving service quality, fixing bugs, and understanding user needs are legitimate business interests</p>
                        </div>
                        
                        <div>
                          <strong className="text-[#b7cfe0]">2. Necessity Test - Is processing necessary?</strong>
                          <p className="mt-1">✅ Yes - Anonymous analytics are necessary to identify performance issues and popular features for improvement</p>
                        </div>
                        
                        <div>
                          <strong className="text-[#b7cfe0]">3. Balancing Test - Do fundamental rights override legitimate interests?</strong>
                          <p className="mt-1">✅ No - Anonymous, aggregated data collection has minimal privacy impact and doesn't override user rights</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Special Categories of Data</h3>
                    <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                      <p className="text-sm">
                        <strong>Important:</strong> ImageBuddy processes images locally on your device. We have no access to image content, 
                        so we cannot determine if images contain special category data (biometric, health, etc.). Users are responsible 
                        for ensuring their use complies with applicable laws regarding sensitive data.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Cross-Border Data Transfers</h3>
                    <p>
                      Since ImageBuddy processes images locally and collects only anonymous data:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Image Data:</strong> Never transferred - remains on your local device</li>
                      <li><strong>Anonymous Analytics:</strong> May be transferred to secure, GDPR-compliant processors</li>
                      <li><strong>Adequacy Decisions:</strong> We work only with providers in adequate countries or with appropriate safeguards</li>
                      <li><strong>Standard Contractual Clauses:</strong> Used where necessary for data processor agreements</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white">Data Processing Records</h3>
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <p className="text-sm">
                        We maintain records of processing activities as required by GDPR Article 30. 
                        These records are available to supervisory authorities upon request and include 
                        details about our limited data processing activities, retention periods, and security measures.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'compliance' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#b7cfe0]">Compliance Measures</h2>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <h3 className="text-xl font-semibold text-white">Ongoing Compliance Activities</h3>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                        <h4 className="font-semibold text-green-400 mb-2">Regular Audits</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Quarterly privacy impact assessments</li>
                          <li>• Annual compliance reviews</li>
                          <li>• Security penetration testing</li>
                          <li>• Code review for privacy implications</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                        <h4 className="font-semibold text-blue-400 mb-2">Staff Training</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• GDPR awareness training for all team members</li>
                          <li>• Privacy-by-design training for developers</li>
                          <li>• Incident response procedures</li>
                          <li>• Regular updates on regulatory changes</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Data Protection Impact Assessments (DPIA)</h3>
                    <div className="p-4 bg-[#b7cfe0]/10 rounded-lg border border-[#b7cfe0]/30">
                      <h4 className="font-semibold text-[#b7cfe0] mb-2">Current DPIA Status</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Assessment Date:</strong> December 2024</p>
                        <p><strong>Risk Level:</strong> Low - Due to local processing and minimal data collection</p>
                        <p><strong>Key Findings:</strong></p>
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>- No high-risk processing identified</li>
                          <li>- Privacy-by-design architecture provides strong protection</li>
                          <li>- Anonymous analytics pose minimal privacy risk</li>
                          <li>- No special category data processing by our systems</li>
                        </ul>
                        <p><strong>Next Review:</strong> December 2025</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Privacy Notice Transparency</h3>
                    <p>
                      Our privacy notice meets GDPR transparency requirements by providing:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Clear, plain language explanations of our practices</li>
                      <li>Specific details about what data we collect (and don't collect)</li>
                      <li>Purposes and legal basis for any processing</li>
                      <li>Information about your rights and how to exercise them</li>
                      <li>Contact details for privacy-related inquiries</li>
                      <li>Details about data retention and deletion</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white">Accountability Measures</h3>
                    
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                        <h4 className="font-semibold text-white mb-2">Documentation</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Privacy policy and terms of service</li>
                          <li>• Data processing records</li>
                          <li>• Privacy impact assessments</li>
                          <li>• Security incident logs</li>
                          <li>• Training records</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-[#1a1d20]/50 rounded-lg border border-[#2d3134]/30">
                        <h4 className="font-semibold text-white mb-2">Technical Measures</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Privacy-by-design architecture</li>
                          <li>• Data minimization by default</li>
                          <li>• Encryption in transit and at rest</li>
                          <li>• Regular security updates</li>
                          <li>• Access controls and monitoring</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Regulatory Cooperation</h3>
                    <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                      <p className="text-sm">
                        We maintain open lines of communication with relevant supervisory authorities and 
                        are committed to cooperating fully with any regulatory inquiries. Our privacy-first 
                        approach and minimal data collection significantly reduce regulatory risk.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">Continuous Improvement</h3>
                    <p>
                      Our GDPR compliance is an ongoing process that includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Regular monitoring of regulatory developments</li>
                      <li>Updating practices based on new guidance from authorities</li>
                      <li>Incorporating privacy feedback from users</li>
                      <li>Enhancing technical privacy protections</li>
                      <li>Maintaining best practices in data protection</li>
                    </ul>
                    
                    <div className="p-4 bg-[#b7cfe0]/10 rounded-lg border border-[#b7cfe0]/30">
                      <h3 className="text-lg font-semibold text-[#b7cfe0] mb-2">Questions or Concerns?</h3>
                      <p className="text-sm">
                        If you have questions about our GDPR compliance or want to exercise your rights, 
                        contact our privacy team at <strong>gdpr@imagebuddy.app</strong>. We're committed to 
                        transparency and will respond to all inquiries within the required timeframes.
                      </p>
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
