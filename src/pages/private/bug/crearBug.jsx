import React, { useState, useEffect } from 'react'
import { bugService } from '../../../services/bug-service'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SidebarComponent from '@/components/sidebarComponent';
import BackButton from '@/components/BackButton';

export const CrearBug = () => {
  const { idPrueba } = useParams() // Obtener el ID del proyecto desde la URL

  const [formData, setFormData] = useState({
    bug: '',
    idUsuarioEncargado: '',
    idEstadoBug: 1,
    idPrueba: idPrueba,
    idClasificacion: '',
  })

  // Estados para cargar los catálogos
  const [usuarios, setUsuarios] = useState([])
  const [clasificaciones, setClasificaciones] = useState([])

  // Cargar catálogos al montar el componente
  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const usuarios = await bugService.getUsuarios()
        const clasificacionesData = await bugService.getClasificaciones()
        
        setUsuarios(usuarios)
        setClasificaciones(clasificacionesData.results)
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
      await bugService.createBug(formData)
      setLoading(false)
      alert('¡El bug se registró exitosamente!')
      navigate('/pruebas')  // Redirige a la lista de bugs después de crear
    } catch (error) {
      console.error('Error al crear el bug:', error)
      setError('Error al crear el bug. Inténtalo de nuevo.')
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
          <h2 className="text-2xl font-semibold mb-6">Registrar Nuevo Bug</h2>
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Descripción del Bug</label>
              <input
                type="text"
                name="bug"
                value={formData.bug}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Usuario Encargadp</label>
              <select
                name="idUsuarioEncargado"
                value={formData.idUsuarioEncargado}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
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
              <label className="block text-gray-700">Clasificación</label>
              <select
                name="idClasificacion"
                value={formData.idClasificacion}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Selecciona la clasificación</option>
                {clasificaciones.map((clasificacion) => (
                  <option key={clasificacion.idClasificacion} value={clasificacion.idClasificacion}>
                    {clasificacion.clasificacion}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? 'Registrando...' : 'Registrar Bug'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
