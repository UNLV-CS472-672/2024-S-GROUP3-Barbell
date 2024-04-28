import { Text, View } from 'react-native'

interface HeaderElementProps {
  field1: number | string | undefined
  field2: number | string | undefined
}

export default function HeaderElement({ field1, field2 }: HeaderElementProps) {
  return (
    <View className='items-center justify-center'>
      <Text className='text-[18px] text-slate-200'>{field1}</Text>
      <Text className='text-[18px] text-slate-200'>{field2}</Text>
    </View>
  )
}
