import React from 'react'

import { Notification } from '@prisma/client'
import { fireEvent, render, screen } from '@testing-library/react-native'

import FriendRequestNotif from '~/components/notif/miscNotifs/FriendRequestNotif'

test('FriendRequestNotif', async () => {
  const expectedNotif: Notification = {
    id: 3,
    createdAt: new Date('2024-03-14T10:15:00Z'),
    content: 'wants to be your friend',
    type: 'FRIEND_REQUEST',
    read: false,
    receiverId: 4,
    senderId: 2,
  }
  const expectedSenderUsername = 'username'
  const expectedContent = expectedNotif.content
  const expectedReceiverId = expectedNotif.receiverId

  render(
    <FriendRequestNotif
      notif={expectedNotif}
      senderUsername={expectedSenderUsername}
      receiverId={expectedReceiverId}
    />,
  )
  const senderUsernameOutput = await screen.findByTestId('sender-username-with-content')

  expect(senderUsernameOutput).toHaveTextContent(expectedSenderUsername + ' ' + expectedContent)
  expect(screen.toJSON()).toMatchSnapshot()
})
