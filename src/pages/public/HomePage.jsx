import { Link } from 'react-router-dom'
import { Navigation } from '../../components/Navigation'
import { Button } from '@/components/ui/button'

export const Home = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
    {/* Fondo de héroe */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-30" />

    {/* Contenido principal */}
    <div className="relative z-10 flex flex-col items-center text-center px-6 py-8 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        Bienvenido al Control de Proyectos
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Gestiona tus proyectos de manera eficiente y mantén el control sobre cada tarea y equipo de trabajo.
      </p>

      <Link to="/login">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition duration-200">
          Iniciar sesión
        </Button>
      </Link>      
    </div>

    {/* Sección de beneficios */}
    <div className="relative z-10 mt-12 max-w-4xl mx-auto px-6 py-8 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Características principales</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700">Colaboración en tiempo real</h3>
          <p className="text-gray-600">Trabaja en equipo y mantén a todos sincronizados.</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700">Seguimiento de tareas</h3>
          <p className="text-gray-600">Monitorea el progreso de cada tarea en el proyecto.</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700">Reportes y análisis</h3>
          <p className="text-gray-600">Genera reportes detallados para optimizar tu gestión.</p>
        </div>
      </div>
    </div>
  </div>
)
