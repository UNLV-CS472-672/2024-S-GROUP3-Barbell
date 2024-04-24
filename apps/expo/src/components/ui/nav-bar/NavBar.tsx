/**
 * @usage
 * <NavBar
 *   center={'Notifications'}
 *   right={<MaterialCommunityIcons name='message-plus-outline' size={24} color='#CACACA' />}
 * />
 *
 * <NavBar
 *   center={'Workout Page'}
 *   right={'Next'}
 * />
 *
 * @note
 * If you want to remove the back arrow, pass in a <View /> component into the left param.
 * The rest of the fields will default to empty.
 */

import { Text, View } from 'react-native'
import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'

// People should be able to pass in things like strings, SVGs, or React components to any field
interface NavBarProps {
  left?: any
  center?: any
  right?: any
}

export default function NavBar({
  left = (
    <Ionicons
      testID='left-button'
      onPress={() => router.back()}
      name='chevron-back'
      size={20}
      color='#CACACA'
    />
  ),
  center = <View />,
  right = <View />,
}: NavBarProps) {
  return (
    <View>
      <View
        className={`flex-row items-center justify-between px-5 pb-3 ${
          Platform.OS == 'android' ? 'pt-7' : 'pt-1'
        }`}
      >
        <View testID='left-test' className='basis-1/12 items-start'>
          {typeof left == 'string' && (
            <Text numberOfLines={1} style={{ color: '#CACACA', fontSize: 16 }}>
              {left}
            </Text>
          )}
          {typeof left != 'string' && left}
        </View>

        <View testID='center-test' className='flex-1 basis-5/6 items-center'>
          {typeof center == 'string' && (
            <Text numberOfLines={1} style={{ color: '#CACACA', fontSize: 20 }}>
              {center}
            </Text>
          )}
          {typeof center != 'string' && center}
        </View>

        <View testID='right-test' className='basis-1/12 items-end'>
          {typeof right == 'string' && (
            <Text numberOfLines={1} style={{ color: '#CACACA', fontSize: 16 }}>
              {right}
            </Text>
          )}
          {typeof right != 'string' && right}
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }} />
    </View>
  )
}
