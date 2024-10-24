import React, { useState, useEffect } from 'react'
import { companyService } from '../../services/proyecto-service'
import { Link } from 'react-router-dom'
import SidebarComponent from '@/components/sidebarComponent'

export const VerProyectos = () => {
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proyectosData = await companyService.getProyectos()
        // Si la respuesta es exitosa, actualiza el estado con las compañías
        if (
          proyectosData &&
          proyectosData.results &&
          proyectosData.results.length > 0
        ) {
          setProyectos(proyectosData.results)
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
  return (
    <div>
     
      <h2>Lista de Proyectos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha Requerimiento</th>
            <th>Descripción</th>
            <th>Fecha estimido de inicio</th>
            <th>Planificado</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map(proyecto => (
            <tr key={proyecto.idProyecto}>
              <td>{proyecto.idProyecto}</td>
              <td>{proyecto.fechaRequerimiento}</td>
              <td>{proyecto.descripcion}</td>
              <td>{proyecto.fechaEstimadoInicio}</td>
              <td>{proyecto.planificado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        <Link to='/dashboard'>Volver al Dashboard</Link>
      </button>
    </div>
  )
}
