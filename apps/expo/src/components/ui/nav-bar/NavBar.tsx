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
  left = <Ionicons onPress={() => router.back()} name='chevron-back' size={24} color='#CACACA' />,
  center = <View />,
  right = <View />,
}: NavBarProps) {
  return (
    <View className='flex-row items-center justify-between px-5'>
      <View className='basis-1/3 items-start'>
        {typeof left == 'string' && <Text style={{ color: '#CACACA', fontSize: 16 }}>{left}</Text>}
        {typeof left != 'string' && left}
      </View>

      <View className='basis-1/3 items-center'>
        {typeof center == 'string' && (
          <Text style={{ color: '#CACACA', fontSize: 20 }}>{center}</Text>
        )}
        {typeof center != 'string' && center}
      </View>

      <View className='basis-1/3 items-end'>
        {typeof right == 'string' && (
          <Text style={{ color: '#CACACA', fontSize: 16 }}>{right}</Text>
        )}
        {typeof right != 'string' && right}
      </View>
    </View>
  )
}
