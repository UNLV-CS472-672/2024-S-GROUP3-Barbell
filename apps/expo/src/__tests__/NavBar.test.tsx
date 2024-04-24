import React from 'react'
import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { fireEvent, render } from '@testing-library/react-native'

import NavBar from '../components/ui/nav-bar/NavBar'

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
}))

describe('NavBar component', () => {
  it('renders default props correctly', () => {
    const { getByTestId } = render(<NavBar />)
    expect(getByTestId('left-test')).toBeTruthy()
    expect(getByTestId('center-test')).toBeTruthy()
    expect(getByTestId('right-test')).toBeTruthy()
  })

  it('renders custom props correctly', () => {
    const leftText = 'Back'
    const centerText = 'Title'
    const rightText = 'Save'
    const { getByTestId, getByText } = render(
      <NavBar left={leftText} center={centerText} right={rightText} />,
    )
    expect(getByTestId('left-test')).toBeTruthy()
    expect(getByTestId('center-test')).toBeTruthy()
    expect(getByTestId('right-test')).toBeTruthy()
    expect(getByText(leftText)).toBeTruthy()
    expect(getByText(centerText)).toBeTruthy()
    expect(getByText(rightText)).toBeTruthy()
  })

  it('calls router.back() when left button is pressed', () => {
    const { getByTestId } = render(<NavBar />)
    fireEvent.press(getByTestId('left-button'))
    expect(router.back).toHaveBeenCalledTimes(1)
  })
})
