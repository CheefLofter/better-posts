'use client';

import domtoimage from 'dom-to-image';
import { useRef, useState } from 'react';

export default function Home() {
  const frameRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // State to store the uploaded image URL
  const [uploadedImage, setUploadedImage] = useState('/image.png');
  const [selectedBackground, setSelectedBackground] = useState('/backgrounds/background-2.jpg');

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

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // Create object URL for the uploaded file
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    } else {
      alert('Please upload a valid image file');
    }
  };

  return (
    <div className="flex h-screen flex-row items-center justify-center gap-8 bg-gray-700">
      {/* this div gets rendered at download */}
      <div ref={frameRef} className="relative h-[512px] w-[512px] overflow-hidden">
        {/* Background image */}
        <img
          src={selectedBackground}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover shadow-6xl rounded-3xl"
        />
        
        {/* User's uploaded image */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-12">
          <img
            src={uploadedImage}
            alt="Top image"
            className="max-w-full max-h-full object-contain rounded-3xl"
            style={{
              filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.8))',
              imageRendering: 'crisp-edges'
            }}
          />
        </div>
      </div>

      <div className="w-[40%] flex flex-col gap-4 items-center">
        {/* File input (hidden) */}
        <input 
          ref={fileInputRef} 
          type="file" 
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden" 
        />
        
        {/* Upload button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium w-64"
        >
          Upload Image
        </button>

        {/* Download button */}
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium w-64"
        >
          Download Image
        </button>

        {/* Optional: Background selector */}
        <div className="mt-4">
          <p className="text-white mb-2 text-center">Select Background:</p>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedBackground('/backgrounds/background-1.jpg')}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            >
              BG 1
            </button>
            <button
              onClick={() => setSelectedBackground('/backgrounds/background-2.jpg')}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            >
              BG 2
            </button>
            <button
              onClick={() => setSelectedBackground('/backgrounds/background-3.jpg')}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            >
              BG 3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}