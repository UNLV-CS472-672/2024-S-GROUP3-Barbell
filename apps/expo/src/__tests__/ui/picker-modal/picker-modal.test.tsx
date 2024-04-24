import React from 'react'
import { Text } from 'react-native'

import { render } from '@testing-library/react-native'

import PickerModal from '~/components/ui/picker-modal/picker-modal'

describe('PickerModal', () => {
  it('renders correctly and matches snapshot', () => {
    const mockOnBackdropPress = jest.fn()

    const tree = render(
      <PickerModal title='Select an Option' isVisible={true} onBackdropPress={mockOnBackdropPress}>
        <Text>Child content goes here</Text>
      </PickerModal>,
    )

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
