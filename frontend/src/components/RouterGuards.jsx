import React from 'react'
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

// priveteRoute -> sir login hone ke baad access mile
export function priveteRoute({ children }) {
    const isLoggedIn = localStorage.getItem('isAuthenticated') === true
    if (isLoggedIn) {
        return children
    } else {
        return navigate('/login')
    }
}

export function publicRoute({ children }) {
    const isLoggedIn = localStorage.getItem('isAuthenticated') === true
    if (isLoggedIn) {
        return children
    } else {
        return navigate('/home')
    }
}