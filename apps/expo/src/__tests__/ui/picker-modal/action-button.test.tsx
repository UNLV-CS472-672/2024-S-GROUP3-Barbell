import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { fireEvent, render } from '@testing-library/react-native'

import ActionButton from '~/components/ui/picker-modal/action-button/action-button'

interface MockTouchableProps extends TouchableOpacityProps {
  testID?: string
}

const MockTouchable: React.FC<MockTouchableProps> = ({ children, onPress, testID, ...props }) => (
  <TouchableOpacity onPress={onPress} testID={testID} {...props}>
    {children}
  </TouchableOpacity>
)

describe('ActionButton', () => {
  it('renders correctly with text', () => {
    const { getByText } = render(
      <ActionButton text='thienguen' TouchableComponent={MockTouchable} />,
    )
    expect(getByText('thienguen')).toBeTruthy()
  })

  it('handles press events', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <ActionButton onActionPress={onPressMock} TouchableComponent={MockTouchable} />,
    )
    fireEvent.press(getByTestId('action-button'))
    expect(onPressMock).toHaveBeenCalled()
  })

  it('conditionally renders the Divider', () => {
    const { queryByTestId } = render(
      <ActionButton isLastItem={true} TouchableComponent={MockTouchable} />,
    )
    // Since the `queryByTestId` for 'divider' would not work because the Divider itself does not accept testID as a prop,
    expect(queryByTestId('divider')).toBeNull()
  })
})
