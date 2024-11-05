import React, { useState, useEffect } from 'react'
import { requerimientosService } from '../../../services/requerimiento-service'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewSharpIcon from '@mui/icons-material/AutorenewSharp';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SidebarComponent from '@/components/sidebarComponent';

export const VerRequerimientos = () => {
  const [formData, setFormData] = useState({
    idEstadoRequerimiento: '',
  })

  const { id } = useParams() // Obtener el ID del proyecto desde la URL
  const [requerimientos, setRequerimientos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [projectsPerPage] = useState(5) // Requerimientos por página
  const menuType = 'admin'
  const linkTo = `crear`

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

  const handleEdit = async (idRequerimiento, nuevoEstado) => {
    try {
      formData.idEstadoRequerimiento = nuevoEstado;
      const respuesta = await requerimientosService.cambioEstado(idRequerimiento, formData);
  
      if (respuesta.status === 200) {
        setRequerimientos(prevRequerimientos =>
          prevRequerimientos.map(requerimiento => 
            requerimiento.idRequerimiento === idRequerimiento 
              ? { 
                  ...requerimiento, 
                  estadoRequerimiento: { 
                    ...requerimiento.estadoRequerimiento, 
                    estadoRequerimiento: respuesta.data.estadoRequerimiento.estadoRequerimiento 
                  } 
                }
              : requerimiento
          )
        );
      }
    } catch (error) {
      console.error('Error al cambiar el estado del requerimiento:', error);
      setError('Error al cambiar el estado del requerimiento');
    }
  };
  
  
  const handleDelete = async idRequerimiento => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este requerimiento?')) {
      try {
        const respuesta = await requerimientosService.deleteRequerimiento(idRequerimiento)
        if(respuesta.status == 204){
          setRequerimientos(prevRequerimientos =>
            prevRequerimientos.filter(requerimiento => requerimiento.idRequerimiento !== idRequerimiento)
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

  if (loading || !requerimientos.length) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarComponent menuType={menuType} />
        <div className="flex-1 p-8 bg-white">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">¡Parece que aún no hay requerimientos!</h1>
            <p className="text-gray-600 mb-8">
              Comencemos a construir juntos. ¿Qué te parece si creamos uno nuevo?
            </p>
            <Link
              to={linkTo}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Crear nuevo requerimiento
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarComponent menuType={menuType} />
      <div className="flex-1 p-8 bg-white overflow-y-auto">
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-6">{currentProjects[0].proyecto.nombreProyecto}</h2>
          <Link
            to={linkTo}
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
                  <td className="py-3 px-6 text-left">{requerimiento.usuarioEncargado.username}</td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                        requerimiento.estadoRequerimiento.estadoRequerimiento === 'Planificado' 
                          ? 'bg-gray-400'
                          : requerimiento.estadoRequerimiento.estadoRequerimiento === 'En progreso'
                          ? 'bg-blue-500'
                          : requerimiento.estadoRequerimiento.estadoRequerimiento === 'Finalizado'
                          ? 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    >
                      {requerimiento.estadoRequerimiento.estadoRequerimiento}
                    </span>
                </td>                  
                <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <Tooltip title="Finalizado">
                        <IconButton 
                            onClick={() => handleEdit(requerimiento.idRequerimiento, 3)}
                            >
                          <CheckCircleOutlineSharpIcon className="text-green-500"/>
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="En progreso">
                        <IconButton 
                            onClick={() => handleEdit(requerimiento.idRequerimiento, 2)}
                            >
                          <AutorenewSharpIcon className="text-blue-500"/>
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Eliminar">
                        <IconButton 
                          onClick={() => handleDelete(requerimiento.idRequerimiento)}
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
