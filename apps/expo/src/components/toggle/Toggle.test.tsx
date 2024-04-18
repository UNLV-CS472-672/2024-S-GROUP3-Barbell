import React from 'react'
import {useState} from "react"
import { render } from '@testing-library/react-native'
import Toggle from '~/components/toggle/toggle'
import FrontBackSwitch from "~/components/muscleGroup/FrontBackSwitch";

describe('Toggle', () => {
  it('should match snapshot', () => {
    const [tmp, setTmp] = useState(false)
    const tmpCh = () => setTmp((previousState) => !previousState)

    const { toJSON } = render(
      <Toggle onValueChange={() => {}} value={false} label='test' key='stuff' />,
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
