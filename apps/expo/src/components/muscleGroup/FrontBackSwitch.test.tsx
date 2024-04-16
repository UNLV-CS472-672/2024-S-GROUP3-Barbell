import React from 'react'

import { render } from '@testing-library/react-native'

import FrontBackSwitch from '~/components/muscleGroup/FrontBackSwitch'

describe('FrontBackSwitch', () => {
  it('should match snapshot', () => {
    const { toJSON } = render(
      <FrontBackSwitch label='test' onValueChange={() => {}} value={false} key='stuff' />,
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
