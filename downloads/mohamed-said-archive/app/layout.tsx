import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Playfair_Display } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Mohamed Said Digital Historical Archive | Neural Intelligence",
  description: "AI Historical Archive powered by AWS S3 + RAG + OCR. Preserving East African History.",
  openGraph: {
    title: "Mohamed Said Digital Historical Archive",
    description: "History speaking through evidence and rare documents stored in AWS.",
    type: "website",
    url: "https://mohamedsaidarchive.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
