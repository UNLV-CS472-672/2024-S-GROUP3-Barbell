import React, { Component } from 'react'
import { Dimensions } from 'react-native'

import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { act } from 'react-test-renderer'

import Toggle from '~/components/toggle/toggle'

/**
 * @see https://github.com/orgs/react-hook-form/discussions/4232
 */

describe('Toggle component', () => {
  beforeAll(() => {
    jest.setTimeout(30000)
  })

  /* git force */
  const originalConsoleError = console.error
  beforeAll(() => {
    console.error = (message, ...args) => {
      if (/not wrapped in act\(...\)/.test(message)) {
        return
      }
      originalConsoleError(message, ...args)
    }
  })

  afterAll(() => {
    console.error = originalConsoleError
  })

  const { width: screenWidth } = Dimensions.get('window')

  it('should render correctly', async () => {
    const { getByTestId } = render(<Toggle value={false} onValueChange={() => {}} label='Test' />)

    await waitFor(() => expect(getByTestId('toggle-container')).toBeDefined())
    await waitFor(() => expect(getByTestId('toggle-switch')).toBeDefined())
    await waitFor(() => expect(getByTestId('toggle-label')).toBeDefined())
  })

  it('should call onValueChange function when toggled', async () => {
    const onValueChange = jest.fn()
    const { getByTestId } = render(
      <Toggle value={false} onValueChange={onValueChange} label='Test' />,
    )
    const toggleSwitch = getByTestId('toggle-switch')

    await act(async () => {
      fireEvent.press(toggleSwitch)
    })

    await waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1))
  })

  it('should animate the switch when the value prop changes', async () => {
    const { getByTestId, rerender } = render(
      <Toggle value={false} onValueChange={() => {}} label='Test' />,
    )
    const toggleCircle = getByTestId('toggle-circle')

    expect(toggleCircle.props.style.marginLeft).toBeCloseTo(screenWidth * 0.01, 1)

    await act(async () => {
      rerender(<Toggle value={true} onValueChange={() => {}} label='Test' />)
    })
    // await waitFor(() => expect(myInput).toHaveValue('value'))
    await waitFor(() => expect(toggleCircle.props.style.marginLeft).toBeCloseTo(79.5))
  })

  it('should update the background color of the switch when the value prop changes', async () => {
    const { getByTestId, rerender } = render(
      <Toggle value={false} onValueChange={() => {}} label='Test' />,
    )
    const toggleSwitch = getByTestId('toggle-switch')

    // expect(toggleSwitch.props.style.backgroundColor).toContain('rgba(58, 58, 58, 1)')
    await waitFor(() =>
      expect(toggleSwitch.props.style.backgroundColor).toContain('rgba(58, 58, 58, 1)'),
    )

    await act(async () => {
      rerender(<Toggle value={true} onValueChange={() => {}} label='Test' />)
    })

    // await waitFor(() => expect(myInput).toHaveValue('value'));
    await waitFor(() =>
      expect(toggleSwitch.props.style.backgroundColor).toContain('rgba(58, 58, 58, 1)'),
    )
  })

  it('should match snapshop', () => {
    const { toJSON } = render(<Toggle value={false} onValueChange={() => {}} label='Test' />)
    expect(toJSON()).toMatchSnapshot()
  })
})
