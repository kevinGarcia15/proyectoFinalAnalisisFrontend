// Navigation.jsx
import { Link } from 'react-router-dom'

export const AuthNavigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/company'>Company</Link>
        </li>
        <li>
          <Link to='/payroll'>Payroll</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <Link to='/store'>Store</Link>
        </li>
        <li>
          <Link to='/employee'>Employee</Link>
        </li>
      </ul>
    </nav>
  )
}
