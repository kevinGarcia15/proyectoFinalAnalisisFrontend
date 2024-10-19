import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <>
      <h1>Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to='/'>Volver al inicio</Link>
    </>
  )
}


