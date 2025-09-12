'use client'

import { useAuth } from '@/../contexts/AuthContext'

export default function UpdateAuth() {
    const { user } = useAuth();
}