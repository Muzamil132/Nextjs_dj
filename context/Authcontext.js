import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
// const NEXT_URL="http://localhost:3000"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
   const NEXT_URL =  'https://nextjs-dj.vercel.app'
                                     
  const router = useRouter()

  useEffect(() => checkUserLoggedIn(), [])

  // Register user
  const register = async (user) => {

    console.log(user)
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      console.log(data.user)
      router.push('/account/dashboard')
    } else {
      setError(data.message)
      setError(null)
    }
  }

  // Login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/account/dashboard')
    } else {
      setError(data.message)
      setError(null)
    }
  }

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    })

    if (res.ok) {
      setUser(null)
      router.push('/')
   
    }else{
       toast.error("Something went wrong")
    }
  }

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`)
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
    } else {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext