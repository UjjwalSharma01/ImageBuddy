import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./components/ToastProvider";

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
  title: "ImageBuddy - Premium Image Editor",
  description: "Professional-grade image editing with secure on-device processing. Transform, enhance, and perfect your images with our advanced tools.",
  keywords: "image editor, photo editing, image processing, online editor, premium tools",
  authors: [{ name: "ImageBuddy Team" }],
  creator: "ImageBuddy",
  publisher: "ImageBuddy",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#131516" />
      </head>
      <body className={`${inter.className} antialiased bg-[#0a0b0c] text-white`} suppressHydrationWarning={true}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
