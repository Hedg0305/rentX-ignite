import React, { useState } from 'react'
import { TextInputProps } from 'react-native'

import { Container, InputText, IconContainer } from './styles'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
  value?: string
}

export function Input({ iconName, value, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const theme = useTheme()

  const handleInputFocused = () => setIsFocused(true)
  const handleInputBlur = () => {
    setIsFocused(false)
    setIsFilled(!!value)
  }

  return (
    <Container >
      <IconContainer 
        isFocused={isFocused}
        >
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text}

        />
      </IconContainer>
      <InputText
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </Container>
  )
}
