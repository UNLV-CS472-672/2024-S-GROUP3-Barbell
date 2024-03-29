import React from 'react'

import { render } from '@testing-library/react-native'

import CustomBottomSheet from './bottom-sheet'

/**
 * @bug https://github.com/software-mansion/react-native-reanimated/issues/1555
 * but its fixed it seems, leave for reference
 */
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))
jest.mock('@gorhom/bottom-sheet', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ children }) => children),
  useBottomSheet: jest.fn(() => ({ close: jest.fn() })),
}))

describe('CustomBottomSheet', () => {
  it('renders correctly', () => {
    const screen = render(<CustomBottomSheet title="Test Title" />)

    expect(screen.getByTestId('button-test')).toBeTruthy()
    expect(screen.getByTestId('button-test-2')).toBeTruthy()
    expect(screen.toJSON()).toMatchSnapshot()
  })
})
