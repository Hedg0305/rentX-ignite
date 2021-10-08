import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'
import React from 'react'
import { AuthProvider } from './auth'

interface AppProviderPros {
  children: ReactNode
}

function AppProvider({ children }: AppProviderPros) {
  return <AuthProvider>{children}</AuthProvider>
}

export { AppProvider }
