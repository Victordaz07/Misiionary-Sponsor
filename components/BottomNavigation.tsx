'use client'

import { useRouter, usePathname } from 'next/navigation'

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center">
        <button 
          onClick={() => handleNavigation('/')}
          className={`flex flex-col items-center space-y-1 py-2 hover:bg-gray-50 rounded-lg transition-colors ${
            isActive('/') ? 'bg-blue-50' : ''
          }`}
        >
          <i className={`fa-solid fa-home text-lg ${
            isActive('/') ? 'text-beacon-blue' : 'text-gray-400'
          }`}></i>
          <span className={`text-xs ${
            isActive('/') ? 'text-beacon-blue' : 'text-gray-400'
          }`}>Inicio</span>
        </button>
        
        <button 
          onClick={() => handleNavigation('/feed')}
          className={`flex flex-col items-center space-y-1 py-2 hover:bg-gray-50 rounded-lg transition-colors ${
            isActive('/feed') ? 'bg-blue-50' : ''
          }`}
        >
          <i className={`fa-solid fa-heart text-lg ${
            isActive('/feed') ? 'text-beacon-blue' : 'text-gray-400'
          }`}></i>
          <span className={`text-xs ${
            isActive('/feed') ? 'text-beacon-blue' : 'text-gray-400'
          }`}>Feed</span>
        </button>
        
        <button 
          onClick={() => handleNavigation('/dashboard')}
          className={`flex flex-col items-center space-y-1 py-2 hover:bg-gray-50 rounded-lg transition-colors ${
            isActive('/dashboard') ? 'bg-blue-50' : ''
          }`}
        >
          <i className={`fa-solid fa-chart-bar text-lg ${
            isActive('/dashboard') ? 'text-beacon-blue' : 'text-gray-400'
          }`}></i>
          <span className={`text-xs ${
            isActive('/dashboard') ? 'text-beacon-blue' : 'text-gray-400'
          }`}>Dashboard</span>
        </button>
        
        <button 
          onClick={() => handleNavigation('/reports')}
          className={`flex flex-col items-center space-y-1 py-2 hover:bg-gray-50 rounded-lg transition-colors ${
            isActive('/reports') ? 'bg-blue-50' : ''
          }`}
        >
          <i className={`fa-solid fa-file-alt text-lg ${
            isActive('/reports') ? 'text-beacon-blue' : 'text-gray-400'
          }`}></i>
          <span className={`text-xs ${
            isActive('/reports') ? 'text-beacon-blue' : 'text-gray-400'
          }`}>Reportes</span>
        </button>
        
        <button 
          onClick={() => handleNavigation('/profile')}
          className={`flex flex-col items-center space-y-1 py-2 hover:bg-gray-50 rounded-lg transition-colors ${
            isActive('/profile') ? 'bg-blue-50' : ''
          }`}
        >
          <i className={`fa-solid fa-user text-lg ${
            isActive('/profile') ? 'text-beacon-blue' : 'text-gray-400'
          }`}></i>
          <span className={`text-xs ${
            isActive('/profile') ? 'text-beacon-blue' : 'text-gray-400'
          }`}>Perfil</span>
        </button>
      </div>
    </div>
  )
}
