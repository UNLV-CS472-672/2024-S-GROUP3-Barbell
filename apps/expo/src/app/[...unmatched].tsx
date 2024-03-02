import { Text, View } from 'react-native'
import { Redirect } from 'expo-router'

export default function Page() {
  return (
    <>
      {/* <Redirect href={'/'} /> */}
      {alert('This page does not exist')}
      <View>
        <Text>This page does not exist</Text>
      </View>
    </>
  )
}
