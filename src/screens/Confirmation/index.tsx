import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { ConfirmButton } from '../../components/ConfirmButton'

import { Container, Content, Title, Message, Footer } from './styles'
import { StatusBar, useWindowDimensions } from 'react-native'
import { About } from '../../components/Car/styles'

type NavigationProps = {
  navigate: (screen: string) => void
}

interface Props {
  title: string
  message: string
  nextSrceenRoute: string
}

export function Confirmation() {
  const { width } = useWindowDimensions()

  const navigation = useNavigation<NavigationProps>()
  const route = useRoute()
  const { message, nextSrceenRoute, title } = route.params as Props

  const handleConfirmRental = () => {
    navigation.navigate(nextSrceenRoute)
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title='Ok' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  )
}
