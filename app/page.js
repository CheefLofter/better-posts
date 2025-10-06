'use client';

import domtoimage from 'dom-to-image';
import { useRef } from 'react';

export default function Home() {
  const frameRef = useRef(null);

  const handleDownload = async () => {
    if (frameRef.current) {
      try {
        // converting the frame to an image blob
        const blob = await domtoimage.toBlob(frameRef.current, {
          quality: 1,
          width: 1024,
          height: 1024,
          style: {
            transform: 'scale(2)', // scale it up for better quality
            transformOrigin: 'top left',
            width: '1024px',
            height: '1024px'
          }
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'framed-image.png';
        link.href = url;
        link.click();

        // cleanup
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
      }
    }
  };

  return (
    <div className="flex h-screen flex-row items-center justify-center gap-8 bg-gray-700">
      {/* this div gets rendered at dounload */}
      {/* your image */}
      <div ref={frameRef} className="relative h-[512px] w-[512px] overflow-hidden">

        <img
          src="/backgrounds/background-2.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover shadow-6xl rounded-3xl"
        />
        {/* your image */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-12">
          <img
            src="/image.png"
            alt="Top image"
            className="max-w-full max-h-full object-contain rounded-3xl"
            style={{
              filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.8))',
              imageRendering: 'crisp-edges'
            }}
          />
        </div>
      </div>
      <div className="w-[40%] flex justify-center">
        {/* TODO: add editing controls here */}
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          Download Image
        </button>
      </div>
    </div>
  );
}