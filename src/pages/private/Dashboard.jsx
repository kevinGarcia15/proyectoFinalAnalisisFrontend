// En tu componente Dashboard.jsx
import Usuario from '@/components/Usuario'
import SidebarComponent from '@/components/sidebarComponent';
import { menuSuperAdmin } from '@/services/menu-service';
import React from 'react'
import { VerCompanies } from '.';

export const Dashboard = () => {
  
  const menuType = 'admin' 

  return (
    <div className='dashboard-container'>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '200px', padding: '16px 24px' }}></div>
        <SidebarComponent menuType={menuType} />
        <div style={{ flex: '1', padding: '16px 24px' }}>
          <VerCompanies />
        </div>
      </div>

      <div className='main-content'></div>
    </div>
  )
}
