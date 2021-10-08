import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'

import {
  Container,
  Header,
  Title,
  ReantalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles'

import ArrowSvg from '../../assets/arrow.svg'
import { StatusBar } from 'react-native'
import { Buttom } from '../../components/Buttom'
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDatesProps,
} from '../../components/Calendar'
import { BackButton } from '../../components/BackButton/inde'
import { format } from 'date-fns/esm'
import { getPlataformDate } from '../../utils/getPlataformDate'
import { CarDTO } from '../../dtos/CarDTO'

type NavigationProps = {
  navigate: (screen: string, { car: CarDTO, dates: any }) => void
  goBack: () => void
}

interface RentalPeriod {
  startFormated: string
  endFormated: string
}

interface Params {
  car: CarDTO
}

export function Scheduling() {
  const route = useRoute()
  const { car } = route.params as Params

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  )
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>(
    {} as MarkedDatesProps
  )
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  )

  const navigation = useNavigation<NavigationProps>()

  const handleConfirmRental = () => {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    })
  }

  const handleBack = () => {
    navigation.goBack()
  }

  const handleChangeDate = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectedDate(end)
    const interval = generateInterval(start, end)
    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormated: format(
        getPlataformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      endFormated: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <BackButton onPress={handleBack} color={useTheme().colors.shape} />
        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguem
        </Title>

        <ReantalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod?.startFormated}>
              {rentalPeriod?.startFormated}
            </DateValue>
          </DateInfo>
          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod?.endFormated}>
              {rentalPeriod?.endFormated}
            </DateValue>
          </DateInfo>
        </ReantalPeriod>
      </Header>
      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Buttom
          title='Confirmar'
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod?.startFormated}
        />
      </Footer>
    </Container>
  )
}
