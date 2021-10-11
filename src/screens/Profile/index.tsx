import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { useTheme } from 'styled-components'
import { BackButton } from '../../components/BackButton/inde'

import { Feather } from '@expo/vector-icons'
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
} from './styles'

export function Profile() {
  const theme = useTheme()
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  const handleSignOut = () => {
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
          <HeaderTitle>Editar pergil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather name='power' size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>
        <PhotoContainer>
          <Photo
            source={{
              uri: 'https://avatars.githubusercontent.com/u/61093997?v=4',
            }}
          />
          <PhotoButton onPress={() => {}}>
            <Feather
              name='camera'
              size={24}
              color={theme.colors.background_primary}
            />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  )
}