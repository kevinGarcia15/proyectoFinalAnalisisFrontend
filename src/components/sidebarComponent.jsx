import React, { useState } from 'react'
import '../style/style.css' // Asegúrate de importar los estilos CSS del Sidebar
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
    <div className='sidebar'>
      <div className='user-info'>
        <Usuario />
      </div>

      <div className='menu'>
        {menus.map((menu, index) => (
          <div key={index} className='menu-item'>
            {menu.name}
            <ul>
              {menu.submenu.map((submenu, subIndex) => (
                <li key={subIndex}>
                  <Link to={submenu.path}>{submenu.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div>
        {/* Otras partes del sidebar */}
        <Logout/>
      </div>
    </div>
  )
}

export default SidebarComponent

