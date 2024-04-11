import React from 'react'

import { render } from '@testing-library/react-native'

import Divider from '~/components/ui/picker-modal/divider/divider'

describe('Divider', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Divider />)
    expect(getByTestId('divider')).toBeTruthy()
  })

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'blue' }
    const { getByTestId } = render(<Divider style={customStyle} />)
    expect(getByTestId('divider')).toHaveStyle(customStyle)
  })
})
