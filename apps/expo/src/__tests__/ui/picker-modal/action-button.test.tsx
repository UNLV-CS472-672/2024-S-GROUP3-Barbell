import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import ActionButton from '~/components/ui/picker-modal/action-button/action-button'

describe('ActionButton', () => {
  it('renders correctly with text', () => {
    const { getByText } = render(<ActionButton text='Press Me' />)
    expect(getByText('Press Me')).toBeTruthy()
  })

  it('handles press events', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(<ActionButton onActionPress={onPressMock} />)
    fireEvent.press(getByTestId('action-button'))
    expect(onPressMock).toHaveBeenCalled()
  })

  it('conditionally renders the Divider', () => {
    const { queryByTestId } = render(<ActionButton isLastItem={true} />)
    expect(queryByTestId('divider')).toBeNull()
  })
})
