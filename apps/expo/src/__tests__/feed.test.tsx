import React from 'react'

import { render } from '@testing-library/react-native'

import Activity from '~/components/feed/activity'

describe('Activity Component', () => {
  it('renders correctly with given props', () => {
    const mockUser = { name: 'John Doe' }
    const mockWorkout = {
      name: 'Morning Routine',
      description: 'A quick workout to get the day started',
      exercises: [{ name: 'Push-ups' }, { name: 'Sit-ups' }],
    }
    const mockWorkoutLog = {
      createdAt: new Date('2023-04-21'),
    }

    const { toJSON } = render(
      <Activity user={mockUser} workout={mockWorkout} workoutLog={mockWorkoutLog} />,
    )

    expect(toJSON()).toMatchSnapshot()
  })
})
