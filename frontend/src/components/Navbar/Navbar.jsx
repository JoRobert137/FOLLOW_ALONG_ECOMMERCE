/* eslint-disable react/prop-types */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaSearch, FaHeart } from 'react-icons/fa';

function Navbar({ cartCount = 0 }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleCategory = () => setCategoryOpen(!categoryOpen);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'My Products', to: '/myproducts' },
    { name: 'Add Products', to: '/addproducts' },
  ];

  const categories = ['Electronics', 'Fashion', 'Books', 'Home', 'Toys'];

  return (
    <nav className="bg-blue-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <NavLink to="/" className="flex items-center text-white font-bold text-2xl space-x-2">
            <span>E-Com</span>
          </NavLink>

          {/* Desktop Links + Search */}
          <div className=" md:flex md:items-center md:space-x-8 flex-1 mx-6">

            {/* Navigation Links */}
            {navLinks.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200'
                    : 'text-gray-200 hover:text-white px-4 py-2 rounded-md transition-colors duration-200'
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={toggleCategory}
                className="text-gray-200 hover:text-white px-4 py-2 rounded-md font-semibold flex items-center"
              >
                Categories
              </button>
              {categoryOpen && (
                <div className="absolute top-full mt-1 bg-white text-gray-800 rounded shadow-md w-48">
                  {categories.map((cat, idx) => (
                    <NavLink
                      key={idx}
                      to={`/categories/${cat.toLowerCase()}`}
                      className="block px-4 py-2 hover:bg-blue-100"
                      onClick={() => setCategoryOpen(false)}
                    >
                      {cat}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="ml-6 relative ">
              <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-80"
              />
            </div>

          </div>

          {/* Icons + Profile */}
          <div className="flex items-center space-x-6">
            <NavLink to="/wishlist" className="text-gray-200 hover:text-white p-2 rounded-full">
              <FaHeart size={24} />
            </NavLink>

            <NavLink to="/cart" className="relative text-gray-200 hover:text-white p-2 rounded-full">
              <FaShoppingCart size={28} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>

            <div className="relative">
              <button
                onClick={toggleProfile}
                className="text-gray-200 hover:text-white p-2 rounded-full"
              >
                <FaUserCircle size={28} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-md">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-blue-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className="block px-4 py-2 hover:bg-blue-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    Orders
                  </NavLink>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-blue-100"
                    onClick={() => {
                      setProfileOpen(false);
                      alert('Logged out!');
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
