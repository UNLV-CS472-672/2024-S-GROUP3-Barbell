import React from 'react'

import { render, screen } from '@testing-library/react-native'

import WorkoutTracker from '~/components/tracker/workout-tracker'

// jest.mock('^/packages/validators/src', () => ({
//   validate: jest.fn(() => ({})),
// }))

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1'),
}))

jest.mock('~/context/global-context', () => ({
  useGlobalContext: jest.fn(() => ({
    userData: {},
    isWorkingOut: false,
    setIsWorkingOut: jest.fn(),
  })),
}))

jest.mock('~/utils/trpc/api', () => ({
  api: {
    workoutTemplate: {
      getWorkoutTemplateInfoById: {
        useQuery: jest.fn(() => ({
          data: {
            id: 1,
            name: 'Test Workout',
            exercises: [
              {
                id: 1,
                name: 'Bench Press',
                sets: [],
                note: '',
                bodyPart: 'CHEST',
                category: 'BARBELL',
              },
            ],
          },
        })),
      },
    },
  },
}))

describe('WorkoutTracker', () => {
  const mockRef = {
    current: null,
  }
  it('should render correctly', async () => {
    render(<WorkoutTracker bottomSheetRef={mockRef} workoutTemplateId={1} />)
    expect(screen.getByText('Add Exercises')).toBeTruthy()
  })
})
