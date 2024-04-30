import React from 'react'

import { render } from '@testing-library/react-native'

import BarbellTitle from '~/components/ui/nav-bar/BarbellTitle'

describe('BarbellTitle', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<BarbellTitle />)
    const svgElement = getByTestId('barbell-title-svg')
    expect(svgElement).toBeTruthy()
  })

  it('has correct properties for SVG element', () => {
    const { getByTestId } = render(<BarbellTitle />)
    const svgElement = getByTestId('barbell-title-svg')
    expect(svgElement.props.width).toEqual(103)
    expect(svgElement.props.height).toEqual(24)
  })

  it('SVG Path should have correct fill property', () => {
    const { getByTestId } = render(<BarbellTitle />)
    const pathElement = getByTestId('barbell-title-path')
    expect(pathElement.props.fill).toEqual({"payload": 4282926957, "type": 0})
  })
})
