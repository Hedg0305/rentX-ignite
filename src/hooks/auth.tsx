import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'
import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'
import { database } from '../database/index'
import { User as ModelUser } from '../database/models/user'

interface User {
  id: string
  user_id: string
  email: string
  name: string
  driver_license: string
  avatar: string
  token: string
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
  signOut: () => Promise<void>
  updateUser: (user: User) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<User>({} as User)

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post('/sessions', { email, password })

      const { token, user } = response.data as unknown as AuthState
      api.defaults.headers.authorization = `Bearer ${token}`

      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        await userCollection.create((newUser) => {
          newUser.user_id = user.user_id
          newUser.email = user.email
          newUser.avatar = user.avatar
          newUser.driver_license = user.driver_license
          newUser.token = token
        })
      })

      setData({ ...user, token })
    } catch (error) {
      throw new Error(error)
    }
  }
  const signOut = async () => {
    try {
      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id)
        await userSelected.destroyPermanently()
      })

      setData({} as User)
    } catch (error) {
      throw new Error(error)
    }
  }

  const updateUser = async (user: User) => {
    try {
      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id)
        await userSelected.update((userData) => {
          userData.name = user.name
          userData.driver_license = user.driver_license
          userData.avatar = user.avatar
        })
      })

      setData(user)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users')
      const response = await userCollection.query().fetch()

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User
        api.defaults.headers.authorization = `Bearer ${userData.token}`
        setData(userData)
      }
    }
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
