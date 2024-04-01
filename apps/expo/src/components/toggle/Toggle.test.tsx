import { render, screen } from '@testing-library/react-native'

import Toggle from './Toggle'

test('Toggle', () => {
  render(<Toggle />)
  expect(screen.toJSON()).toMatchSnapshot()
})
