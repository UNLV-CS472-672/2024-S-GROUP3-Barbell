import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react-native'

import WorkoutTracker from '~/components/tracker/workout-tracker'

jest.mock('~/context/global-context', () => ({
  useGlobalContext: jest.fn(() => ({
    userData: {},
    isWorkingOut: false,
    setIsWorkingOut: jest.fn(),
  })),
}))

describe('WorkoutTracker', () => {
  const mockRef = {
    current: null,
  }
  it('should render correctly', async () => {
    render(<WorkoutTracker bottomSheetRef={mockRef} />)
    expect(screen.getByText('Add Exercises')).toBeTruthy()
  })
})
