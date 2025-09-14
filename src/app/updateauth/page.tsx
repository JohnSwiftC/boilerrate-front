'use client'
import { useAuth } from '@/../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { redirect, RedirectType } from 'next/navigation'
import { useEffect } from 'react'

export default function UpdateAuth() {
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get("token")
        
        if (!token) {
            return
        }
        
        localStorage.setItem('token', token)
        
        redirect('/', RedirectType.replace)
    }, [])
    
    return <div>Updating authentication...</div>
}