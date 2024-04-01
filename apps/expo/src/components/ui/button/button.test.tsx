import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'

import Button from './button'

test('Button', async () => {
  const expectedButtonText = 'Button Text'

  render(<Button value={expectedButtonText} />)

  // fireEvent.changeText(screen.getByTestId('buttonText'), expectedButtonText)
  // fireEvent.press(screen.getByText('Print Username'))

  // Using `findBy` query to wait for asynchronous operation to finish
  // const usernameOutput = await screen.findByTestId('printed-username')
  const buttonTextOutput = await screen.findByTestId('button-text')

  // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
  // expect(usernameOutput).toHaveTextContent(expectedUsername)
  expect(buttonTextOutput).toHaveTextContent(expectedButtonText)
  expect(screen.toJSON()).toMatchSnapshot()
})
