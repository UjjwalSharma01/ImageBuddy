export const metadata = {
  title: 'Privacy Policy | ImageBuddy - Secure Image Editing',
  description: 'ImageBuddy privacy policy. Learn how we protect your data with on-device processing and zero data collection. Your images never leave your browser.',
  keywords: [
    'privacy policy',
    'data protection',
    'secure image editing',
    'local processing',
    'no data collection',
    'GDPR compliant',
    'privacy first'
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://imagebuddy.app/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | ImageBuddy',
    description: 'Learn how ImageBuddy protects your privacy with local image processing.',
    url: 'https://imagebuddy.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0c] via-[#131516] to-[#1a1d20] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#b7cfe0] to-[#8bb3d9] bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#b7cfe0]">Our Privacy Commitment</h2>
            <p className="text-gray-300 mb-4">
              ImageBuddy is built with privacy as our core principle. We process all images locally in your browser, 
              ensuring your photos never leave your device.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#b7cfe0]">What We Don't Collect</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Your images or photos</li>
              <li>Personal information</li>
              <li>Email addresses</li>
              <li>Account data</li>
              <li>Location data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#b7cfe0]">What We May Collect</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Anonymous usage statistics (page visits, general location country)</li>
              <li>Technical information for performance optimization</li>
              <li>Error logs to improve service reliability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#b7cfe0]">Local Processing</h2>
            <p className="text-gray-300 mb-4">
              All image editing operations happen locally in your browser using modern web technologies. 
              Your images are never uploaded to our servers or any third-party services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#b7cfe0]">Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at privacy@imagebuddy.app
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
