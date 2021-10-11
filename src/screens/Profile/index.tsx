import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { useTheme } from 'styled-components'
import { BackButton } from '../../components/BackButton/inde'

import { Feather } from '@expo/vector-icons'
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles'
import { Input } from '../../components/Input'
import { Keyboard, KeyboardAvoidingView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { InputPassword } from '../../components/InputPassword'
import { useAuth } from '../../hooks/auth'

import * as ImagePicker from 'expo-image-picker'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

export function Profile() {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
  const { user } = useAuth()
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [driverLicense, setDriverLicense] = useState(user.driver_license)

  const theme = useTheme()
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  const handleSignOut = () => {
    navigation.goBack()
  }

  const handleOptionChange = (optionSelected: 'dataEdit' | 'passwordEdit') => {
    setOption(optionSelected)
  }

  const handleSelectAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (result.cancelled) {
      return
    } else {
      const { uri } = result as ImageInfo
      setAvatar(uri)
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar pergil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name='power' size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather
                  name='camera'
                  size={24}
                  color={theme.colors.background_primary}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option == 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option == 'dataEdit'}>Dados</OptionTitle>
              </Option>

              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar Senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' && (
              <Section>
                <Input
                  iconName='user'
                  placeholder='Nome'
                  autoCapitalize='none'
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName='credit-card'
                  placeholder='Nome'
                  keyboardType='number-pad'
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            )}
            {option === 'passwordEdit' && (
              <Section>
                <InputPassword iconName='lock' placeholder='Senha atual' />
                <InputPassword iconName='lock' placeholder='Nova senha' />
                <InputPassword iconName='lock' placeholder='Repetir senha' />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
