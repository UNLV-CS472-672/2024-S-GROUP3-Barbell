import React from 'react'
import { router } from 'expo-router'

import { fireEvent, render } from '@testing-library/react-native'

import { DashboardHeader } from '~/layouts/headers/dashboard-header'
import { FriendsHeader } from '~/layouts/headers/friends-header'
import { InboxHeader } from '~/layouts/headers/inbox-headers'
import { WorkoutHeader } from '~/layouts/headers/workout-headers'

jest.mock('~assets/svgs/notification.svg', () => 'NotificationSVG')
jest.mock('~assets/svgs/arrow-left.svg', () => 'ArrowLeftSVG')
jest.mock('~assets/svgs/friends.svg', () => 'FriendsSVG')
jest.mock('~assets/svgs/write.svg', () => 'WriteSVG')
jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
}))

describe('DashboardHeader', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<DashboardHeader />)
    expect(getByText('BARBELL')).toBeTruthy()
  })
})

describe('FriendsHeader', () => {
  it('renders correctly', () => {
    const { getByText } = render(<FriendsHeader />)
    expect(getByText('Friends List')).toBeTruthy()
  })

  it('navigates back on press', () => {
    const { getByTestId } = render(<FriendsHeader />)
    const button = getByTestId('friends-header-button')
    fireEvent.press(button)
    expect(router.back).toHaveBeenCalled()
  })
})

describe('InboxHeader', () => {
  it('renders with dynamic title', () => {
    const title = 'Inbox'
    const { getByTestId } = render(<InboxHeader title={title} />)
    const button = getByTestId('inbox-header-button')
    expect(button).toBeTruthy()
    fireEvent.press(button)
    expect(router.back).toHaveBeenCalled()
  })
})

describe('WorkoutHeader', () => {
  it('renders correctly', () => {
    const { getByText } = render(<WorkoutHeader />)
    expect(getByText('BARBELL')).toBeTruthy()
    const { getByTestId } = render(<WorkoutHeader />)
    const button = getByTestId('workout-header-button')
    fireEvent.press(button)
    expect(router.back).toHaveBeenCalled()
  })
})
