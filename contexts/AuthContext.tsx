// contexts/AuthContext.js
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { jwtDecode } from "jwt-decode";

interface User {
    email: string | null,
}

interface AuthResult {
    success: boolean
    error?: string
}

interface AuthContextType {
    user: User | null,
    login: (email: string, password: string) => Promise<AuthResult>
    logout: () => void,
}

interface LoginSuccess {
  Success: {
    jwt: {
      token: string
    }
  }
}

interface LoginFailure {
  Failure: string
}

function isLoginSuccess(response: any): response is LoginSuccess {
  return response && typeof response.Success.jwt.token === 'string'
}

function isLoginFailure(response: any): response is LoginFailure {
  return response && typeof response.Failure === 'string'
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Important to note here,
  // A user could modify the JWT on the client, but all important
  // operations are held on the backend, so it would only be superficial
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded: User = jwtDecode(token);

      if (typeof decoded.email === "string") {
        setUser({ email: decoded.email })
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('https://api.boilerrate.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = response.json()

      if (response.ok && isLoginSuccess(data)) {
        const data = await response.json()
        console.log(data)
        const token = data.Success.jwt.token
        
        localStorage.setItem('token', token)
        
        const decoded: User = jwtDecode(token);

        if (typeof decoded.email === "string") {
          setUser({ email: decoded.email });
        }

        return { success: true }
      } else {
        return { success: false, error: "Could not login" }
      }
    } catch (error) {
      return { success: false, error: 'Network error' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {  
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}