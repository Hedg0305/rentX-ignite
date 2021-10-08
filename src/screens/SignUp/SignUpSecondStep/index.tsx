import { useNavigation } from '@react-navigation/core'
import React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import { useTheme } from 'styled-components'
import { BackButton } from '../../../components/BackButton/inde'
import { Bullet } from '../../../components/Bullet'
import { Buttom } from '../../../components/Buttom'
import { InputPassword } from '../../../components/InputPassword'

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
}

export function SignUpSecondStep() {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()

  const handleBack = () => navigation.goBack()

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
            <InputPassword iconName='lock' placeholder='Senha' />
            <InputPassword iconName='lock' placeholder='Repetir senha' />
          </Form>

          <Buttom title='Cadastrar' color={theme.colors.success} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
