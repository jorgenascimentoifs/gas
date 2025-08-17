'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'onboarding'>('splash');
  const router = useRouter();

  useEffect(() => {
    // Simula o tempo da splash screen
    const timer = setTimeout(() => {
      // Verifica se já existe endereço salvo
      const savedAddress = localStorage.getItem('userAddress');
      if (savedAddress) {
        // Se já tem endereço, vai direto para o app
        router.push('/app');
      } else {
        // Se não tem endereço, vai para o onboarding
        setCurrentScreen('onboarding');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleAddressComplete = (address: string) => {
    console.log('Endereço recebido:', address);
    // Salva o endereço no localStorage
    localStorage.setItem('userAddress', address);
    // Redireciona para o app
    router.push('/app');
  };

  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  return <OnboardingScreen onAddressComplete={handleAddressComplete} />;
}