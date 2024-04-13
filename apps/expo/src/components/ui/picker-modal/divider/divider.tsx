import * as React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

/**
 * ? Local Imports
 */
import styles from '~/components/ui/picker-modal/divider/divider.style'

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>

interface IDividerProps {
  style?: CustomStyleProp
}

const Divider: React.FC<IDividerProps> = ({ style }) => {
  return <View style={[styles.dividerStyle, style]} />
}

export default Divider
