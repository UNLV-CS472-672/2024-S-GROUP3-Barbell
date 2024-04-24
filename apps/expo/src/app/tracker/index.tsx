import { useRef } from 'react'
import { SafeAreaView, Text } from 'react-native'

import { useAuth, useUser } from '@clerk/clerk-expo'
import CustomBottomSheetModal, {
  CustomBottomSheetModalRef,
} from '^/apps/expo/src/components/ui/bottom-sheet/custom-bottom-sheet-modal'

import WorkoutTracker from '~/components/tracker/workout-tracker'
import Button from '~/components/ui/button/button'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

const Tracker = () => {
  const { userData, isWorkingOut, setIsWorkingOut } = useGlobalContext()
  const bottomSheetRef = useRef<CustomBottomSheetModalRef>(null)
  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present()
    setIsWorkingOut(true)
  }

  if (!userData) {
    console.log('No user data in tracker page')

    return null
  }

  // const { data } = api.workoutTemplate.getAllWorkoutTemplatesByUserId.useQuery({
  //   userId: userData.id,
  // })

  // console.log(data)

  return (
    <SafeAreaView>
      <Button className='mt-16' value='Present Modal' onPress={handlePresentModalPress}></Button>
      {/* <Text>{data![0]?.name}</Text> */}
      {isWorkingOut && (
        <CustomBottomSheetModal
          ref={bottomSheetRef}
          customSnapPoints={['93%']}
          startIndex={0}
          renderBackdrop
        >
          <WorkoutTracker bottomSheetRef={bottomSheetRef} workoutTemplateId={1} />
        </CustomBottomSheetModal>
      )}
    </SafeAreaView>
  )
}

export default Tracker
