import React from 'react'
import { Text, View, ViewProps } from 'react-native'

/**
 * All this file is doing is for testing svg files in the app
 */
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
