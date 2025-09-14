'use client'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

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
              <>
                <span className="text-sm text-gray-700">
                  Welcome, {user.email}
                </span>
                {user.photo && (
                  <img src={user.photo}></img>
                )}
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
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