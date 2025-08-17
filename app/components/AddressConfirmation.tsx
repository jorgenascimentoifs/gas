'use client';

import { useState } from 'react';

interface AddressConfirmationProps {
  baseAddress: string;
  coordinates?: { lat: number; lng: number };
  onConfirm: (fullAddress: string) => void;
  onBack: () => void;
}

export default function AddressConfirmation({ 
  baseAddress, 
  coordinates, 
  onConfirm, 
  onBack 
}: AddressConfirmationProps) {
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [reference, setReference] = useState('');

  const handleConfirm = () => {
    const fullAddress = `${baseAddress}${number ? `, ${number}` : ''}${complement ? ` - ${complement}` : ''}`;
    
    // Salva informações adicionais no localStorage
    const addressData = {
      baseAddress,
      number,
      complement,
      reference,
      coordinates,
      fullAddress
    };
    
    localStorage.setItem('addressData', JSON.stringify(addressData));
    onConfirm(fullAddress);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <button
              onClick={onBack}
              className="mb-4 text-blue-100 hover:text-white flex items-center transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 group-hover:bg-blue-400 flex items-center justify-center mr-2 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">Voltar</span>
            </button>

            <h2 className="text-2xl font-bold mb-2">Confirme seu endereço</h2>
            <p className="text-blue-100">Adicione informações para uma entrega precisa</p>
          </div>

          <div className="p-6 lg:p-8">
            {/* Map Section */}
            {coordinates && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Localização encontrada</h3>
                <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center relative overflow-hidden">
                  {/* Simple map placeholder - in production, use Google Maps or similar */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-20"></div>
                  <div className="text-center z-10">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">Sua localização</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Base Address */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Endereço base</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <p className="text-gray-700">{baseAddress}</p>
              </div>
            </div>

            {/* Additional Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número *
                  </label>
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    placeholder="Apto 101, Bloco A"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ponto de referência
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Próximo ao mercado, portão azul"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <h4 className="font-semibold text-blue-900 text-sm mb-2">Endereço completo:</h4>
              <p className="text-blue-800">
                {baseAddress}
                {number && `, ${number}`}
                {complement && ` - ${complement}`}
              </p>
              {reference && (
                <p className="text-blue-600 text-sm mt-1">
                  📍 {reference}
                </p>
              )}
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={!number.trim()}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              <span>Confirmar endereço</span>
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}