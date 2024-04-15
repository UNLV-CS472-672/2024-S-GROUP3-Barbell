import React from 'react'

import { render } from '@testing-library/react-native'

import PickerModal from '~/components/ui/picker-modal/picker-modal'

describe('PickerModal', () => {
  it('renders correctly and matches snapshot', () => {
    const mockData = ['Option 1', 'Option 2']
    const mockOnPress = jest.fn()
    const mockOnCancelPress = jest.fn()
    const mockOnBackdropPress = jest.fn()

    const pickmepickme = render(
      <PickerModal
        isVisible={true}
        data={mockData}
        title='Select an Option'
        onPress={mockOnPress}
        onCancelPress={mockOnCancelPress}
        onBackdropPress={mockOnBackdropPress}
      />,
    )

    expect(pickmepickme).toMatchSnapshot()
  })
})
