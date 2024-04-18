import React from 'react'
import {useState} from "react"
import { render } from '@testing-library/react-native'
import Toggle from '~/components/toggle/toggle'

describe('Toggle', () => {
  it('should match snapshot', () => {
    const [tmp, setTmp] = useState(false)
    const tmpCh = () => setTmp((previousState) => !previousState)

    const { toJSON } = render(
      <Toggle
        onValueChange={tmpCh}
        value={tmp}
        label={""}
      />,
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
