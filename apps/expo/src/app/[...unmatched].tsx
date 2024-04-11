import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  return (
    <>
      {/* <Redirect href={'/'} /> */}
      {alert('This page does not exist')}
      <SafeAreaView>
        <Text style={ { textAlign: 'center', padding: 30 }}>
          This page does not exist
        </Text>
      </SafeAreaView>
    </>
  )
}
