import { Text, View } from 'react-native'

import ExerciseEntry from '~/components/tracker/exercise-entry'
import WorkoutTrackerHeader from '~/components/tracker/workout-tracker-header'
import Button from '~/components/ui/button/button'
import { CustomBottomSheetModalRef } from '^/apps/expo/src/components/ui/bottom-sheet/custom-bottom-sheet-modal'

export interface IWorkoutTrackerProps {
  bottomSheetRef: React.RefObject<CustomBottomSheetModalRef>
}

const WorkoutTracker: React.FC<IWorkoutTrackerProps> = ({ bottomSheetRef }) => {
  return (
    <View>
      <WorkoutTrackerHeader bottomSheetRef={bottomSheetRef} />
      <ExerciseEntry />
      <Button className="mx-2 mt-8">
        <Text className="text-center font-bold text-white">Add Exercises</Text>
      </Button>
    </View>
  )
}

export default WorkoutTracker
