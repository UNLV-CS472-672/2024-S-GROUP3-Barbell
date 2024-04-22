import { render, screen } from '@testing-library/react-native'

import * as api from '~/utils/trpc/api'
import NewPost from '../../app/post/new'

jest.mock('~/context/global-context', () => ({
  useGlobalContext: () => ({
    userData: {
      id: 1,
      username: 'testUser',
    },
  }),
}))

const mockApi = api as { api: any }

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
    render(<NewPost />)
    expect(screen.getByTestId('new-post-container')).toBeTruthy()
  });

  it('should have one input', () => {
    render(<NewPost />)
    expect(screen.getByTestId('new-post-content-input')).toBeTruthy()
  });

  it('should have one create button', () => {
    render(<NewPost />)
    expect(screen.getByTestId('new-post-create-btn')).toBeTruthy()
  });
})