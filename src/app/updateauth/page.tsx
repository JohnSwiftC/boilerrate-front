'use client'

import { useAuth } from '@/../contexts/AuthContext'
import { useSearchParams } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { redirect, RedirectType } from 'next/navigation'

export default function UpdateAuth() {
    const { user } = useAuth()

    const searchParams = useSearchParams()

    const token = searchParams.get("token")
    if (!token) {
        return
    }

    const decoded: { email: string, conn: string, photo: string | null} = jwtDecode(token)
    
    if (user) {
        user.email = decoded.email
        user.conn = true
        user.photo = decoded.photo
    }

    redirect('/', RedirectType.replace)
}