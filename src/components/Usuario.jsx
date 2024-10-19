// Componente Usuario.jsx
// import React from 'react'

const Usuario = () => {
  const userDataJSON = sessionStorage.getItem('data_user')
  const userData = JSON.parse(userDataJSON)
  const userName = userData ? userData.username : ''
  const rol = userData ? userData.role : ''

  return (
    <>
      <span>
        {userName} {rol}
      </span>
    </>
  )
}

export default Usuario
