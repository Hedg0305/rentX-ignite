import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import * as Yup from 'yup'

import { BackButton } from '../../../components/BackButton/inde'
import { Bullet } from '../../../components/Bullet'
import { Buttom } from '../../../components/Buttom'
import { Input } from '../../../components/Input'

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles'

interface NavigationProps {
  navigate: (screen: string, user: {}) => void
  goBack: () => void
}

export function SignUpFirstStep() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [driverLicense, setDriverLicense] = useState('')

  const navigation = useNavigation<NavigationProps>()

  const handleBack = () => navigation.goBack()

  const handleNextStep = async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('Cnh é obrigatória'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('Email obrigatório'),
        name: Yup.string().required('Nome é obrigatório'),
      })
      const data = { name, email, driverLicense }
      await schema.validate(data)

      navigation.navigate('SignUpSecondStep', { user: data })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message)
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active={true} />
              <Bullet active={false} />
            </Steps>
          </Header>
          <Title>Crie sua {'\n'} conta</Title>
          <Subtitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName='mail'
              placeholder='Email'
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='number-pad'
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Buttom title='Próximo' onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
