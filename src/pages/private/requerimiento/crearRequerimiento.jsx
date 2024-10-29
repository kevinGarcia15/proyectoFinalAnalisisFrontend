import React, { useState, useEffect } from 'react'
import { requerimientosService } from '../../../services/requerimiento-service'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SidebarComponent from '@/components/sidebarComponent';

export const CrearRequerimiento = () => {
    const { id } = useParams() // Obtener el ID del proyecto desde la URL

  const [formData, setFormData] = useState({
    idProyecto: id,
    requerimiento: '',
    orden: '',
    fechaEstimadoEntrega: '',
    fechaInicioPropuesto: '',
    idUsuarioEncargado: '',
    idEstadoRequerimiento: ''
  })

  const [usuarios, setUsuarios] = useState([])
  const [estadosRequerimiento, setEstadosRequerimiento] = useState([])

  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const usuariosData = await requerimientosService.getUsuarios()
        const estadosData = await requerimientosService.getEstadosRequerimiento()

        setUsuarios(usuariosData)
        setEstadosRequerimiento(estadosData.results)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await requerimientosService.crearRequerimiento(formData)
      setLoading(false)
      alert('¡El requerimiento se registró exitosamente!')
      navigate(`/proyecto/${id}/requerimiento`)
    } catch (error) {
      setError('Error al crear el requerimiento. Inténtalo de nuevo.')
      setLoading(false)
    }
  }
  const menuType = 'admin' 

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarComponent menuType={menuType} />
      <div className="flex-1 p-8 bg-white overflow-y-auto">

        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-6">Crear Nuevo Requerimiento</h2>
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Requerimiento</label>
              <input
                type="text"
                name="requerimiento"
                value={formData.requerimiento}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Orden de prioridad</label>
              <input
                type="number"
                name="orden"
                value={formData.orden}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Fecha Estimado de Entrega</label>
              <input
                type="date"
                name="fechaEstimadoEntrega"
                value={formData.fechaEstimadoEntrega}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Fecha Inicio Propuesto</label>
              <input
                type="date"
                name="fechaInicioPropuesto"
                value={formData.fechaInicioPropuesto}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Usuario Encargado</label>
              <select
                name="idUsuarioEncargado"
                value={formData.idUsuarioEncargado}
                onChange={handleChange}
                required
                className="block w-full bg-white border px-4 py-2 pr-8 rounded shadow focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label className="block text-gray-700">Estado del Requerimiento</label>
              <select
                name="idEstadoRequerimiento"
                value={formData.idEstadoRequerimiento}
                onChange={handleChange}
                required
                className="block w-full bg-white border px-4 py-2 pr-8 rounded shadow focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona un estado</option>
                {estadosRequerimiento.map((estado) => (
                  <option key={estado.idEstadoRequerimiento} value={estado.idEstadoRequerimiento}>
                    {estado.estadoRequerimiento}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? 'Creando...' : 'Crear Requerimiento'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
