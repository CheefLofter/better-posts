'use client';

import Image from 'next/image';

export default function DemoSection() {
  return (
    <section className="py-16 px-4 bg-[#0F1420]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            See the Magic Happen
          </h2>
          <p className="mt-2 text-gray-300 max-w-xl mx-auto">
            Upload any image — we’ll resize, frame, and enhance it for social media.
          </p>
        </div>

        {/* Demo Cards Container */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          {/* Before Card */}
          <div className="w-full md:w-1/2 p-4 rounded-2xl bg-[#121825] border border-[#1e293b] shadow-lg">
            <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden">
              <Image
                src="/placeholder-before.jpg" // ← Replace with your actual before image
                alt="Before: Original Image"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs font-medium">
                Before
              </div>
            </div>
          </div>

          {/* Arrow Separator (Desktop Only) */}
          <div className="hidden md:block text-2xl text-gray-400 font-bold">→</div>

          {/* After Card */}
          <div className="w-full md:w-1/2 p-4 rounded-2xl bg-[#121825] border border-[#1e293b] shadow-lg">
            <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden">
              <Image
                src="/placeholder-after.jpg" // ← Replace with your actual after image
                alt="After: Enhanced Post"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                After
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}