import React, { useState, useEffect } from 'react'
import { FlatList, StatusBar } from 'react-native'

import { CarDTO } from '../../dtos/CarDTO'
import api from '../../services/api'
import { useTheme } from 'styled-components'
import { AntDesign } from '@expo/vector-icons'

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles'
import { BackButton } from '../../components/BackButton/inde'
import { useNavigation } from '@react-navigation/native'
import { Car } from '../../components/Car'
import Load from '../../components/Load'
import { LoadAnimation } from '../../components/LoadAnimation'

interface NavigationProps {
  navigate: (screen: string, car: {}) => void
  goBack: () => void
}

interface CarProps {
  car: CarDTO
  id: string
  user_id: string
  startDate: string
  endDate: string
}

export function MyCars() {
  const navigation = useNavigation<NavigationProps>()
  const theme = useTheme()

  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  const handleBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    async function loadCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1')
        setCars(response.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    loadCars()
  }, [])

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguem
        </Title>
        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  )
}
