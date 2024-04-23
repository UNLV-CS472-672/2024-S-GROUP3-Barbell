import { fireEvent, render, screen } from '@testing-library/react-native'

import { TExercise } from '~/components/tracker/workout-tracker'
import WorkoutTrackerHeader from '~/components/tracker/workout-tracker-header'

jest.mock('~/context/global-context', () => ({
  useGlobalContext: jest.fn(() => ({
    userData: {},
    isWorkingOut: false,
    setIsWorkingOut: jest.fn(),
  })),
}))

describe('WorkoutTrackerHeader', () => {
  const mockRef = {
    current: null,
  }
  it('should render correctly', () => {
    render(
      <WorkoutTrackerHeader
        bottomSheetRef={mockRef}
        workoutName='Test Workout'
        setWorkoutName={jest.fn}
        exercises={[] as TExercise[]}
        workoutTemplate={null}
      />,
    )
    expect(screen.getByText('Finish')).toBeTruthy()
    expect(screen.getByText('Cancel')).toBeTruthy()
  })

  it("should set isWorkingOut to false when 'Cancel' is pressed", () => {
    render(
      <WorkoutTrackerHeader
        bottomSheetRef={mockRef}
        workoutName='Test Workout'
        setWorkoutName={jest.fn}
        exercises={[] as TExercise[]}
        workoutTemplate={null}
      />,
    )
    const cancel = screen.getByText('Cancel')
    fireEvent(cancel, 'press')
  })
})
