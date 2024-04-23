import React from 'react'

import { act, render, screen } from '@testing-library/react-native'

import WorkoutTimer from '~/components/tracker/workout-timer'

describe('WorkoutTimer', () => {
  const [time, setTime] = [0, jest.fn()]

  it('should render correctly', () => {
    render(<WorkoutTimer {...{ time, setTime }} />)
    expect(screen.getByText('0:00')).toBeTruthy()
  })

  // it('should update the time every second', () => {
  //   jest.useFakeTimers()
  //   render(<WorkoutTimer {...{ time, setTime }} />)
  //   expect(screen.getByText('0:00')).toBeTruthy()
  //   act(() => {
  //     jest.advanceTimersByTime(1000)
  //   })
  //   expect(screen.getByText('0:01')).toBeTruthy()
  // })

  // it('should show hours', () => {
  //   jest.useFakeTimers()
  //   render(<WorkoutTimer {...{ time, setTime }} />)
  //   act(() => {
  //     jest.advanceTimersByTime(3600000)
  //   })
  //   expect(screen.getByText('1:00:00')).toBeTruthy()
  // })

  // it('should not show hours', () => {
  //   jest.useFakeTimers()
  //   render(<WorkoutTimer {...{ time, setTime }} />)
  //   act(() => {
  //     jest.advanceTimersByTime(60000)
  //   })
  //   expect(screen.getByText('1:00')).toBeTruthy()
  // })
})
