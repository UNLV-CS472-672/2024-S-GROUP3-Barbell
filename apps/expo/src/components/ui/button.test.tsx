import React from 'react'
import { Pressable } from 'react-native'
import renderer from 'react-test-renderer'

import Button from './button'

describe('Button', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Button />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
