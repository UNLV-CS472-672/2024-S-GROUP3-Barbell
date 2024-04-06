import * as useOAuth from '@clerk/clerk-expo'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { act } from 'react-test-renderer'

import SignInWithGoogle from '~/components/auth/sign-in-w-google'

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
        createdSessionId: null,
        setActive: jest.fn(),
      })),
    }))
    render(<SignInWithGoogle />)
    act(() => {
      fireEvent.press(screen.getByTestId('sign-in-with-google-btn'))
    })
  })

  it('handles valid createdSessionId', () => {
    mockUseOAuth.useOAuth.mockImplementation(() => ({
      startOAuthFlow: jest.fn(() => ({
        createdSessionId: '123',
        setActive: jest.fn(),
      })),
    }))
    render(<SignInWithGoogle />)
    act(() => {
      fireEvent.press(screen.getByTestId('sign-in-with-google-btn'))
    })
  })
})
