'use client';

import Link from 'next/link';
import Navbar from './Navbar';

export default function HeroSection() {
  return (
    <div className="relative bg-[#0F1420] h-screen">
      {/* Navbar on top */}
      <Navbar />

      
      <section className="relative flex items-center justify-center px-4 py-12 md:py-20 h-screen">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1420] to-[#0A0E17]"></div>

        
        <div className="relative z-10 w-full max-w-4xl mx-auto p-6 sm:p-8 md:p-12 rounded-3xl bg-[#121825] border border-[#1e293b] shadow-xl backdrop-blur-sm">
         
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-[#0f1420]/10 to-transparent pointer-events-none"></div>

          
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight px-2">
              Turn Any Image Into a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Perfect Post
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl px-2">
              Resize, customize backgrounds, and download ready-to-post images in seconds. No design skills needed.
            </p>

            <Link href="/workshop" className="group mt-2">
              <div className="px-6 py-3 w-full sm:w-auto sm:px-8 sm:py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                Start Creating Free →
              </div>
            </Link>
          </div>
        </div>

        {/* Decorative Glows (responsive positioning) */}
        <div className="absolute -bottom-16 left-1/2 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl transform -translate-x-1/2"></div>
        <div className="absolute -top-16 left-1/2 w-64 h-64 bg-purple-500 opacity-5 rounded-full blur-3xl transform -translate-x-1/2"></div>
      </section>
    </div>
  );
}