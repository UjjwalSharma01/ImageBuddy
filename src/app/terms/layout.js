export const metadata = {
  title: 'Terms of Service | ImageBuddy - Image Editor Terms',
  description: 'Terms of service for ImageBuddy image editor. Simple and clear terms for using our free online image editing tools safely and legally.',
  keywords: [
    'terms of service',
    'terms and conditions', 
    'legal terms',
    'image editor terms',
    'user agreement',
    'service terms'
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://imagebuddy.app/terms',
  },
  openGraph: {
    title: 'Terms of Service | ImageBuddy',
    description: 'Simple and clear terms for using ImageBuddy image editor.',
    url: 'https://imagebuddy.app/terms',
  },
};

export default function TermsLayout({ children }) {
  return children;
}
