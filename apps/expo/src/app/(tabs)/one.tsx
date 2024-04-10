import { Text, View } from 'react-native'
import { router } from 'expo-router'

// import BottomSheet from '@gorhom/bottom-sheet'
import { cn } from '^/packages/ui/src/cn'

// import CustomBottomSheet from '~/components/ui/bottom-sheet/bottom-sheet'
import Button from '~/components/ui/button/button'

// import { DefaultHeader } from '~/layouts/headers/default'
// import colors from '~/styles/colors'

/**
 * @depraecated
 * https://docs.expo.dev/tutorial/create-a-modal/
 */
export default function TabTwoScreen() {
  // const bottomSheetRef = useRef<BottomSheet>(null)
  // const [title, setTitle] = useState('Passing my data')

  // const handleClosePress = () => bottomSheetRef.current?.close()
  // const handleOpenPress = () => bottomSheetRef.current?.expand()

  return (
    <View className={cn('flex-grow pt-20', `bg-background`)}>
      <Button
        onPress={() => router.push('/nav')}
        className='flex h-10 w-24 items-center justify-center rounded-md bg-blue-500'
        aria-label='Go to nav'
      >
        <Text className='text-white'>Nav</Text>
      </Button>
    </View>
  )
}
