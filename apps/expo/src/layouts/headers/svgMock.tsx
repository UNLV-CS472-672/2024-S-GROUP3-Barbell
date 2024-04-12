import React from 'react'
import { Text, View, ViewProps } from 'react-native'

interface SvgMockProps extends ViewProps {
  children?: React.ReactNode
}

const SvgMock: React.FC<SvgMockProps> = ({ children, ...props }) => (
  <View {...props}>
    <Text>SvgMock Component</Text>
    {children}
  </View>
)

export default SvgMock
