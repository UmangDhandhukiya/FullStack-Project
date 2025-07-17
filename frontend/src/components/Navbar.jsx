// import { LogOut, ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("isAuthenticated", true)
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated'); // ✅ Correct key
    navigate('/login');
  }

  return (
    // <nav className="bg-white border-gray-200">
    //   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    //     <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
    //       <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Marwadi-log" />
    //       <span className="self-center text-2xl font-semibold whitespace-nowrap">Marwadi-Commerce</span>
    //     </a>
    //     <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
    //       <span className="sr-only">Open main menu</span>
    //       <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
    //         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
    //       </svg>
    //     </button>
    //   </div>
    // </nav>
    <nav className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Title */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 w-8"
              alt="Logo"
            />
            <span className="text-xl font-bold text-purple-700">
              Marwadi-Commerce
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-purple-600 font-medium">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium">
              About
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-purple-600 font-medium">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t border-gray-200">
          <Link to="/" className="block text-gray-700 hover:text-purple-600">
            Home
          </Link>
          <Link to="/shop" className="block text-gray-700 hover:text-purple-600">
            Shop
          </Link>
          <Link to="/about" className="block text-gray-700 hover:text-purple-600">
            About
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="block text-gray-700 hover:text-purple-600">Profile</Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-purple-600 hover:underline">Login</Link>
              <Link to="/register" className="block text-purple-600 hover:underline">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar