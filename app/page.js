'use client';

import domtoimage from 'dom-to-image';
import { useRef, useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';

export default function Home() {
  const frameRef = useRef(null);
  const fileInputRef = useRef(null);
  const downloadInputRef = useRef(null);

  // State to store the uploaded image URL
  const [uploadedImage, setUploadedImage] = useState('/placeholder-white.png');
  const [selectedBackground, setSelectedBackground] = useState('/placeholder-white.png');
  const [height, setHeight] = useState(512);
  const [width, setWidth] = useState(512);

  // Check if the device is mobile
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownload = async () => {
    if (frameRef.current) {
      try {
        const blob = await domtoimage.toBlob(frameRef.current, {
          quality: 1,
          width: width * 2,
          height: height * 2,
          style: {
            transform: 'scale(2)',
            transformOrigin: 'top left',
            width: `${width * 2}px`,
            height: `${height * 2}px`,
          }
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'framed-image.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    } else {
      alert('Please upload a valid image file');
    }
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const backgroundUrl = URL.createObjectURL(file);
      setSelectedBackground(backgroundUrl);
    } else {
      alert('Please upload a valid image file');
    }
  };

  // GitHub Link Component - CENTERED AND ENLARGED
  const GitHubLink = () => (
    <a
      href="https://github.com/your-username"
      target="_blank"
      rel="noopener noreferrer"

      aria-label="View source on GitHub"
    >
      <div className="flex flex-col items-center">
        <FaGithub className="text-gray-300 hover:text-white" size={48} />
        <span className="text-lg font-medium text-gray-300 hover:text-white mb-2">github</span>
      </div>
    </a>
  );

  // Mobile view
  if (isMobileView) {
    return (
      <div className='bg-gray-700 h-screen'>
        <div className="flex h-[90vh] items-center justify-center bg-gray-700 relative">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center mx-4">
          <div className="bg-gray-100 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Mobile Version Coming Soon</h1>
          <p className="text-gray-600 mb-6">
            This application is currently under development for mobile devices.
            Please use a desktop computer for now.
          </p>
        </div>


      </div><GitHubLink /></div>
    );
  }

  // Desktop view
  return (
    <div className='bg-gray-700'>
      <div className="flex h-[90vh] flex-row items-center justify-center gap-6 bg-gray-700 relative">
      {/* Frame to be downloaded */}
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-3xl"
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <img
          src={selectedBackground}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 z-10 flex items-center justify-center p-12">
          <img
            src={uploadedImage}
            alt="Top image"
            className="max-w-full max-h-full object-contain"
            style={{
              filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.8))',
              imageRendering: 'crisp-edges'
            }} />
        </div>
      </div>

      <div className="w-[40%] flex flex-col gap-4 items-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden" />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium w-64"
        >
          Upload Image
        </button>

        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium w-64"
        >
          Download Image
        </button>

        <div className="mt-4">
          <p className="text-white mb-2 text-center">Select Background:</p>
          <div className="flex gap-2 justify-center">
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

          <input
            ref={downloadInputRef}
            type="file"
            accept="image/*"
            onChange={handleBackgroundUpload}
            className="hidden" />
          <button
            onClick={() => downloadInputRef.current?.click()}
            className="px-6 py-3 m-3.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium w-64"
          >
            Custom Background
          </button>

          <p className="text-white mb-2 text-center">Select Aspect Ratio</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => { setHeight(512); setWidth(512); }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            >
              1:1
            </button>
            <button
              onClick={() => { setHeight(340); setWidth(600); }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            >
              16:9
            </button>
            <button
              onClick={() => { setHeight(600); setWidth(340); }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            >
              9:16
            </button>
          </div>
        </div>
      </div>


    </div><GitHubLink /></div>
  );
}