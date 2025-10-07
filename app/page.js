'use client';

import domtoimage from 'dom-to-image';
import { useRef, useState, useEffect } from 'react';
import { FaGithub, FaImage, FaDownload, FaUpload } from 'react-icons/fa';

import Navbar from '../components/Navbar';

export default function Home() {
  const frameRef = useRef(null);
  const fileInputRef = useRef(null);
  const downloadInputRef = useRef(null);
  
  const [uploadedImage, setUploadedImage] = useState('/placeholder-white.png');
  const [selectedBackground, setSelectedBackground] = useState('/placeholder-white.png');
  const [height, setHeight] = useState(512);
  const [width, setWidth] = useState(512);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 768);
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

  

  // Mobile view
  if (isMobileView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="bg-slate-700/50 border-2 border-dashed border-slate-600 rounded-xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-3">Mobile Support Coming Soon</h1>
            <p className="text-slate-400 leading-relaxed">
              This application is optimized for desktop use. 
              Mobile version is under active development.
            </p>
          </div>
        </div>
        
      </div>
    );
  }

  // Desktop view
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col ">
       <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 ">
       
        <div className="flex gap-8 w-full max-w-7xl align-center">
          
          
          {/* Preview Frame */}
          <div className="flex-1 flex justify-center ">
            <div
              ref={frameRef}
              className="relative overflow-hidden rounded-2xl shadow-xl border border-slate-700/50"
              style={{ height: `${height}px`, width: `${width}px`, background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
            >
              <img
                src={selectedBackground}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-100"
              />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img
                  src={uploadedImage}
                  alt="Top image"
                  className="max-w-full max-h-full object-contain rounded-3xl"
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="w-80 flex flex-col gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-slate-100 mb-5 flex items-center gap-2">
                <FaImage className="text-blue-400" /> Image Controls
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-xl transition-all duration-200 border border-slate-600 hover:border-slate-500"
                >
                  <FaUpload /> Upload Image
                </button>

                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
                >
                  <FaDownload /> Download Image
                </button>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-slate-100 mb-4">Background</h2>
              
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setSelectedBackground(`/backgrounds/background-${num}.jpg`)}
                      className={`px-3 py-2 text-sm rounded-lg transition-all ${
                        selectedBackground === `/backgrounds/background-${num}.jpg`
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      }`}
                    >
                      BG {num}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => downloadInputRef.current?.click()}
                  className="w-full px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-xl transition-all duration-200 border border-slate-600 hover:border-slate-500 mt-2"
                >
                  Custom Background
                </button>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-slate-100 mb-4">Aspect Ratio</h2>
              
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '1:1', h: 512, w: 512 },
                  { label: '16:9', h: 340, w: 600 },
                  { label: '9:16', h: 600, w: 340 }
                ].map((ratio) => (
                  <button
                    key={ratio.label}
                    onClick={() => { setHeight(ratio.h); setWidth(ratio.w); }}
                    className={`px-3 py-2.5 text-sm rounded-lg transition-all ${
                      height === ratio.h && width === ratio.w
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
      
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      <input
        ref={downloadInputRef}
        type="file"
        accept="image/*"
        onChange={handleBackgroundUpload}
        className="hidden"
      />
    </div>
  );
}