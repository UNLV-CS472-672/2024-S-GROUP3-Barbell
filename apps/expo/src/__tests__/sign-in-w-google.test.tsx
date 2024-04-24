import * as useOAuth from '@clerk/clerk-expo'


const mockUseOAuth = useOAuth as { useOAuth: any }

jest.mock('@clerk/clerk-expo', () => ({
  useOAuth: jest.fn(() => ({
    startOAuthFlow: jest.fn(() => ({
      createdSessionId: '123',
      setActive: jest.fn(),
    })),
  })),
}))

const mockSetState = jest.fn()

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(() => [true, mockSetState]),
}))

describe('SignInWithGoogle', () => {
  it('handles null createdSessionId', () => {
    mockUseOAuth.useOAuth.mockImplementation(() => ({
      startOAuthFlow: jest.fn(() => ({
        createdSessionId: 1,
        setActive: jest.fn(),
      })),
    }))
  })
})
