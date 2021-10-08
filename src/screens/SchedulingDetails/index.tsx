import React, { useState, useEffect } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import { BackButton } from '../../components/BackButton/inde'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles'
import { CarDTO } from '../../dtos/CarDTO'
import { getPlataformDate } from '../../utils/getPlataformDate'

import { Buttom } from '../../components/Buttom'
import { useTheme } from 'styled-components'
import { format } from 'date-fns'
import api from '../../services/api'
import { Alert } from 'react-native'

type NavigationProps = {
  navigate: (screen: string, props: {}) => void
  goBack: () => void
}

interface Params {
  car: CarDTO
  dates: any
}

interface RentalPeriod {
  start: string
  end: string
}

export function SchedulingDetails() {
  const [loading, setLoading] = useState(false)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  )

  const theme = useTheme()
  const route = useRoute()
  const { car, dates } = route.params as Params

  const rentTotal = Number(dates.length * Number(car.rent.price))

  const navigation = useNavigation<NavigationProps>()

  const handleConfirmRental = async () => {
    setLoading(true)

    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ]

    await api.post(`/schedules_byuser`, {
      user_id: 1,
      car,
      startDate: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    })

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() =>
        navigation.navigate('Confirmation', {
          nextSrceenRoute: 'Home',
          title: 'Carro alugado!',
          message: `Agora é só ir\naté a concessionária da rentX\npegar o seu automóvel`,
        })
      )
      .catch(() => {
        setLoading(false)
        Alert.alert('Não foi possível confirmar o agendamento')
      })
  }

  const handleBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    })
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessorie) => (
            <Accessory
              key={accessorie.type}
              name={accessorie.name}
              icon={getAccessoryIcon(accessorie.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod?.start}</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(24)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod?.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R${rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Buttom
          title='Alugar agora'
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  )
}
