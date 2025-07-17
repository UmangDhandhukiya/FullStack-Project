import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { register } from '../api/auth';
import { useAuth } from '../Context/AuthContext';

export default function Reg() {

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  let name1 = useRef('')
  let email1 = useRef('')
  let password1 = useRef('')

  async function handleSubmit(e) {
    e.preventDefault()
    // const formData = new FormData(e.currentTarget)
    // const name = formData.get('name')
    // const email = formData.get('email')
    // const password = formData.get('password')
    let name = name1.current.value
    let email = email1.current.value
    let password = password1.current.value
    
    try {
      setLoading(true)
      setError('')
      const user = await register({ name, email, password })
      setUser(user)
      navigate('/login')
    } catch (err) {
      console.log("Error:", err)
      setError('Registration failed, please try again!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="bg-purple-500 text-white rounded-full p-3 mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-purple-700">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Sign up to get started</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              ref={name1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              ref={email1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                ref={password1}
              />
              <span
                onClick={togglePassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            {loading ? 'Creating account...' : 'Create account'}
            {/* Sign Up */}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}