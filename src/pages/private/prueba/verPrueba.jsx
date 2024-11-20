import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { pruebaService } from '../../../services/prueba-service' // Assuming pruebaService exists
import SidebarComponent from '@/components/sidebarComponent';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewSharpIcon from '@mui/icons-material/AutorenewSharp';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import BackButton from '@/components/BackButton';
import LoadingSpinner from '@/components/LoadingSpinner';

export const VerPrueba = () => {
  const [prueba, setPrueba] = useState(null)
  const [bugs, setBugs] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [criterioAceptacion, setCriterioAceptacion] = useState([])
  
  const [formData, setFormData] = useState({
    aceptado: false,
  })

  const [formDataBug, setFormDataBug] = useState({
    idEstadoBug: '',
  })

  const { id } = useParams() // Get prueba ID from URL
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPrueba = await pruebaService.getPruebaById(id)
        const fetchedCriterioAceptacion = await pruebaService.getCriterioAceptacion(id)
        const fetchedBugs = await pruebaService.getBugs(id); // Obtén los bugs asociados

        setPrueba(fetchedPrueba)
        setCriterioAceptacion(fetchedCriterioAceptacion.results)
        setBugs(fetchedBugs.results); // Asigna los bugs obtenidos al estado
      } catch (error) {
        console.error('Error obtaining prueba details:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, pruebaService])

  const handleAceptar = async (idCriterioAceptacion) => {
    try {
      setFormData({ ...formData, aceptado: !formData.aceptado });
      const respuesta = await pruebaService.aceptarCriterio(idCriterioAceptacion, formData);
  
      if (respuesta.status === 200) {
        setCriterioAceptacion(prevCriterio =>
          prevCriterio.map((criterio) =>
            criterio.idCriterioAceptacion === idCriterioAceptacion ? { ...criterio, aceptado: respuesta.data.aceptado } : criterio
          )
        );
      } else {
        setError('Error al cambiar el estado del requerimiento');
      }
    } catch (error) {
      setError('Error al cambiar el estado del requerimiento');
    }
  };
  
  const handleBugState = async (idBug, idEstado) => {
    
    try {
      formDataBug.idEstadoBug = idEstado
      const respuesta = await pruebaService.cambiarEstadoBug(idBug, formDataBug); // Llama al servicio para cambiar el estado

      if (respuesta.status === 200) {
        setBugs(prevBug =>
          prevBug.map(bug => 
            bug.idBug === idBug 
              ? { 
                  ...bug, 
                  estadoBug: { 
                    ...bug.estadoBug, 
                    estadoBug: respuesta.data.estadoBug.estadoBug 
                  },
                  fechaResolucion: respuesta.data.fechaResolucion  
                }
              : bug
          )
        );
      }

    } catch (error) {
      setError('Error al cambiar el estado del bug');
    }
  };

  if (loading) {
    return(
      <div className="h-screen flex items-center justify-center">
      <LoadingSpinner size="8" color="green-500" message="Por favor espera..." />
    </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!prueba) {
    return <div>Prueba not found.</div>
  }
  const menuType = 'admin'
  return (
    <div className="flex h-screen bg-gray-100">
        <SidebarComponent menuType={menuType} />
        <div className="flex-1 p-8 bg-white overflow-y-auto">
          <BackButton label="Volver" />
            <div className="flex h-screen bg-gray-100">
            {/* Sidebar component can be reused here */}
            <div className="flex-1 p-8 bg-white overflow-y-auto">
                <div className="container mx-auto p-6">
                {/* Prueba details */}
                <h2 className="text-2xl font-semibold mb-6">Prueba Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <p className="font-bold">ID:</p>
                    <p className="text-gray-600">{prueba.idPrueba}</p>
                    </div>
                    <div>
                    <p className="font-bold">Prueba:</p>
                    <p className="text-gray-600">{prueba.prueba}</p>
                    </div>
                    <div>
                    <p className="font-bold">Descripción:</p>
                    <p className="text-gray-600">{prueba.descripcion}</p>
                    </div>
                    <div>
                    <p className="font-bold">Escenario de prueba:</p>
                    <p className="text-gray-600">{prueba.escenarioPrueba}</p>
                    </div>
                    <div>
                    <p className="font-bold">Usuario Registro:</p>
                    <p className="text-gray-600">{prueba.usuarioRegistro.username}</p>
                    </div>
                    <div>
                    <p className="font-bold">Proyecto:</p>
                    <p className="text-gray-600">{prueba.proyecto.nombreProyecto}</p>
                    </div>
                    <div>
                    <p className="font-bold">Estado de Prueba:</p>
                    <p className="text-gray-600">{prueba.estado.estadoPrueba}</p>
                    </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-4">Criterio aceptacion</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">   

                          Descripción
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aceptado
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha de Registro
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {criterioAceptacion?.map((criterio) => (
                        <tr key={criterio.idCriterioAceptacion}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <input
                                id="checkbox-{index}"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={criterio.aceptado}
                                onChange={() => handleAceptar(criterio.idCriterioAceptacion, criterio.aceptado)}
                              />
                              <label htmlFor={`checkbox-${criterio.idCriterioAceptacion}`} className="ml-3 text-sm font-medium text-gray-900">
                                {criterio.descripcion}
                              </label>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            {criterio.aceptado ? 'Sí' : 'No'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                            {new Date(criterio.fechaRegistro).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>                
                <div className="mt-6 overflow-x-auto">
                  <h3 className="text-lg font-semibold mb-4">Bugs</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Clasificacion</th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Registro</th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Resolucion</th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bugs?.map((bug) => (
                        <tr key={bug.idBug}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {bug.bug}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                                bug.estadoBug.estadoBug === 'Abierto' 
                                  ? 'bg-gray-400'
                                  : bug.estadoBug.estadoBug === 'En progreso'
                                  ? 'bg-blue-500'
                                  : bug.estadoBug.estadoBug === 'Cerrado'
                                  ? 'bg-green-500'
                                  : 'bg-gray-200'
                              }`}
                            >
                            {bug.estadoBug.estadoBug}
                            </span>
                            
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {bug.clasificacion.clasificacion}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            {new Date(bug.fechaRegistro).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            {bug.fechaResolucion? new Date(bug.fechaResolucion).toLocaleDateString(): '--'}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-center space-x-4">
                              <Tooltip title="Finalizado">
                                <IconButton 
                                    onClick={() => handleBugState(bug.idBug, 3)}
                                    >
                                  <CheckCircleOutlineSharpIcon className="text-green-500"/>
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="En progreso">
                                <IconButton 
                                    onClick={() => handleBugState(bug.idBug, 2)}
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
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}