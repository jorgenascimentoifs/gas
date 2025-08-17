import { Screen } from './MainApp';

interface NavbarProps {
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function Navbar({ activeScreen, onScreenChange }: NavbarProps) {
  const navItems = [
    {
      id: 'menu' as Screen,
      label: 'Início',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>
      ),
    },
    {
      id: 'produtos' as Screen,
      label: 'Produtos',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM10 18V8.5L4 12v6h12v-6l-6-3.5z" clipRule="evenodd"/>
        </svg>
      ),
    },
    {
      id: 'historico' as Screen,
      label: 'Histórico',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 safe-area-pb z-50 shadow-lg">
      <div className="max-w-sm mx-auto">
        <div className="flex justify-center items-center space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 min-w-0 flex-1 max-w-24 relative ${
                activeScreen === item.id
                  ? 'text-blue-600 bg-blue-50 shadow-md transform scale-105'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:scale-102'
              }`}
            >
              {/* Active indicator */}
              {activeScreen === item.id && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></div>
              )}
              
              <div className={`mb-1 transition-transform duration-300 ${
                activeScreen === item.id ? 'scale-110' : ''
              }`}>
                {item.icon}
              </div>
              
              <span className={`text-xs font-semibold truncate w-full text-center leading-tight transition-all duration-300 ${
                activeScreen === item.id ? 'text-blue-600' : ''
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}