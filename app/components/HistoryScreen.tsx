export default function HistoryScreen() {
  const orders = [
    {
      id: '#12345',
      date: '15 Jan 2025',
      status: 'Entregue',
      statusColor: 'green',
      items: ['1x Botijão P13 - Ultragaz'],
      total: 85.00,
      deliveryTime: '2h 15min',
    },
    {
      id: '#12344',
      date: '10 Jan 2025',
      status: 'Entregue',
      statusColor: 'green',
      items: ['1x Botijão P13 - Liquigás', '1x Regulador'],
      total: 127.00,
      deliveryTime: '1h 45min',
    },
    {
      id: '#12343',
      date: '05 Jan 2025',
      status: 'Cancelado',
      statusColor: 'red',
      items: ['1x Botijão P45 - Ultragaz'],
      total: 280.00,
      deliveryTime: null,
    },
    {
      id: '#12342',
      date: '28 Dez 2024',
      status: 'Entregue',
      statusColor: 'green',
      items: ['2x Botijão P13 - Ultragaz'],
      total: 170.00,
      deliveryTime: '3h 20min',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Entregue':
        return (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        );
      case 'Cancelado':
        return (
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
          </svg>
        );
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Histórico</h1>
        <p className="text-gray-600">Suas compras anteriores</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-sm text-blue-700">Pedidos realizados</div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="text-2xl font-bold text-green-600">R$ 1.240</div>
          <div className="text-sm text-green-700">Total economizado</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
        {['Todos', 'Entregues', 'Cancelados'].map((filter, index) => (
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

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            {/* Order Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <span className="font-semibold text-gray-800">{order.id}</span>
                <span className="text-gray-400 mx-2">•</span>
                <span className="text-gray-600 text-sm">{order.date}</span>
              </div>
              
              <div className="flex items-center">
                {getStatusIcon(order.status)}
                <span className={`ml-1 text-sm font-medium ${
                  order.statusColor === 'green' ? 'text-green-600' :
                  order.statusColor === 'red' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-3">
              {order.items.map((item, index) => (
                <p key={index} className="text-gray-600 text-sm">{item}</p>
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                {order.deliveryTime && (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                    Entregue em {order.deliveryTime}
                  </>
                )}
              </div>
              
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-800 mr-3">
                  R$ {order.total.toFixed(2)}
                </span>
                
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  Ver detalhes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no orders) */}
      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhum pedido ainda</h3>
          <p className="text-gray-600 mb-4">Faça seu primeiro pedido e ele aparecerá aqui</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Fazer pedido
          </button>
        </div>
      )}
    </div>
  );
}