import { render, screen } from '@testing-library/react-native'
import * as api from '~/utils/api'
import PostDashboard from './PostDashboard'

jest.mock('~/context/global-context', () => ({
  useGlobalContext: jest.fn(() => ({
    userData: { id: 1 },
  })),
}))

const mockApi = api as { api: any }

jest.mock('~/utils/api', () => ({
  __esModule: true,
  api: {
    post: {
      getRecentPostsByUserIdAndPostCount: {
        useQuery: jest.fn(),
      },
    },
  },
}))

describe('PostDashboard', () => {
  it('should render text: "No posts to display."', () => {
    mockApi.api.post.getRecentPostsByUserIdAndPostCount.useQuery = jest.fn(() => ({
      data: [],
      isFetching: false,
      isFetched: true,
    }))
    render(<PostDashboard />)
    expect(screen.getByTestId('no-posts-test')).toBeTruthy()
  })

  it('should render text posts"', () => {
    mockApi.api.post.getRecentPostsByUserIdAndPostCount.useQuery = jest.fn(() => ({
      data: [
          { id: 1, author: { username: 'user1' }, content: 'Post 1' },
          { id: 2, author: { username: 'user2' }, content: 'Post 2' },
          { id: 3, author: { username: 'user3' }, content: 'Post 3' },
        ],
        isFetching: false,
        isFetched: true,
    }))
    render(<PostDashboard />)

    expect(screen.getByText('user1')).toBeTruthy()
    expect(screen.getByText('Post 1')).toBeTruthy()
    expect(screen.getByText('user2')).toBeTruthy()
    expect(screen.getByText('Post 2')).toBeTruthy()
    expect(screen.getByText('user3')).toBeTruthy()
    expect(screen.getByText('Post 3')).toBeTruthy()
  })
})
