import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useState } from 'react'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import { useTheme } from 'styled-components'
import { BackButton } from '../../../components/BackButton/inde'
import { Bullet } from '../../../components/Bullet'
import { Buttom } from '../../../components/Buttom'
import { InputPassword } from '../../../components/InputPassword'
import api from '../../../services/api'

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
  goBack: () => void
  navigate: (screen: string, props: {}) => void
}

interface Params {
  user: {
    name: string
    email: string
    driverLicense: string
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const route = useRoute()

  const { user } = route.params as Params

  const handleBack = () => navigation.goBack()

  const handleRegister = async () => {
    if (!password || !confirmPassword) {
      return Alert.alert('Informe a senha e confirme')
    }
    if (password != confirmPassword) {
      return Alert.alert('As senhas não são iguais')
    }

    await api
      .post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          nextSrceenRoute: 'SignIn',
          title: 'Conta criada!',
          message: `Agora é só fazer login\ne aproveitar`,
        })
      })
      .catch(() => {
        Alert.alert('Opa', 'Não foi possível cadastrar')
      })
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
            <FormTitle>2. Senha</FormTitle>
            <InputPassword
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
            <InputPassword
              iconName='lock'
              placeholder='Repetir senha'
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Form>

          <Buttom
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
