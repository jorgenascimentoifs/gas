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
    <div className={`fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-900/50"></div>
      </div>

      <div className="text-center relative z-10 px-4">
        {/* Logo Container */}
        <div className="mb-12">
          <div
            className="w-32 h-32 mx-auto bg-gradient-to-br from-white to-blue-50 rounded-3xl flex items-center justify-center shadow-2xl transition-transform duration-700 ease-out border border-white/20"
            style={{ transform: `scale(${logoScale})` }}
          >
            <div className="relative">
              <svg className="w-18 h-18 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
              </svg>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="mb-6">
          <h1 className="text-6xl font-black text-white mb-2 animate-fade-in tracking-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              GasApp
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full animate-fade-in-delay"></div>
        </div>

        {/* Tagline */}
        <p className="text-blue-100 text-xl font-medium animate-fade-in-delay mb-12 max-w-md mx-auto leading-relaxed">
          Delivery de botijão de gás
          <br />
          <span className="text-cyan-300 font-semibold">rápido e seguro</span>
        </p>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce shadow-lg"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce delay-100 shadow-lg"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce delay-200 shadow-lg"></div>
        </div>

        {/* Version & Status */}
        <div className="text-center">
          <p className="text-blue-300/60 text-sm font-medium">
            Versão 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}