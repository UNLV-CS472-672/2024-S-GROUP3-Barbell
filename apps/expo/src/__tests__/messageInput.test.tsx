import { render, screen } from '@testing-library/react-native'

import MessageInput from '~/components/message/messageInput'

test('MessageInput', async () => {
  render(<MessageInput />)
  expect(screen.toJSON()).toMatchSnapshot()
})
