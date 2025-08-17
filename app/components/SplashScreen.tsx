'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [logoScale, setLogoScale] = useState(0);

  useEffect(() => {
    // Animação do logo
    const logoTimer = setTimeout(() => {
      setLogoScale(1);
    }, 200);

    // Fade out
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <div 
            className="w-28 h-28 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-2xl transition-transform duration-700 ease-out"
            style={{ transform: `scale(${logoScale})` }}
          >
            <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
            </svg>
          </div>
        </div>
        
        {/* Brand Name */}
        <h1 className="text-5xl font-bold text-white mb-3 animate-fade-in">
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            GasApp
          </span>
        </h1>
        
        {/* Tagline */}
        <p className="text-blue-100 text-xl font-medium animate-fade-in-delay mb-8">
          Seu botijão na porta de casa
        </p>
        
        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
        
        {/* Version */}
        <p className="text-blue-200 text-sm mt-8 opacity-60">
          v1.0.0
        </p>
      </div>
    </div>
  );
}