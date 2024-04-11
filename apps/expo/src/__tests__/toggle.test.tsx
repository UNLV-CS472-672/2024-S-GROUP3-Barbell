import { render, screen } from '@testing-library/react-native'

import Toggle from '~/components/toggle/toggle'

test('Toggle', () => {
  render(<Toggle />)
  expect(screen.toJSON()).toMatchSnapshot()
})