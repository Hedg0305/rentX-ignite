import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/auth'
import AppTabRouts from './app.tab.routes'
import AuthRoutes from './auth.routes'

const Routes = () => {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      {user.token ? <AppTabRouts /> : <AuthRoutes />}
    </NavigationContainer>
  )
}

export default Routes
