import { render, screen } from '@testing-library/react-native'

import PrivacyPolicy from './privacy-policy'

test('Privacy Policy Page', () => {
  render(<PrivacyPolicy />)
  expect(screen.toJSON()).toMatchSnapshot()
})
