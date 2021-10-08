import React, { useState } from 'react'

import * as Yup from 'yup'

import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'
import { useTheme } from 'styled-components'
import { Buttom } from '../../components/Buttom'
import { Input } from '../../components/Input'
import { InputPassword } from '../../components/InputPassword'

import { Container, Header, Form, SubTitle, Title, Footer } from './styles'
import { useNavigation } from '@react-navigation/core'

interface NavigationProps {
  navigate: (screens?: string) => void
}

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation<NavigationProps>()

  const theme = useTheme()

  const handleSignIn = async () => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória'),
      })

      await schema.validate({ email, password })
    } catch (error) {
      console.log(error)
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message)
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Occorreu um erro ao fazer login, verifique as credenciais'
        )
      }
    }
  }

  const handleNewAccount = () => {
    navigation.navigate('SignUpFirstStep')
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />
            <InputPassword
              iconName='lock'
              placeholder='Senha'
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Buttom
              title='Login'
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />

            <Buttom
              title='Criar conta gratuita'
              color={theme.colors.background_secondary}
              light={true}
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
