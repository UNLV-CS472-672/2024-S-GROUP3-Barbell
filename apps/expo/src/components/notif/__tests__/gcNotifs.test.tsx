import React from 'react'
import { render, screen } from '@testing-library/react-native'
import GcNotifs from '../gcNotifs'

test('RotatingBarbellIcon', async () => {
  render(<GcNotifs />)
  
  expect(screen.toJSON()).toMatchSnapshot()
})
