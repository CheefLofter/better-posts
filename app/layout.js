import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Better Posts",
  description: "Create beautiful framed images",
};

export default function RootLayout({ children }) {
  return (
    <html>
      
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}