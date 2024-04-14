import React from 'react'

import { render, screen } from '@testing-library/react-native'

import Label from './Label'

test('Label', async () => {
  const expectedLabelText = 'Label'
  const expectedBackgroundColor = '#FFFFFF'
  const expectedTextColor = '#000000'

  render(<Label text={expectedLabelText} backgroundColor={expectedBackgroundColor} textColor={expectedTextColor} />)

  const actualLabelText = await screen.findByTestId('text-test')

  expect(actualLabelText).toHaveTextContent(expectedLabelText)
  expect(screen.toJSON()).toMatchSnapshot()
})
