import { SetType } from '@prisma/client'
import { render, screen } from '@testing-library/react-native'

import SetEntry, { TSet } from '~/components/tracker/set-entry'

describe('SetEntry', () => {
  const mockSet: TSet = {
    id: '1',
    type: 'NORMAL',
    weight: [0],
    reps: [0],
    exerciseId: 1,
    unilateral: false,
  }

  it('should render correctly', async () => {
    render(<SetEntry set={mockSet} exerciseIndex={1} workoutUpdater={jest.fn()} setIndex={1} />)
    // expect(screen.getByTestId('set-type-button-container'))
    // expect(screen.getByTestId('unilateral-switch-container'))
    // expect(screen.getByTestId('weight-input-container'))
    // expect(screen.getByTestId('reps-input-container'))
    // expect(screen.getByTestId('completed-button-container'))
  })
})
