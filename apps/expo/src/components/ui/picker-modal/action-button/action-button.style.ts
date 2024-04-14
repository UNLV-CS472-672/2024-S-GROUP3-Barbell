import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

export const _dynamicBorderStyle = (isLastItem: boolean): ViewStyle => ({
  borderBottomLeftRadius: isLastItem ? 12 : 0,
  borderBottomRightRadius: isLastItem ? 12 : 0,
})

interface Style {
  actionButtonStyle: ViewStyle
  actionButtonTextStyle: TextStyle
}

export default StyleSheet.create<Style>({
  actionButtonStyle: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonTextStyle: {
    color: '#fff',
  },
})
