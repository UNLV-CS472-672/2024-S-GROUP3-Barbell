import { render, screen } from '@testing-library/react-native'

import Toggle from '^/apps/expo/src/components/toggle/change-Toggle'

test('Toggle', () => {
  render(<Toggle />)
  expect(screen.toJSON()).toMatchSnapshot()
})
