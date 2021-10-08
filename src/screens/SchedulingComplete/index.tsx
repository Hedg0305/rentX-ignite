import React from 'react'
import { useNavigation } from '@react-navigation/native'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { ConfirmButton } from '../../components/ConfirmButton'

import { Container, Content, Title, Message, Footer } from './styles'
import { StatusBar, useWindowDimensions } from 'react-native'

type NavigationProps = {
  navigate: (screen: string) => void
}

export function SchedulingComplete() {
  const { width } = useWindowDimensions()

  const navigation = useNavigation<NavigationProps>()

  const handleConfirmRental = () => {
    navigation.navigate('Home')
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
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RentX {'\n'}
          pegar o seu automóvel!
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title='Ok' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  )
}
