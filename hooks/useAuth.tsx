import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  load: boolean
}


const AuthContext = createContext<IAuth>({
      user: null,
      signUp: async () => {},
      signIn: async () => {},
      logout: async () => {},
      error: null,
      load: false
})

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [load, setLoad] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    const [initLoading, setInitLoading] = useState(true)
    const route = useRouter()

    useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
          setLoad(false)
        } else {
          // Not logged in...
          setUser(null)
          setLoad(true)
          route.push('/login')
        }

        setInitLoading(false)
      }),
    [auth]
  )
    
    const signUp = async (email: string, password: string) => {
        setLoad(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
           setUser(userCredential.user)
           route.push('/')
           setLoad(false)
        }).catch((error) => alert(error.message))
        .finally(() => setLoad(false))
    }

    const signIn = async (email: string, password: string) => {
        setLoad(true)

        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
           setUser(userCredential.user)
           route.push('/')
           setLoad(false)
        }).catch((error) => alert(error.message))
        .finally(() => setLoad(false))
    }

    const logout = async () => {
        setLoad(true)

        signOut(auth).then(() => {
            setUser(null)
        }).catch((error) => alert(error.message))
        .finally(() => setLoad(false))
    }


    const memoryVal = useMemo(() => ({
        user, signUp, signIn, error, load, logout,
    }), [user, load])
    
  return (
       <AuthContext.Provider
        value={memoryVal}
       >
         {!initLoading && children}
       </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext)
}