


const simulateAuthentication = (setUserInfo, navigate) => {
  // Simula la lógica de autenticación
  const username = 'admin'
  const password = 'test'



  if (username === 'admin' && password === 'test') {
    setUserInfo(username)
    console.log('Usuario autenticado. Redirigiendo...')
    console.log(`Usuario: ${username}`);
    console.log(`Password: ${password}`);

    navigate('/proyecto') // Redirige a la ruta privada
  } else {
    console.log('Credenciales no válidas.')
  }
}

export default simulateAuthentication


