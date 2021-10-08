import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'
import React, { createContext, useContext, useState } from 'react'
import api from '../services/api'

interface User {
  id: string
  email: string
  name: string
  driver_license: string
  avatar: string
}

interface AuthState {
  token: string
  user: User
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signIn: (credenciais: SignInCredentials) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>({} as AuthState)

  const signIn = async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/sessions', { email, password })

    const { token, user } = response.data as unknown as AuthState
    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }
  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
