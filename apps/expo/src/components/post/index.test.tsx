import { render, screen } from '@testing-library/react-native'

import * as api from '~/utils/trpc/api'
import Post from '~/app/post/index'

jest.mock('~/context/global-context', () => ({
  useGlobalContext: () => ({
    userData: {
      id: 1,
      username: 'testUser',
    },
  }),
}))

const mockApi = api as { api: any }
const mockUser = {};
const mockPost = {};

jest.mock('~/utils/trpc/api', () => ({
  __esModule: true,
  api: {
    post: {
      create: {
        useMutation: jest.fn(() => {
          return { mutateAsync: jest.fn(), error: jest.fn() };
        })
      },
    },
  },
}))

describe('NewPost', () => {
  it('should render NewPost component', () => {
    render(<Post post={mockPost} user={mockUser} />)
    expect(screen.getByTestId('post-container')).toBeTruthy()
  });

  it('should display the post content', () => {
    render(<Post post={mockPost} user={mockUser} />)
    expect(screen.getByTestId('test-content')).toBeTruthy()
  });
})
