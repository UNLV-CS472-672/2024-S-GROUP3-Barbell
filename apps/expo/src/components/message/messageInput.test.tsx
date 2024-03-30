import { render, screen } from '@testing-library/react-native'

import MessageInput from './messageInput'

test('MessageInput', async () => {
  render(<MessageInput />)
  expect(screen.toJSON()).toMatchSnapshot()
})
