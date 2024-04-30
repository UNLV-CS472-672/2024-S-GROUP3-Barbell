import React from 'react'

import { render } from '@testing-library/react-native'

import UnderDevTag from '~/components/ui/under-dev-tag'

describe('UnderDevTag', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<UnderDevTag />)

    expect(getByText('Under development')).toBeTruthy() // Check if the text is rendered
    expect(getByTestId('animated-view')).toBeTruthy() // Check if the animated view is present
  })
})
