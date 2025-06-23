import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./components/ToastProvider";
import { VisitorProvider } from "./context/VisitorContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    default: "ImageBuddy - Free Online Image Editor | Secure Photo Editing",
    template: "%s | ImageBuddy"
  },
  description: "Professional-grade image editing with secure on-device processing. Resize, crop, compress, and enhance your photos for free. No uploads, no account required. Privacy-first image editor.",
  keywords: [
    "image editor",
    "photo editing", 
    "free image editor",
    "online photo editor",
    "secure image editing",
    "privacy image editor",
    "crop image online",
    "resize image",
    "compress image",
    "photo compression",
    "image optimization",
    "canvas editor",
    "image filters",
    "photo enhancer",
    "picture editor",
    "image manipulation",
    "web image editor",
    "professional photo editing",
    "bulk image processing"
  ],
  authors: [{ name: "ImageBuddy Team", url: "https://imagebuddy.app" }],
  creator: "ImageBuddy",
  publisher: "ImageBuddy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://imagebuddy.app'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://imagebuddy.app',
    title: 'ImageBuddy - Free Online Image Editor | Secure Photo Editing',
    description: 'Professional-grade image editing with secure on-device processing. Resize, crop, compress, and enhance your photos for free. No uploads, no account required.',
    siteName: 'ImageBuddy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ImageBuddy - Professional Image Editor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImageBuddy - Free Online Image Editor',
    description: 'Professional-grade image editing with secure on-device processing. Edit photos safely in your browser.',
    images: ['/og-image.jpg'],
    creator: '@imagebuddy',
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  },
  category: 'Technology',
  classification: 'Image Editing Software',
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#b7cfe0' },
    { media: '(prefers-color-scheme: dark)', color: '#131516' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ImageBuddy" />
        <meta name="application-name" content="ImageBuddy" />
        <meta name="msapplication-TileColor" content="#131516" />
        <meta name="theme-color" content="#131516" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Schema.org markup for Google+ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ImageBuddy",
              "description": "Professional-grade image editing with secure on-device processing. Resize, crop, compress, and enhance your photos for free.",
              "url": "https://imagebuddy.app",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "permissions": "none",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "ImageBuddy Team"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1247"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-[#0a0b0c] text-white`} suppressHydrationWarning={true}>
        <VisitorProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </VisitorProvider>
      </body>
    </html>
  );
}
