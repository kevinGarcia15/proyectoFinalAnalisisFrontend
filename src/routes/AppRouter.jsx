
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthRoute } from '../routes/AuthRoute';


import {
  Employee,
  Payroll,
  Profile,
  Store,
  Dashboard,
  Company,
  VerCompanies
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
      <Route path='/profile' element={<AuthRoute><Profile /></AuthRoute>}/>
      <Route path='/ver-companies' element={<AuthRoute><VerCompanies /></AuthRoute>}/>
      <Route path='/company' element={<AuthRoute>< Company/></AuthRoute>}/>
      <Route path='/employee' element={<AuthRoute><Employee /></AuthRoute>}/>
      <Route path='/Payroll' element={<AuthRoute> <Payroll/> </AuthRoute>}/>
      <Route path='/store' element={<AuthRoute>< Store/></AuthRoute>}/>
    </Routes>
    </>
  )
}

export default AppRouter