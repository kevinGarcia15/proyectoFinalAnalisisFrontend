import React, { useState, useEffect } from 'react'
import { requerimientosService } from '../../../services/requerimiento-service'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import BugReportIcon from '@mui/icons-material/BugReport';
import SidebarComponent from '@/components/sidebarComponent';

export const VerRequerimientos = () => {
  const { id } = useParams() // Obtener el ID del proyecto desde la URL
  const [requerimientos, setRequerimientos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [projectsPerPage] = useState(5) // Requerimientos por página
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requerimientosData = await requerimientosService.getRequerimientos(id)
        if (
          requerimientosData &&
          requerimientosData.results &&
          requerimientosData.results.length > 0
        ) {
          setRequerimientos(requerimientosData.results)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error al obtener los requerimientos:', error)
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleEdit = idProyecto => {
    navigate(`/requerimiento/editar/${idProyecto}`)
  }
  
  const handleDelete = async idProyecto => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este requerimiento?')) {
      try {
        const respuesta = await requerimientoService.deleteProyecto(idProyecto)
        if(respuesta.status == 204){
          setRequerimientos(prevRequerimientos =>
            prevRequerimientos.filter(requerimiento => requerimiento.idProyecto !== idProyecto)
          )
        }
      } catch (error) {
        console.error('Error al eliminar el requerimiento:', error)
        setError('Error al eliminar el requerimiento')
      }
    }
  }

  // Obtener requerimientos de la página actual
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = requerimientos.slice(indexOfFirstProject, indexOfLastProject)

  const paginate = pageNumber => setCurrentPage(pageNumber)

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
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-6">Lista de Requerimientos</h2>
          <Link
            to="/requerimiento/crearrequerimientos"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mb-3"
          >
            Nuevo requerimiento
          </Link>
          
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">id</th>
                <th className="py-3 px-6 text-left">Requerimiento</th>
                <th className="py-3 px-6 text-left">Prioridad</th>
                <th className="py-3 px-6 text-left">Fecha estimado entrega</th>
                <th className="py-3 px-6 text-left">Usuario encargado</th>
                <th className="py-3 px-6 text-left">Estado</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentProjects.map(requerimiento => (
                <tr key={requerimiento.idRequerimiento} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{requerimiento.idRequerimiento}</td>
                  <td className="py-3 px-6 text-left">{requerimiento.requerimiento}</td>
                  <td className="py-3 px-6 text-left">{requerimiento.orden}</td>
                  <td className="py-3 px-6 text-left">{requerimiento.fechaEstimadoEntrega}</td>
                  <td className="py-3 px-6 text-left">{requerimiento.idUsuarioEncargado}</td>
                  <td className="py-3 px-6 text-left">{requerimiento.estadoRequerimiento.estadoRequerimiento}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <Tooltip title="Editar">
                        <IconButton 
                            onClick={() => handleEdit(requerimiento.idProyecto)}
                            >
                          <EditIcon className="text-yellow-500"/>
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Eliminar">
                        <IconButton 
                          onClick={() => handleDelete(requerimiento.idProyecto)}
                        >
                          <DeleteIcon className="text-red-500"/>
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: Math.ceil(requerimientos.length / projectsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}
