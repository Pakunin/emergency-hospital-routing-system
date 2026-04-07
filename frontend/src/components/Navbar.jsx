import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-darkCard border-b border-gray-800 p-4 shadow-md z-50 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2 text-accentRed">
          <span>🚨</span> AI Rescue Route
        </Link>
        <div className="flex gap-6 font-medium">
          <Link to="/" className="hover:text-accentRed transition-colors">Dispatch</Link>
          <Link to="/dashboard" className="hover:text-accentRed transition-colors">Dashboard</Link>
          <Link to="/about" className="hover:text-accentRed transition-colors">About</Link>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
