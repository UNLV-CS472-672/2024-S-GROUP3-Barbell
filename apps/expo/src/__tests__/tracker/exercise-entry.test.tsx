import { render, screen } from '@testing-library/react-native'

import ExerciseEntry from '~/components/tracker/exercise-entry'
import { TSet } from '~/components/tracker/set-entry'
import { TExercise } from '~/components/tracker/workout-tracker'

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1'),
}))

describe('ExerciseEntry', () => {
  const mockExercise: TExercise = {
    id: 1,
    name: 'Bench Press',
    sets: [] as TSet[],
    note: '',
    bodyPart: 'CHEST',
    category: 'BARBELL',
  }
  it('should render correctly', () => {
    render(<ExerciseEntry exercise={mockExercise} exerciseIndex={1} workoutUpdater={jest.fn} />)
    expect(screen.getByText('Add Set')).toBeTruthy()
  })
})
