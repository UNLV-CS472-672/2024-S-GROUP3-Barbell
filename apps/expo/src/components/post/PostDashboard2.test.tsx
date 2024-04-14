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
          data: [],
          isFetching: false,
          isFetched: true,
        }),
      },
    },
  },
}))

describe('PostDashboard component', () => {
  test('renders "No posts to display." when no posts fetched', () => {
    render(<PostDashboard />)
    expect(screen.getByTestId('no-posts-test')).toBeTruthy()
  })
})
