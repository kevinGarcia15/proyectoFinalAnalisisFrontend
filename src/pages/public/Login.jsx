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
    <>
      <div className='flex flex-col gap-2 p-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='ejemplo@gmail.com'
        />
        <b />
        <b />
        <Input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='********'
        />
        <b />
        <b />
        <b />
        <button
          type='submit'
          onClick={handleSubmit}
          className='bg-gray-800 text-white font-bold py-2 px-4 rounded mt-6'
        >
          Ingresar
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}{' '}

        <div className='flex gap-2 items-center'>
          <Checkbox id='terms' />
          <Label htmlFor='terms'>payroll-plataform privacy & terms</Label>
        </div>
      </div>
    </>
  )
}
