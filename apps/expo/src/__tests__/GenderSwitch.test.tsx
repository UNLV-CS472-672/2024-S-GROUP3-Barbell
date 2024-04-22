import React from 'react'
import { render } from '@testing-library/react-native'
import GenderSwitch from '~/components/muscleGroup/GenderSwitch'

describe('GenderSwitch', () => {
  it('should match snapshot', () => {
    const { toJSON } = render(
      <GenderSwitch onValueChange={() => {}} value={false} key='stuff' />,
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
