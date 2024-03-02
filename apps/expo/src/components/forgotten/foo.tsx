import { Text, View } from 'react-native'

import { api } from '~/utils/api'

export default function Foo() {
  const title = api.post.all.useQuery().data?.[0]?.title

  return (
    <View>{title ? <Text>{title}</Text> : <Text>No data available</Text>}</View>
  )
}
