import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { pruebaService } from '../../../services/prueba-service' // Assuming pruebaService exists
import SidebarComponent from '@/components/sidebarComponent';

export const VerPrueba = () => {
  const [prueba, setPrueba] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { id } = useParams() // Get prueba ID from URL
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPrueba = await pruebaService.getPruebaById(id)
        setPrueba(fetchedPrueba)
      } catch (error) {
        console.error('Error obtaining prueba details:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, pruebaService])

  const handleBack = () => navigate('/pruebas') // Go back to pruebas list

  if (loading) {
    return <div>Loading...</div>
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

                {/* Acceptance Criteria (replace with your actual criteria structure) */}
                <h2 className="text-2xl font-semibold mt-6 mb-4">Criterios de Aceptación</h2>
                {prueba.criteriosAceptacion?.map((criterio, index) => (
                    <div key={index} className="mb-2">
                    <p className="text-lg font-medium">{criterio.descripcion}</p>
                    </div>
                ))}
                {!prueba.criteriosAceptacion?.length && (
                    <p className="text-gray-600">No se han definido criterios de aceptación para esta prueba.</p>
                )}

                <button className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" onClick={handleBack}>
                    Volver a la lista de pruebas
                </button>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}