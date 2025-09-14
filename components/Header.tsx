'use client'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { useState, useRef, useEffect } from 'react'

export default function Header() {
  const { user, logout, get_oauth } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<any>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLinkedInConnect = async () => {
    const oauthUrl = await get_oauth()
    if (oauthUrl) {
      window.location.href = oauthUrl
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Home link */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              BoilerRate
            </Link>
          </div>
          
          {/* Right side - Auth */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative flex flex-row" ref={dropdownRef}>
                {/* LinkedIn Connect Button (when no photo) */}
                {!user.photo && (
                  <button
                    onClick={handleLinkedInConnect}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors mr-4"
                  >
                    Connect LinkedIn
                  </button>
                )}

                {/* Profile Photo or Default Avatar */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center rounded-full p-1 border border-gray-300 hover:border-gray-400 transition-colors"
                >
                  {user.photo ? (
                    <img 
                      src={user.photo} 
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.email ? user.email[0].toUpperCase() : 'U'}
                      </span>
                    </div>
                  )}
                   <svg 
                    className={`w-3 h-3 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      {/* User Email */}
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm text-gray-700 font-medium">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          {user.conn ? 'LinkedIn Connected' : 'LinkedIn Not Connected'}
                        </p>
                      </div>
                      
                      {/* Logout Button */}
                      <button
                        onClick={() => {
                          logout()
                          setIsDropdownOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Link
                  href="/login"
                  className="bg-gray-400 hover:bg-gray-700 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors m-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-yellow-500 hover:bg-gray-700 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}