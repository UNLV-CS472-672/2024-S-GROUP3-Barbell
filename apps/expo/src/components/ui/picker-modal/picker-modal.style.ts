import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native'

const { width: ScreenWidth } = Dimensions.get('screen')

interface Style {
  container: ViewStyle
  mainContent: ViewStyle
  cancelButtonStyle: ViewStyle
  cancelButtonTextStyle: TextStyle
  titleTextStyle: TextStyle
  titleTextContainer: ViewStyle
}

export default StyleSheet.create<Style>({
  container: {
    bottom: 100,
    position: 'absolute',
  },
  mainContent: {
    width: ScreenWidth * 0.9,
    backgroundColor: '#232323',
    borderRadius: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  titleTextStyle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    paddingBottom: 16,
  },
  titleTextContainer: {
    width: ScreenWidth * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  cancelButtonStyle: {
    height: 55, 
    width: ScreenWidth * 0.95,
    backgroundColor: '#232323',
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', 
  },
  cancelButtonTextStyle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
})
