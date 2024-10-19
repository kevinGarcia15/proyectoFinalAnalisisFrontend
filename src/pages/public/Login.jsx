import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { Label } from '@radix-ui/react-label'
import { Checkbox } from '@radix-ui/react-checkbox'
import { authService } from '@/services/auth-services'

export const Login = () => {
  const navigate = useNavigate() // Hook para navegar a otras rutas
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // Llama al método de inicio de sesión del servicio authService
      await authService.login(formData.email, formData.password)
      // Si el inicio de sesión es exitoso, redirige al usuario al dashboard
      navigate('/dashboard')
    } catch (error) {
      // Si hay un error en el inicio de sesión, muestra una alerta al usuario
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@gmail.com"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}

          <div className="mb-4 flex items-center">
            <Checkbox
              id="terms"
              className="mr-2"
              aria-label="Aceptar términos y condiciones"
            />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              Acepto los <Link to="#" className="text-indigo-500 hover:underline">términos y condiciones</Link>
            </Label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-indigo-500 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  )
}
