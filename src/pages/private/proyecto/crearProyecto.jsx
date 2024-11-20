import React, { useState, useEffect } from 'react'
import { proyectoService } from '../../../services/proyecto-service'
import { useNavigate } from 'react-router-dom'
import SidebarComponent from '@/components/sidebarComponent';
import BackButton from '@/components/BackButton';

export const CrearProyecto = () => {
  const [formData, setFormData] = useState({
    fechaRequerimiento: '',
    idUsuariEncargado: '',
    nombreProyecto: '',
    descripcion: '',
    fechaEstimadoInicio: '',
    planificado: false,
    idPrioridad: '',
    idComplejidad: '',
    idTipoRequerimiento: '',
    idEstadoProyecto: '',
  })

  // Estados para cargar los catálogos
  const [usuarios, setUsuarios] = useState([])
  const [estadosProyecto, setEstadosProyecto] = useState([])
  const [tiposRequerimiento, setTiposRequerimiento] = useState([])
  const [prioridad, setPrioridad] = useState([])
  const [complejidad, setComplejidad] = useState([])

    // Cargar catálogos al montar el componente
    useEffect(() => {
      const fetchCatalogos = async () => {
        try {
          const usuarios = await proyectoService.getUsuarios()
          const estadosData = await proyectoService.getEstadosProyecto()
          const tiposRequerimientoData = await proyectoService.getTiposRequerimiento()
          const prioridadesData = await proyectoService.getPrioridad()
          const complejidadesData = await proyectoService.getComplejidad()
  
          setEstadosProyecto(estadosData.results)
          setUsuarios(usuarios)
          setTiposRequerimiento(tiposRequerimientoData.results)
          setPrioridad(prioridadesData.results)
          setComplejidad(complejidadesData.results)
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
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await proyectoService.createProyecto(formData)
      setLoading(false)
      alert('¡El proyecto se registró exitosamente!')
      navigate('/proyecto')  // Redirige a la lista de proyectos después de crear
    } catch (error) {
      console.error('Error al crear el proyecto:', error)
      setError('Error al crear el proyecto. Inténtalo de nuevo.')
      setLoading(false)
    }
  }
  const menuType = 'admin' 

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarComponent menuType={menuType} />
    <div className="flex-1 p-8 bg-white overflow-y-auto">
      <BackButton label="Volver" />

        <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Crear Nuevo Proyecto</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-gray-700">Fecha Requerimiento</label>
            <input
                type="date"
                name="fechaRequerimiento"
                value={formData.fechaRequerimiento}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700">Usuario encargado</label>
              <select
                name="idUsuariEncargado"
                value={formData.idUsuariEncargado}
                onChange={handleChange}
                required
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona un usuario</option>
                {usuarios.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
            <label className="block text-gray-700">Nombre del Proyecto</label>
            <input
                type="text"
                name="nombreProyecto"
                value={formData.nombreProyecto}
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
            <label className="block text-gray-700">Fecha Estimado de Inicio</label>
            <input
                type="date"
                name="fechaEstimadoInicio"
                value={formData.fechaEstimadoInicio}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700">Planificado</label>
            <input
                type="checkbox"
                name="planificado"
                checked={formData.planificado}
                onChange={handleChange}
                className="mr-2"
            />
            <span>{formData.planificado ? 'Sí' : 'No'}</span>
            </div>

            <div className="mb-4">
            <label className="block text-gray-700">Estado del proyecto</label>
              <select
                name="idEstadoProyecto"
                value={formData.idEstadoProyecto}
                onChange={handleChange}
                required
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona un estado</option>
                {estadosProyecto.map((estado) => (
                  <option key={estado.idEstadoProyecto} value={estado.idEstadoProyecto}>
                    {estado.estadoProyecto}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
            <label className="block text-gray-700">Complejidad</label>
              <select
                name="idComplejidad"
                value={formData.idComplejidad}
                onChange={handleChange}
                required
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona la complejidad</option>
                {complejidad.map((complejidad) => (
                  <option key={complejidad.idComplejidad} value={complejidad.idComplejidad}>
                    {complejidad.complejidad}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
            <label className="block text-gray-700">TipoRequerimiento</label>
              <select
                name="idTipoRequerimiento"
                value={formData.idTipoRequerimiento}
                onChange={handleChange}
                required
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona el tipo de Requerimiento</option>
                {tiposRequerimiento.map((tipoRequerimiento) => (
                  <option key={tipoRequerimiento.idTipoRequerimiento} value={tipoRequerimiento.idTipoRequerimiento}>
                    {tipoRequerimiento.tipoRequerimiento}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
            <label className="block text-gray-700">Prioridad</label>
              <select
                name="idPrioridad"
                value={formData.idPrioridad}
                onChange={handleChange}
                required
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona la prioridad</option>
                {prioridad.map((prioridad) => (
                  <option key={prioridad.idPrioridad} value={prioridad.idPrioridad}>
                    {prioridad.prioridad}
                  </option>
                ))}
              </select>
            </div>

            <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
            {loading ? 'Creando...' : 'Crear Proyecto'}
            </button>
        </form>
        </div>
    </div>
  </div>

  )
}
