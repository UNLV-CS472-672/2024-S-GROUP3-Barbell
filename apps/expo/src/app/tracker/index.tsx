import { useRef } from 'react'
import { SafeAreaView } from 'react-native'
import { useAuth, useUser } from '@clerk/clerk-expo'

import WorkoutTracker from '~/components/tracker/workout-tracker'
import Button from '~/components/ui/button/button'
import CustomBottomSheetModal, {
  CustomBottomSheetModalRef,
} from '~/components/ui/custom-bottom-sheet-modal'
import { useGlobalContext } from '~/context/global-context'

const Tracker = () => {
  const { userData, isWorkingOut, setIsWorkingOut } = useGlobalContext()
  const bottomSheetRef = useRef<CustomBottomSheetModalRef>(null)
  const handlePresentModalPress = () => bottomSheetRef.current?.present()
  const { isLoaded, userId, sessionId, getToken } = useAuth()
  const { user } = useUser()
  console.log(user)

  return (
    <SafeAreaView>
      <Button value="Present Modal" onPress={handlePresentModalPress}></Button>
      <CustomBottomSheetModal
        ref={bottomSheetRef}
        customSnapPoints={['93%']}
        startIndex={0}
        renderBackdrop
      >
        <WorkoutTracker bottomSheetRef={bottomSheetRef} />
      </CustomBottomSheetModal>
    </SafeAreaView>
  )
}

export default Tracker
