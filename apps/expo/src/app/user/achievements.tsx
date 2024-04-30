import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import NavBar from '~/components/ui/nav-bar/NavBar'
import UnderDevTag from '~/components/ui/under-dev-tag'

const Achievements = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#1e1e1e', flex: 1 }}>
      <NavBar center='Achievements' />
      <View className='flex h-full items-center justify-center'>
        <UnderDevTag />
      </View>
    </SafeAreaView>
  )
}

export default Achievements
