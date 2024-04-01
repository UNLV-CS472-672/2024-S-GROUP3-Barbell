import React from 'react'

import { render, screen } from '@testing-library/react-native'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'

test('RotatingBarbellIcon', async () => {
  render(<RotatingBarbellIcon />)

  expect(screen.toJSON()).toMatchSnapshot()
})
