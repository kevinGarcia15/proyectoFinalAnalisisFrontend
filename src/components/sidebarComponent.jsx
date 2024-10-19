import React from 'react'
import Usuario from './Usuario'
import { menuAdmin, menuSuperAdmin, menuUser } from '@/services/menu-service'
import { Logout } from '../components/Logout'
import { Link } from 'react-router-dom'

const SidebarComponent = ({ menuType }) => {
  let menus = []

  // Define qué conjunto de menús usar según el tipo de usuario
  switch (menuType) {
    case 'superadmin':
      menus = menuSuperAdmin
      break
    case 'admin':
      menus = menuAdmin
      break
    case 'user':
      menus = menuUser
      break
    default:
      menus = []
  }

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      {/* Información del usuario */}
      <div className="p-6 border-b border-gray-700">
        <Usuario />
      </div>

      {/* Menús */}
      <nav className="flex-1 p-6 overflow-y-auto">
        {menus.map((menu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              {menu.name}
            </h3>
            <ul className="mt-2 space-y-2">
              {menu.submenu.map((submenu, subIndex) => (
                <li key={subIndex}>
                  <Link
                    to={submenu.path}
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white transition duration-300"
                  >
                    {submenu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-gray-700">
        <Logout />
      </div>
    </div>
  )
}

export default SidebarComponent
