// contexts/AuthContext.js
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { jwtDecode } from "jwt-decode";

export interface User {
    email: string | null,
    photo: string | null,
    conn: boolean
}

interface AuthResult {
    success: boolean
    error?: string
}

interface AuthContextType {
    user: User | null,
    refresh: () => void
    login: (email: string, password: string) => Promise<AuthResult>
    get_oauth: () => Promise<string>
    logout: () => void,
    loading: boolean
}

interface LoginSuccess {
  Success: {
    jwt: {
      token: string
    }
  }
}

function isLoginSuccess(response: any): response is LoginSuccess {
  return response && response.Success != null
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
    refresh()
    setLoading(false)
  }, [])

  const refresh = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      return
    }

    const response = await fetch("https://api.boilerrate.com/auth/userinfo", {
      method: "GET",
      headers: {"Authorization": `Bearer ${token}`}
    })

    const data = await response.json()

    if (data.conn) {
      setUser({
        email: data.email,
        photo: data.photo,
        conn: true
      })
    } else {
      setUser({
        email: data.email,
        photo: null,
        conn: false
      })
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('https://api.boilerrate.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && isLoginSuccess(data)) {
        
        console.log(data)
        const token = data.Success.jwt.token
        
        localStorage.setItem('token', token)
        
        refresh()

        return { success: true }
      } else {
        return { success: false, error: data.Failure }
      }
    } catch (error) {
      return { success: false, error: `${error}` }
    }
  }

  const get_oauth = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      return ''
    }

    let response = await fetch('https://api.boilerrate.com/auth/oauth/get_route', {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`},
    })

    const data = await response.json();

    return data.auth_url
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, refresh, login, get_oauth, logout, loading }}>
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