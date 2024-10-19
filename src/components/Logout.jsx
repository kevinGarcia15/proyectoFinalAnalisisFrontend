import sessionService from "@/services/session-service"
import { Link } from "react-router-dom"


export const Logout = () => {
  const handleLogout = async () => {
    try {
      await sessionService.remove('token')
      await sessionService.remove('data_user')
      console.log('Token eliminado del sessionStorage')
    } catch (error) {
    //   console.error('Error al eliminar el token del sessionStorage:', error)
    }
  }

  return (
    <Link
      to='/login'
      onClick={handleLogout}
      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
    >
      Logout
    </Link>
  )
}

