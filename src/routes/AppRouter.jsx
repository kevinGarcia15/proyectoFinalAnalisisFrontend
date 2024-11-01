
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthRoute } from '../routes/AuthRoute';


import {
  Profile,
  Proyecto,
  CrearProyecto,
  EditarProyecto,
  VerRequerimientos,
  CrearRequerimiento,
  VerPrueba,
  CrearPrueba
} from '../pages/private'
import { Login,Home, Uikit, Register, NotFound, RegisterCompany} from '../pages/public';



const AppRouter = () => {
  return (

    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register-company' element={<RegisterCompany />} />
      <Route path='/uikit' element={<Uikit />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/login' element={< Login/>}/>


{/* ----------PRIVATE ROUTES-------- */}
      <Route path='/proyecto' element={<AuthRoute>< Proyecto/></AuthRoute>}/>
      <Route path='/proyecto/crearproyectos' element={<AuthRoute>< CrearProyecto/></AuthRoute>}/>
      <Route path='/proyecto/editar/:id' element={<AuthRoute>< EditarProyecto/></AuthRoute>}/>
      <Route path='/proyecto/:id/requerimiento' element={<AuthRoute>< VerRequerimientos/></AuthRoute>}/>
      <Route path='/proyecto/:id/requerimiento/crear' element={<AuthRoute>< CrearRequerimiento/></AuthRoute>}/>
      <Route path='/profile' element={<AuthRoute><Profile /></AuthRoute>}/>

      <Route path='/pruebas' element={<AuthRoute>< VerPrueba/></AuthRoute>}/>
      <Route path='/pruebas/crear' element={<AuthRoute>< CrearPrueba/></AuthRoute>}/>

    </Routes>
    </>
  )
}

export default AppRouter