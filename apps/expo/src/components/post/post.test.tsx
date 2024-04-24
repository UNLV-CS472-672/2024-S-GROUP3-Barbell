import { render, screen } from '@testing-library/react-native'

import Post from '~/app/post/post'

jest.mock('~/context/global-context', () => ({
  useGlobalContext: () => ({
    userData: {
      id: 1,
      username: 'testUser',
    },
  }),
}))

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

describe('Post', () => {
  it('should render Post component', () => {
    render(<Post post={mockPost} user={mockUser} />)
    expect(screen.getByTestId('post-container')).toBeTruthy()
  });

  it('should display the post content', () => {
    render(<Post post={mockPost} user={mockUser} />)
    expect(screen.getByTestId('test-content')).toBeTruthy()
  });
})