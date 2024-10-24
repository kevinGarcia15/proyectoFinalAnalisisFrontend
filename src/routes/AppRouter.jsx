
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthRoute } from '../routes/AuthRoute';


import {
  Profile,
  Dashboard,
  CrearProyecto
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
      <Route path='/dashboard' element={<AuthRoute>< Dashboard/></AuthRoute>}/>
      <Route path='/proyecto/crearproyectos' element={<AuthRoute>< CrearProyecto/></AuthRoute>}/>
      <Route path='/profile' element={<AuthRoute><Profile /></AuthRoute>}/>
    </Routes>
    </>
  )
}

export default AppRouter