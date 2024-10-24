// En tu componente Dashboard.jsx
import SidebarComponent from '@/components/sidebarComponent';
import React from 'react'
import { VerProyectos } from './verProyectos';

export const Dashboard = () => {
  
  const menuType = 'admin' 

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarComponent menuType={menuType} />
      <div className="flex-1 p-8 bg-white overflow-y-auto">
        <VerProyectos/>
      </div>
    </div>
  )
}
