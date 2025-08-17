export default function MenuScreen() {
  const menuItems = [
    {
      title: 'Botijão P13',
      description: 'Gás de cozinha tradicional',
      price: 'R$ 85,00',
      image: '🔥',
      popular: true,
    },
    {
      title: 'Botijão P45',
      description: 'Para uso comercial',
      price: 'R$ 280,00',
      image: '🔥',
      popular: false,
    },
    {
      title: 'Entrega Expressa',
      description: 'Receba em até 2 horas',
      price: '+ R$ 15,00',
      image: '⚡',
      popular: false,
    },
  ];

  const categories = [
    { name: 'Botijões', icon: '🔥', active: true },
    { name: 'Acessórios', icon: '🔧', active: false },
    { name: 'Serviços', icon: '⚙️', active: false },
  ];

  return (
    <div className="p-4 lg:p-6">
      {/* Desktop Grid Layout */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          {/* Welcome Section */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              Olá! 👋
            </h1>
            <p className="text-gray-600 lg:text-lg">
              O que você precisa hoje?
            </p>
          </div>

          {/* Categories */}
          <div className="mb-6 lg:mb-8">
            <div className="flex space-x-3 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`flex items-center px-4 py-3 rounded-2xl whitespace-nowrap transition-all duration-200 ${
                    category.active
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <span className="mr-2 text-lg">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-6 lg:p-8 mb-6 lg:mb-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
            <div className="relative">
              <h2 className="text-xl lg:text-2xl font-bold mb-2">Primeira compra? 🎉</h2>
              <p className="text-blue-100 mb-4 lg:text-lg">Ganhe R$ 10 de desconto!</p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold text-sm lg:text-base hover:bg-gray-50 transition-colors shadow-lg">
                Usar cupom BEMVINDO10
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Produtos em destaque</h2>
            
            <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
              {menuItems.map((item, index) => (
                <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-gray-200">
                  <div className="flex items-center">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl mr-4 lg:mr-6">
                      {item.image}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="font-semibold text-gray-800 lg:text-lg">{item.title}</h3>
                        {item.popular && (
                          <span className="ml-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm lg:text-base mb-3">{item.description}</p>
                      <p className="text-blue-600 font-bold lg:text-lg">{item.price}</p>
                    </div>
                    
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Desktop only */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Precisa de ajuda?</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-50 border border-green-200 rounded-2xl p-4 text-left hover:bg-green-100 transition-colors">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">📞</div>
                    <div>
                      <p className="text-green-700 font-medium">Ligar para nós</p>
                      <p className="text-green-600 text-sm">(11) 9999-9999</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full bg-purple-50 border border-purple-200 rounded-2xl p-4 text-left hover:bg-purple-100 transition-colors">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">💬</div>
                    <div>
                      <p className="text-purple-700 font-medium">Chat online</p>
                      <p className="text-purple-600 text-sm">Resposta imediata</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-4">Seus números</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pedidos realizados</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Economia total</span>
                  <span className="font-semibold text-green-600">R$ 240</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tempo médio</span>
                  <span className="font-semibold text-purple-600">1h 30min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Mobile only */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:hidden">
        <button className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center hover:bg-green-100 transition-colors">
          <div className="text-2xl mb-2">📞</div>
          <p className="text-green-700 font-medium text-sm">Ligar para nós</p>
        </button>
        
        <button className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-center hover:bg-purple-100 transition-colors">
          <div className="text-2xl mb-2">💬</div>
          <p className="text-purple-700 font-medium text-sm">Chat online</p>
        </button>
      </div>
    </div>
  );
}