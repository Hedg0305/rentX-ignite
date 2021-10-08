import React from 'react'

import LottieView from 'lottie-react-native'

import Load_car from '../../assets/load_car.json'

import { Container } from './styles'

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={Load_car}
        autoPlay
        style={{ height: 200 }}
        resizeMode='contain'
        loop
      />
    </Container>
  )
}
