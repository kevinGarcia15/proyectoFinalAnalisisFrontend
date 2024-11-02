import React, { useState, useEffect } from 'react'
import { pruebaService } from '../../../services/prueba-service'
import { useNavigate } from 'react-router-dom'
import SidebarComponent from '@/components/sidebarComponent';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const CrearPrueba = () => {
  const [formData, setFormData] = useState({
    prueba: '',
    descripcion: '',
    escenarioPrueba: '',
    idUsuarioRegistro: '',
    idProyecto: '',
    idEstadoPrueba: '',
  })

  const [criterios, setCriterios] = useState([{ descripcion: '' }])

  // Estados para cargar los catálogos
  const [proyectos, setProyectos] = useState([])
  const [estadosPrueba, setEstadosPrueba] = useState([])

  // Cargar catálogos al montar el componente
  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const proyectosData = await pruebaService.getProyectos()
        const estadosPruebaData = await pruebaService.getEstadosPrueba()

        setProyectos(proyectosData.results)
        setEstadosPrueba(estadosPruebaData.results)
      } catch (error) {
        console.error('Error al cargar catálogos:', error)
      }
    }

    fetchCatalogos()
  }, [])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCriterioChange = (index, e) => {
    const { value } = e.target
    const newCriterios = [...criterios]
    newCriterios[index].descripcion = value
    setCriterios(newCriterios)
  }

  const addCriterio = () => {
    setCriterios([...criterios, { descripcion: '' }])
  }

  const removeCriterio = (index) => {
    if(criterios.length > 1){
      const newCriterios = criterios.filter((_, i) => i !== index)
      setCriterios(newCriterios)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const pruebaResponse = await pruebaService.createPrueba(formData)
      const idPrueba = pruebaResponse.idPrueba

      await Promise.all(
        criterios.map(criterio =>
          pruebaService.createCriterioAceptacion({ ...criterio, idPrueba })
        )
      )

      setLoading(false)
      alert('¡La prueba y los criterios de aceptación se registraron exitosamente!')
      navigate('/pruebas')
    } catch (error) {
      console.error('Error al crear la prueba:', error)
      setError('Error al crear la prueba. Inténtalo de nuevo.')
      setLoading(false)
    }
  }
  
  const menuType = 'admin'

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarComponent menuType={menuType} />
      <div className="flex-1 p-8 bg-white overflow-y-auto">
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-6">Crear Nueva Prueba</h2>
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre de la Prueba</label>
              <input
                type="text"
                name="prueba"
                value={formData.prueba}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Escenario de Prueba</label>
              <textarea
                name="escenarioPrueba"
                value={formData.escenarioPrueba}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Proyecto</label>
              <select
                name="idProyecto"
                value={formData.idProyecto}
                onChange={handleChange}
                required
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona un proyecto</option>
                {proyectos.map((proyecto) => (
                  <option key={proyecto.idProyecto} value={proyecto.idProyecto}>
                    {proyecto.nombreProyecto}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Estado de la Prueba</label>
              <select
                name="idEstadoPrueba"
                value={formData.idEstadoPrueba}
                onChange={handleChange}
                required
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona un estado</option>
                {estadosPrueba.map((estado) => (
                  <option key={estado.idEstadoPrueba} value={estado.idEstadoPrueba}>
                    {estado.estadoPrueba}
                  </option>
                ))}
              </select>
            </div>

            {/* Sección de criterios de aceptación */}
            <h3 className="text-xl font-semibold mt-6 mb-4">Criterios de Aceptación</h3>
            {criterios.map((criterio, index) => (
              <div key={index} className="mb-4 flex items-center">
                <input
                  type="text"
                  placeholder="Descripción del criterio"
                  value={criterio.descripcion}
                  onChange={(e) => handleCriterioChange(index, e)}
                  className="w-full px-3 py-2 border rounded mr-4"
                  required
                />
            
                <Tooltip title="Agregar criterio de aceptacion">
                  <IconButton onClick={addCriterio}>
                    <AddIcon className="text-green-500 hover:text-blue-700 mr-3"/>
                </IconButton>
                                                
                </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => removeCriterio(index)}>
                        <DeleteIcon className="text-red-500 hover:text-red-700"/>
                    </IconButton>
                </Tooltip>
          
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? 'Creando...' : 'Crear Prueba'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}
