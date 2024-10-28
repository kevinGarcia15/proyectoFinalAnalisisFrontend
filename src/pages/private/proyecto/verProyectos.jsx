import React, { useState, useEffect } from 'react'
import { proyectoService } from '../../../services/proyecto-service'
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import BugReportIcon from '@mui/icons-material/BugReport';

export const VerProyectos = () => {
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [projectsPerPage] = useState(5) // Proyectos por página
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proyectosData = await proyectoService.getProyectos()
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

  const handleEdit = idProyecto => {
    navigate(`/proyecto/editar/${idProyecto}`)
  }

  const handleRequerimiento = idProyecto=>{
    navigate(`/proyecto/${idProyecto}/requerimiento`)
  }
  
  const handleDelete = async idProyecto => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      try {
        const respuesta = await proyectoService.deleteProyecto(idProyecto)
        if(respuesta.status == 204){
          setProyectos(prevProyectos =>
            prevProyectos.filter(proyecto => proyecto.idProyecto !== idProyecto)
          )
        }
      } catch (error) {
        console.error('Error al eliminar el proyecto:', error)
        setError('Error al eliminar el proyecto')
      }
    }
  }

  // Obtener proyectos de la página actual
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = proyectos.slice(indexOfFirstProject, indexOfLastProject)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Lista de Proyectos</h2>
      <Link
        to="/proyecto/crearproyectos"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mb-3"
      >
        Nuevo proyecto
      </Link>
      
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Nombre del proyecto</th>
            <th className="py-3 px-6 text-left">Fecha Requerimiento</th>
            <th className="py-3 px-6 text-left">Descripción</th>
            <th className="py-3 px-6 text-left">Fecha Estimado de Inicio</th>
            <th className="py-3 px-6 text-left">Planificado</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentProjects.map(proyecto => (
            <tr key={proyecto.idProyecto} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{proyecto.idProyecto}</td>
              <td className="py-3 px-6 text-left">{proyecto.nombreProyecto}</td>
              <td className="py-3 px-6 text-left">{proyecto.fechaRequerimiento}</td>
              <td className="py-3 px-6 text-left">{proyecto.descripcion}</td>
              <td className="py-3 px-6 text-left">{proyecto.fechaEstimadoInicio}</td>
              <td className="py-3 px-6 text-left">{proyecto.planificado ? 'Sí' : 'No'}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center space-x-4">
                  <Tooltip title="Editar">
                    <IconButton>
                      <button
                        onClick={() => handleEdit(proyecto.idProyecto)}
                        className="text-blue-500 hover:text-blue-700 mr-3"
                        >
                          <EditIcon/>
                      </button>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Agregar requerimiento">
                    <IconButton>
                    <button
                      onClick={() => handleRequerimiento(proyecto.idProyecto)}
                      className="text-green-500 hover:text-blue-700 mr-3"
                    >
                      <AddIcon/>
                    </button>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Reportar Bug">
                    <IconButton>
                      <button
                        onClick={() => handleBug(proyecto.idProyecto)}
                        className="text-black-500 hover:text-red-700"
                      >
                        <BugReportIcon/>
                      </button>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Eliminar">
                    <IconButton>
                      <button
                        onClick={() => handleDelete(proyecto.idProyecto)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <DeleteIcon/>
                      </button>
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
        {Array.from({ length: Math.ceil(proyectos.length / projectsPerPage) }, (_, i) => (
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
  )
}
