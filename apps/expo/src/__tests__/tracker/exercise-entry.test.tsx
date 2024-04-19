import { render, screen } from '@testing-library/react-native'

import ExerciseEntry from '~/components/tracker/exercise-entry'

describe('ExerciseEntry', () => {
  it('should render correctly', () => {
    render(<ExerciseEntry />)
    expect(screen.getByText('Add Set')).toBeTruthy()
  })
})
