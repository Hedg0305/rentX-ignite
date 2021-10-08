import React, { useEffect, useState } from 'react'
import { BackHandler, StatusBar, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import { Container, Header, TotalCars, HeaderContent, CarList } from './styles'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import { Car } from '../../components/Car'
import api from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'
import Load from '../../components/Load'
import { useTheme } from 'styled-components'
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler'
import { LoadAnimation } from '../../components/LoadAnimation'

type NavigationProps = {
  navigate: (screen: string, car?: {}) => void
}

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()

  const navigation = useNavigation<NavigationProps>()

  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(event: any, ctx: any) {
      positionX.value = event.translationX + ctx.positionX
      positionY.value = event.translationY + ctx.positionY
    },
    onEnd() {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    },
  })

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', { car })
  }

  const handleOpenMyCars = () => {
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get<CarDTO[]>('/cars')
        setCars(response.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
  })

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: 'absolute', bottom: 13, right: 22 },
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name='ios-car-sport'
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})