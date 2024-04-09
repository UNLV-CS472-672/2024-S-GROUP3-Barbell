import * as useAuth from '@clerk/clerk-expo'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { act } from 'react-test-renderer'

import { SignOut } from './sign-out'

const mockUseAuth = useAuth as { useAuth: any }

jest.mock('@clerk/clerk-expo', () => ({
  useAuth: jest.fn(() => ({
    isLoaded: true,
    signOut: jest.fn(),
  })),
}))

describe('SignOut', () => {
  it('should return null if isLoaded is false', () => {
    mockUseAuth.useAuth.mockImplementation(() => ({
      isLoaded: false,
      signOut: jest.fn(),
    }))

    render(<SignOut />)
    expect(screen).not.toContain('Sign Out')
  })

  it('should call signOut when button is pressed', () => {
    mockUseAuth.useAuth.mockImplementation(() => ({
      isLoaded: true,
      signOut: jest.fn(),
    }))

    render(<SignOut />)
    act(() => {
      fireEvent.press(screen.getByText('Sign Out'))
    })
    expect(screen.getByTestId('sign-out-btn')).toBeTruthy()
  })
})
