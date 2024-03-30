import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'
import NudgeNotif from '~/components/notif/miscNotifs/NudgeNotif'
import { Notification } from '@prisma/client'

test('NudgeNotif', async () => {
  const expectedNotif: Notification = {
    "id": 3,
    "createdAt": new Date("2024-03-14T10:15:00Z"),
    "content": "nudged you",
    "type": "NUDGE",
    "read": false,
    "receiverId": 4,
    "senderId": 2
  }
  const expectedSenderUsername = 'username'
  const expectedContent = expectedNotif.content

  render(<NudgeNotif notif={expectedNotif} senderUsername={expectedSenderUsername} />)
  const senderUsernameOutput = await screen.findByTestId('sender-username-with-content')

  expect(senderUsernameOutput).toHaveTextContent(expectedSenderUsername + ' ' + expectedContent)
  expect(screen.toJSON()).toMatchSnapshot()
})
