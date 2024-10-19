import { Link } from 'react-router-dom'
import { Navigation } from '../../components/Navigation'
import { Button } from '@/components/ui/button'

export const Home = () => (
  <>
    <Navigation />
    <div className='flex flex-col gap-4 items-center'>
      <h2 className='font-bold text-4xl'>Payroll Plataform</h2>
      <div className='flex flex-col gap-2'>
        <b />
        <b />
        <b />
        <Link to='/register-company'>
          <Button>Prueba Gratis</Button>
        </Link>
        <Link to='/login'>
          <Button className='bg-blue-500 hover:bg-blue-700 text-white '>
            login
          </Button>
        </Link>
      </div>
    </div>
  </>
)

