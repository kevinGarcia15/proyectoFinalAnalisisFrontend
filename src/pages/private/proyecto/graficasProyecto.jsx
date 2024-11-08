import React, { useState, useEffect } from 'react'
import { proyectoService } from '../../../services/proyecto-service'
import { Link, useNavigate } from 'react-router-dom'
import SidebarComponent from '@/components/sidebarComponent';
import BugsChart from '@/components/chartComponent';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';

export const GraficaProyecto = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportDataBug = await proyectoService.getDatoGrafica()
        if (
          reportDataBug &&
          reportDataBug &&
          reportDataBug.length > 0
        ) {
          setReportData(reportDataBug)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error al obtener los proyectos:', error)
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])


  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const menuType = 'admin'
  return (
    <div className="flex h-screen bg-gray-100">
        <SidebarComponent menuType={menuType} />
        <div className="flex-1 p-8 bg-white overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">Reporte de Bugs por Proyecto</h1>
            <BugsChart data={reportData} />
        </div>
    </div>

  )
}
