import { ColorValue, Text, View } from 'react-native'

interface LabelProps {
  text: string
  textColor: ColorValue
  backgroundColor: ColorValue
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  fontSize?: number
}

export default function Label({
  text,
  textColor,
  backgroundColor,
  rounded = 'lg',
  fontSize = 20,
}: LabelProps) {
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: backgroundColor,
      }}
      className={`rounded-${rounded} px-2 py-1`}
    >
      <Text
        testID='text-test'
        className={`text-[${fontSize}px] font-bold`}
        style={{ color: textColor }}
        numberOfLines={1}
      >
        {text}
      </Text>
    </View>
  )
}
