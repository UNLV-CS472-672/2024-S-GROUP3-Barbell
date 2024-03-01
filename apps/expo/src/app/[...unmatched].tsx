// import { Text, View } from 'react-native'
import { Redirect } from 'expo-router'

export default function Page() {
  alert('This page does not exist')
  return (
    <>
      <Redirect href={'/'} />
      {/* <View>
        <Text>This page does not exist</Text>
      </View> */}
    </>
  )
}
