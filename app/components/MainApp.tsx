'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import MenuScreen from './MenuScreen';
import ProductsScreen from './ProductsScreen';
import HistoryScreen from './HistoryScreen';

interface MainAppProps {
  userAddress: string;
  onChangeAddress: () => void;
}

export type Screen = 'menu' | 'produtos' | 'historico';

export default function MainApp({ userAddress, onChangeAddress }: MainAppProps) {
  const [activeScreen, setActiveScreen] = useState<Screen>('menu');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'menu':
        return <MenuScreen />;
      case 'produtos':
        return <ProductsScreen />;
      case 'historico':
        return <HistoryScreen />;
      default:
        return <MenuScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:px-6">
          <div className="flex items-center">
            {/* Logo - Desktop only */}
            <div className="hidden lg:flex items-center mr-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">GasApp</span>
            </div>

            {/* Location */}
            <div className="flex items-center flex-1">
              <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">Entregar em:</p>
                <p className="text-sm font-medium text-gray-800 truncate lg:text-base">
                  {userAddress || 'Endereço não definido'}
                </p>
              </div>
              <button 
                onClick={onChangeAddress}
                className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors ml-4 px-3 py-1 rounded-lg hover:bg-blue-50"
              >
                Alterar
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 ml-8">
              {[
                { id: 'menu' as Screen, label: 'Menu', icon: '🏠' },
                { id: 'produtos' as Screen, label: 'Produtos', icon: '🔥' },
                { id: 'historico' as Screen, label: 'Histórico', icon: '📋' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    activeScreen === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
      <main className="pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          {renderScreen()}
        </div>
      </main>

      {/* Bottom Navigation - Mobile only */}
      <div className="lg:hidden">
        <Navbar activeScreen={activeScreen} onScreenChange={setActiveScreen} />
      </div>
    </div>
  );
}