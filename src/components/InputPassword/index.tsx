import React, { useState } from 'react'
import { TextInputProps } from 'react-native'

import { Container, InputText, IconContainer } from './styles'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { BorderlessButton } from 'react-native-gesture-handler'

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
  value?: string
}

export function InputPassword({ iconName, value, ...rest }: InputProps) {
  const theme = useTheme()
  const [isPasswordVisible, setIsPasswordVisible] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }

  const handleInputFocused = () => setIsFocused(true)
  const handleInputBlur = () => {
    setIsFocused(false)
    setIsFilled(!!value)
  }
  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text}
        />
      </IconContainer>
      <InputText
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        {...rest}
        secureTextEntry={isPasswordVisible}
        isFocused={isFocused}
      />

      <BorderlessButton onPress={handlePasswordVisibility}>
        <IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  )
}
