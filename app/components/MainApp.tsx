'use client';

import { useState, Suspense, lazy } from 'react';
import Navbar from './Navbar';

// Importações lazy para evitar problemas de cache
const MenuScreen = lazy(() => import('./MenuScreen'));
const ProductsScreen = lazy(() => import('./ProductsScreen'));
const HistoryScreen = lazy(() => import('./HistoryScreen'));

interface MainAppProps {
  userAddress: string;
  onChangeAddress: () => void;
}

export type Screen = 'menu' | 'produtos' | 'historico';

export default function MainApp({ userAddress, onChangeAddress }: MainAppProps) {
  const [activeScreen, setActiveScreen] = useState<Screen>('menu');

  const renderScreen = () => {
    const LoadingSpinner = () => (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

    switch (activeScreen) {
      case 'menu':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <MenuScreen />
          </Suspense>
        );
      case 'produtos':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductsScreen />
          </Suspense>
        );
      case 'historico':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <HistoryScreen />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <MenuScreen />
          </Suspense>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:px-6">
          <div className="flex items-center">
            {/* Logo - Desktop only */}
            <div className="hidden lg:flex items-center mr-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3 shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">GasApp</span>
            </div>

            {/* Location */}
            <div className="flex items-center flex-1">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 shadow-sm">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Entregar em</p>
                <p className="text-sm font-semibold text-gray-900 truncate lg:text-base">
                  {userAddress || 'Endereço não definido'}
                </p>
              </div>
              <button 
                onClick={onChangeAddress}
                className="bg-white text-blue-600 text-sm font-semibold hover:text-blue-700 transition-all duration-200 ml-4 px-4 py-2 rounded-xl hover:bg-blue-50 border border-blue-200 shadow-sm hover:shadow-md"
              >
                Alterar
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 ml-8">
              {[
                { id: 'menu' as Screen, label: 'Início', icon: '🏠' },
                { id: 'produtos' as Screen, label: 'Produtos', icon: '🔥' },
                { id: 'historico' as Screen, label: 'Histórico', icon: '📋' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`flex items-center px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    activeScreen === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white/60 backdrop-blur-sm'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pb-20">
        <div className="max-w-7xl mx-auto">
          {renderScreen()}
        </div>
      </main>

      {/* Bottom Navigation - Always visible on mobile */}
      <div className="lg:hidden">
        <Navbar activeScreen={activeScreen} onScreenChange={setActiveScreen} />
      </div>
    </div>
  );
}