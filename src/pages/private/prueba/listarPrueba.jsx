import React, { useState, useEffect } from 'react'
import { pruebaService } from '../../../services/prueba-service'
import { Link, useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import BugReportIcon from '@mui/icons-material/BugReport';
import SidebarComponent from '@/components/sidebarComponent';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import LoadingSpinner from '@/components/LoadingSpinner';


export const ListarPrueba = () => {
  const [prueba, setPrueba] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [projectsPerPage] = useState(5) // Prueba por página
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pruebaData = await pruebaService.getPruebas()
        if (
          pruebaData &&
          pruebaData.results &&
          pruebaData.results.length > 0
        ) {
          setPrueba(pruebaData.results)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error al obtener los prueba:', error)
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handlePrueba = idPrueba=>{
    navigate(`/pruebas/ver/${idPrueba}`)
  }

  const handleBug = idPrueba=>{
    navigate(`/pruebas/${idPrueba}/bugs/crear`)
  }
  
  const handleDelete = async idPrueba => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este prueba?')) {
      try {
        const respuesta = await pruebaService.deletePrueba(idPrueba)
        if(respuesta.status == 204){
          setPrueba(prevPrueba =>
            prevPrueba.filter(prueba => prueba.idPrueba !== idPrueba)
          )
        }
      } catch (error) {
        console.error('Error al eliminar el prueba:', error)
        setError('Error al eliminar el prueba')
      }
    }
  }

  // Obtener prueba de la página actual
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = prueba.slice(indexOfFirstProject, indexOfLastProject)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  const menuType = 'admin' 
  if (loading) {
    return(
      <div className="flex h-screen bg-gray-100">
        <SidebarComponent menuType={menuType} />
        <div className="flex-1 p-8 bg-white overflow-y-auto">
          <div className="h-screen flex items-center justify-center">
            <LoadingSpinner size="8" color="green-500" message="Por favor espera..." />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (

    <div className="flex h-screen bg-gray-100">
        <SidebarComponent menuType={menuType} />
      <div className="flex-1 p-8 bg-white overflow-y-auto">

        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-6">Lista de Prueba</h2>
          <Link
            to="/pruebas/crear"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mb-3"
          >
            Nuevo prueba
          </Link>
          
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Prueba</th>
                <th className="py-3 px-6 text-left">Descripción</th>
                <th className="py-3 px-6 text-left">Escenario de prueba</th>
                <th className="py-3 px-6 text-left">Usuario Registro</th>
                <th className="py-3 px-6 text-left">Proyecto</th>
                <th className="py-3 px-6 text-left">estadoPrueba</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentProjects.map(prueba => (
                <tr key={prueba.idPrueba} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{prueba.idPrueba}</td>
                  <td className="py-3 px-6 text-left">{prueba.prueba}</td>
                  <td className="py-3 px-6 text-left">{prueba.descripcion}</td>
                  <td className="py-3 px-6 text-left">{prueba.escenarioPrueba}</td>
                  <td className="py-3 px-6 text-left">{prueba.usuarioRegistro.username}</td>
                  <td className="py-3 px-6 text-left">{prueba.proyecto.nombreProyecto}</td>
                  <td className="py-3 px-6 text-left">{prueba.estado.estadoPrueba}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center space-x-4">

                      <Tooltip title="Ver prueba">                        
                        <IconButton onClick={() => handlePrueba(prueba.idPrueba)}>
                          <RemoveRedEyeSharpIcon className="text-yellow-500 hover:text-blue-700 mr-3"/>
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Registrar Bug">
                        <IconButton onClick={() => handleBug(prueba.idPrueba)}>
                            <BugReportIcon className="text-black-500 hover:text-red-700"/>
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Eliminar">
                        <IconButton onClick={() => handleDelete(prueba.idPrueba)}>
                            <DeleteIcon className="text-red-500 hover:text-red-700"/>
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
            {Array.from({ length: Math.ceil(prueba.length / projectsPerPage) }, (_, i) => (
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
