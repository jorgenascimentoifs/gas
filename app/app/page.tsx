'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainApp from '../components/MainApp';

export default function AppPage() {
  const [userAddress, setUserAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Recupera o endereço do localStorage
    const savedAddress = localStorage.getItem('userAddress');
    
    if (savedAddress) {
      setUserAddress(savedAddress);
    } else {
      // Se não tem endereço, volta para o onboarding
      router.push('/');
      return;
    }
    
    setIsLoading(false);
  }, [router]);

  const handleChangeAddress = () => {
    // Remove o endereço salvo e volta para o onboarding
    localStorage.removeItem('userAddress');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return <MainApp userAddress={userAddress} onChangeAddress={handleChangeAddress} />;
}