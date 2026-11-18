import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    <header className="bg-brand-maroon text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-brand-gold flex items-center gap-2">
            <span>Shri Durga Chamcham Wale</span>
          </Link>
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input type="text" placeholder="Search sweets..." className="w-full px-4 py-2 rounded-md text-gray-900" />
              <button className="absolute right-3 top-2.5 text-brand-maroon"><FaSearch /></button>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6 font-semibold">
            <Link to="/" className="hover:text-brand-gold">Home</Link>
            <Link to="/sweets" className="hover:text-brand-gold">Sweets</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="hover:text-brand-gold relative">
              <FaShoppingCart className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
