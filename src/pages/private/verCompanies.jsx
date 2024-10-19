import React, { useState, useEffect } from 'react'
import { companyService } from '../../services/company-service'
import { Link } from 'react-router-dom'
import SidebarComponent from '@/components/sidebarComponent'

export const VerCompanies = () => {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamada al método getCompanies del servicio companyService
        const companiesData = await companyService.getCompanies()
        // Si la respuesta es exitosa, actualiza el estado con las compañías
        if (
          companiesData &&
          companiesData.results &&
          companiesData.results.length > 0
        ) {
          setCompanies(companiesData.results)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error al obtener las compañías:', error)
        setError(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div>
     
      <h2>Lista de Compañías</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Descripción</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.phone}</td>
              <td>{company.description}</td>
              <td>{company.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        <Link to='/dashboard'>Volver al Dashboard</Link>
      </button>
    </div>
  )
}
