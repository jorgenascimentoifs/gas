'use client';

import { useState } from 'react';
import AddressConfirmation from './AddressConfirmation';

interface OnboardingScreenProps {
    onAddressComplete: (address: string) => void;
}

export default function OnboardingScreen({ onAddressComplete }: OnboardingScreenProps) {
    const [step, setStep] = useState<'welcome' | 'address' | 'confirm'>('welcome');
    const [cep, setCep] = useState('');
    const [baseAddress, setBaseAddress] = useState('');
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | undefined>();
    const [isLoadingGPS, setIsLoadingGPS] = useState(false);
    const [isLoadingCEP, setIsLoadingCEP] = useState(false);

    const formatCEP = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCEP(e.target.value);
        if (formatted.length <= 9) {
            setCep(formatted);
        }
    };

    const handleUseGPS = async () => {
        setIsLoadingGPS(true);

        // Primeiro tenta geolocalização por IP como fallback mais rápido
        const tryIPLocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (response.ok) {
                    const data = await response.json();
                    if (data.city && data.region) {
                        const ipAddress = `${data.city}, ${data.region} - Brasil`;
                        setBaseAddress(ipAddress);
                        setIsLoadingGPS(false);
                        setStep('confirm');
                        return true;
                    }
                }
            } catch (error) {
                console.log('IP geolocation falhou:', error);
            }
            return false;
        };

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        // Usar geocodificação reversa para obter endereço
                        const { latitude, longitude } = position.coords;
                        console.log('Coordenadas obtidas:', latitude, longitude);

                        // Usando Nominatim (OpenStreetMap) para geocodificação reversa
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=pt-BR`
                        );

                        if (response.ok) {
                            const data = await response.json();
                            console.log('Dados do Nominatim:', data);
                            const addressParts = data.address;

                            const street = addressParts.road || addressParts.pedestrian || 'Rua não identificada';
                            const number = addressParts.house_number || 'S/N';
                            const neighborhood = addressParts.neighbourhood || addressParts.suburb || 'Centro';
                            const city = addressParts.city || addressParts.town || addressParts.village || 'São Paulo';
                            const state = addressParts.state || 'SP';

                            const fullAddress = `${street} - ${neighborhood}, ${city} - ${state}`;
                            setBaseAddress(fullAddress);
                            setCoordinates({ lat: latitude, lng: longitude });
                            setIsLoadingGPS(false);
                            setStep('confirm');
                        } else {
                            throw new Error('Erro na geocodificação');
                        }
                    } catch (error) {
                        console.error('Erro ao obter endereço por GPS:', error);
                        // Tenta IP geolocation como fallback
                        const ipSuccess = await tryIPLocation();
                        if (!ipSuccess) {
                            // Último fallback - endereço simulado
                            const mockAddress = 'Rua das Flores - Centro, São Paulo - SP';
                            setBaseAddress(mockAddress);
                            setIsLoadingGPS(false);
                            setStep('confirm');
                        }
                    }
                },
                async (error) => {
                    console.error('Erro de geolocalização:', error);

                    // Tenta IP geolocation como fallback
                    const ipSuccess = await tryIPLocation();
                    if (!ipSuccess) {
                        setIsLoadingGPS(false);

                        let errorMessage = 'Não foi possível obter sua localização. ';

                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage += 'Permissão negada. Verifique as configurações do navegador.';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMessage += 'Localização indisponível.';
                                break;
                            case error.TIMEOUT:
                                errorMessage += 'Tempo limite excedido.';
                                break;
                            default:
                                errorMessage += 'Erro desconhecido.';
                                break;
                        }

                        alert(errorMessage + ' Por favor, digite seu CEP.');
                    }
                },
                {
                    enableHighAccuracy: false, // Mudei para false para ser mais rápido
                    timeout: 15000, // Aumentei o timeout
                    maximumAge: 300000 // 5 minutos
                }
            );
        } else {
            // Tenta IP geolocation se geolocalização não estiver disponível
            const ipSuccess = await tryIPLocation();
            if (!ipSuccess) {
                setIsLoadingGPS(false);
                alert('Geolocalização não suportada. Por favor, digite seu CEP.');
            }
        }
    };

    const handleCEPSubmit = async () => {
        if (cep.length === 9) {
            setIsLoadingCEP(true);
            try {
                // Consulta API ViaCEP
                const cleanCEP = cep.replace('-', '');
                const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);

                if (response.ok) {
                    const data = await response.json();

                    if (data.erro) {
                        alert('CEP não encontrado. Verifique e tente novamente.');
                        setIsLoadingCEP(false);
                        return;
                    }

                    const fullAddress = `${data.logradouro} - ${data.bairro}, ${data.localidade} - ${data.uf}`;
                    setBaseAddress(fullAddress);
                    setIsLoadingCEP(false);
                    setStep('confirm');
                } else {
                    throw new Error('Erro na consulta do CEP');
                }
            } catch (error) {
                console.error('Erro ao consultar CEP:', error);
                alert('Erro ao consultar CEP. Tente novamente.');
                setIsLoadingCEP(false);
            }
        }
    };

    if (step === 'confirm') {
        return (
            <AddressConfirmation
                baseAddress={baseAddress}
                coordinates={coordinates}
                onConfirm={onAddressComplete}
                onBack={() => setStep('welcome')}
            />
        );
    }

    if (step === 'welcome') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 lg:p-8">
                {/* Desktop Grid Layout */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:max-w-6xl lg:w-full lg:items-center">
                    {/* Left Side - Hero Content */}
                    <div className="text-left">
                        <div className="mb-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                                </svg>
                            </div>
                            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                Bem-vindo ao<br />
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    GasApp
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-6">
                                Delivery de botijão de gás rápido, seguro e confiável.
                                Receba em casa com apenas alguns cliques.
                            </p>

                            {/* Features */}
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Entrega em até 2 horas</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Produtos certificados</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Pagamento seguro</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Vamos começar! 🚀
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Para começar, precisamos do seu endereço de entrega
                        </p>

                        <div className="space-y-4">
                            <button
                                onClick={handleUseGPS}
                                disabled={isLoadingGPS}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                {isLoadingGPS ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                        Obtendo localização...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        Usar minha localização
                                    </>
                                )}
                            </button>

                            <div className="flex items-center">
                                <div className="flex-1 border-t border-gray-200"></div>
                                <span className="px-4 text-gray-500 text-sm font-medium">ou</span>
                                <div className="flex-1 border-t border-gray-200"></div>
                            </div>

                            <button
                                onClick={() => setStep('address')}
                                className="w-full bg-gray-50 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center border border-gray-200 hover:border-gray-300"
                            >
                                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                                </svg>
                                Digitar meu CEP
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden max-w-md w-full text-center">
                    <div className="mb-8">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Bem-vindo ao <span className="text-blue-600">GasApp!</span>
                        </h1>
                        <p className="text-gray-600">Delivery de botijão de gás rápido e seguro</p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Para começar, precisamos do seu endereço
                        </h2>

                        <div className="space-y-4">
                            <button
                                onClick={handleUseGPS}
                                disabled={isLoadingGPS}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 flex items-center justify-center shadow-lg"
                            >
                                {isLoadingGPS ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Obtendo localização...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        Usar minha localização
                                    </>
                                )}
                            </button>

                            <div className="flex items-center">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="px-3 text-gray-500 text-sm">ou</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            <button
                                onClick={() => setStep('address')}
                                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                                </svg>
                                Digitar meu CEP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 lg:p-8">
            <div className="max-w-md w-full lg:max-w-lg">
                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                    <button
                        onClick={() => setStep('welcome')}
                        className="mb-6 text-gray-600 hover:text-gray-800 flex items-center transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center mr-2 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium">Voltar</span>
                    </button>

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Digite seu CEP</h2>
                        <p className="text-gray-600">Vamos buscar seu endereço automaticamente</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                CEP
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={cep}
                                    onChange={handleCEPChange}
                                    placeholder="00000-000"
                                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg font-medium text-gray-900 placeholder-gray-500 bg-white"
                                    maxLength={9}
                                    autoFocus
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            {cep.length > 0 && cep.length < 9 && (
                                <p className="text-sm text-amber-600 mt-2 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Digite o CEP completo (8 dígitos)
                                </p>
                            )}
                            {cep.length === 9 && (
                                <p className="text-sm text-green-600 mt-2 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    CEP válido
                                </p>
                            )}
                        </div>

                        <button
                            onClick={handleCEPSubmit}
                            disabled={cep.length !== 9 || isLoadingCEP}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                        >
                            {isLoadingCEP ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                    Consultando CEP...
                                </>
                            ) : (
                                <>
                                    <span>Continuar</span>
                                    <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </>
                            )}
                        </button>

                        {/* Info Card */}
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-blue-900 text-sm">Seus dados estão seguros</h4>
                                    <p className="text-blue-700 text-sm mt-1">
                                        Usamos seu CEP apenas para calcular frete e tempo de entrega.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}