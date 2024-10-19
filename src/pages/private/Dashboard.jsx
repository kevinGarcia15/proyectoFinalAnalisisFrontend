// En tu componente Dashboard.jsx
import Usuario from '@/components/Usuario'
import SidebarComponent from '@/components/sidebarComponent';
import { menuSuperAdmin } from '@/services/menu-service';
import React from 'react'
import { VerCompanies } from '.';

export const Dashboard = () => {
  
  const menuType = 'admin' 

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarComponent menuType={menuType} />

      {/* Contenido principal */}
      <div className="flex-1 p-8 bg-white overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <VerCompanies />
      </div>
    </div>
  )
}
