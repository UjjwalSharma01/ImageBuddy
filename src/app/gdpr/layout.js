export const metadata = {
  title: 'GDPR Compliance | ImageBuddy - Data Protection',
  description: 'Learn about ImageBuddy\'s GDPR compliance. Local processing ensures no personal data transfer. Full transparency on data protection practices.',
  keywords: [
    'GDPR compliance',
    'data protection',
    'privacy rights',
    'GDPR ImageBuddy',
    'data security',
    'EU privacy',
    'local processing'
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://imagebuddy.app/gdpr',
  },
  openGraph: {
    title: 'GDPR Compliance | ImageBuddy',
    description: 'Learn about ImageBuddy\'s GDPR compliance and data protection practices.',
    url: 'https://imagebuddy.app/gdpr',
  },
};

export default function GDPRLayout({ children }) {
  return children;
}
