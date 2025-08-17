export default function ProductsScreen() {
  const products = [
    {
      id: 1,
      name: 'Botijão P13 - Ultragaz',
      description: 'Botijão de 13kg para uso doméstico',
      price: 85.00,
      originalPrice: 95.00,
      image: '🔥',
      inStock: true,
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 2,
      name: 'Botijão P13 - Liquigás',
      description: 'Botijão de 13kg para uso doméstico',
      price: 82.00,
      originalPrice: 90.00,
      image: '🔥',
      inStock: true,
      rating: 4.7,
      reviews: 189,
    },
    {
      id: 3,
      name: 'Botijão P45 - Ultragaz',
      description: 'Botijão de 45kg para uso comercial',
      price: 280.00,
      originalPrice: 300.00,
      image: '🔥',
      inStock: true,
      rating: 4.9,
      reviews: 67,
    },
    {
      id: 4,
      name: 'Regulador de Pressão',
      description: 'Regulador universal com mangueira',
      price: 45.00,
      originalPrice: null,
      image: '🔧',
      inStock: false,
      rating: 4.6,
      reviews: 123,
    },
  ];

  const filters = ['Todos', 'P13', 'P45', 'Acessórios'];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Produtos</h1>
        <p className="text-gray-600">Encontre o que você precisa</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {filters.map((filter, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                index === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex">
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-3xl mr-4">
                {product.image}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
                  </div>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-blue-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    {product.inStock ? (
                      <span className="text-green-600 text-sm font-medium mr-3">Em estoque</span>
                    ) : (
                      <span className="text-red-600 text-sm font-medium mr-3">Indisponível</span>
                    )}
                    
                    <button 
                      disabled={!product.inStock}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Button */}
      <button className="fixed bottom-24 right-4 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
        </svg>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
          2
        </span>
      </button>
    </div>
  );
}