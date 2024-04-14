import React from 'react'

import { render, screen } from '@testing-library/react-native'

import PostDashboard from './PostDashboard'

jest.mock('~/context/global-context', () => ({
  useGlobalContext: jest.fn(() => ({
    userData: { id: 1 },
  })),
}))

jest.mock('~/utils/api', () => ({
  api: {
    post: {
      getRecentPostsByUserIdAndPostCount: {
        useQuery: () => ({
          data: [
            { id: 1, author: { username: 'user1' }, content: 'Post 1' },
            { id: 2, author: { username: 'user2' }, content: 'Post 2' },
            { id: 3, author: { username: 'user3' }, content: 'Post 3' },
          ],
          isFetching: false,
          isFetched: true,
        }),
      },
    },
  },
}))

describe('PostDashboard component', () => {
  test('renders posts when fetched', () => {
    render(<PostDashboard />)
    expect(screen.getByText('user1')).toBeTruthy()
    expect(screen.getByText('Post 1')).toBeTruthy()
    expect(screen.getByText('user2')).toBeTruthy()
    expect(screen.getByText('Post 2')).toBeTruthy()
    expect(screen.getByText('user3')).toBeTruthy()
    expect(screen.getByText('Post 3')).toBeTruthy()
  })
})
