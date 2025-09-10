"use client"
import { useState, useEffect } from 'react';
import { useAuth, User } from '../../contexts/AuthContext'


const Root = () => {

  const { user } = useAuth();

  const getEmail = (user: User | null): string => {
    if (user) {
      if (user.email) {
        return user.email
      }
    }

    return "None"
  }

  return (
    <div className="flex flex-col">
      <div>
        Server is up!
      </div>
      <div>
        {getEmail(user)}
      </div>
    </div>
  )
}

export default Root;