import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-around py-4 text-white">
          <li>
            <Link
              to="/"
              className="text-lg font-semibold hover:text-indigo-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-lg font-semibold hover:text-indigo-400 transition duration-300"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              to="/uikit"
              className="text-lg font-semibold hover:text-indigo-400 transition duration-300"
            >
              UiKit
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-lg font-semibold hover:text-indigo-400 transition duration-300"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
