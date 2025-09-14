'use client'
import { useAuth } from '@/../contexts/AuthContext'
import { useSearchParams } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { redirect, RedirectType } from 'next/navigation'
import { useEffect } from 'react'

export default function UpdateAuth() {
    const { user } = useAuth()
    const searchParams = useSearchParams()
    
    useEffect(() => {
        const token = searchParams.get("token")
        if (!token || !user) {
            return
        }

        localStorage.setItem('token', token)
        
        redirect('/', RedirectType.replace)
    }, [searchParams, user])
    
    return <div>Updating authentication...</div>
}