import React from 'react'
import { render } from '@testing-library/react-native'
import Toggle from '~/components/toggle/toggle'

describe('Toggle', () => {
  it('should match snapshot', () => {
    const { toJSON } = render(
      <Toggle onValueChange={() => {}} value={false} label='test' key='stuff' />,
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
