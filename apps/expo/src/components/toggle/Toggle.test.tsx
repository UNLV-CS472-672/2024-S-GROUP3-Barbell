import { render, screen } from '@testing-library/react-native'
//import Toggle from './Toggle'
import {useState} from "react";
import Toggle from '~/components/toggle/toggle'

test('Toggle', () => {
  const [tmp, setTmp] = useState(false)
  const tmpCh = () => setTmp((previousState) => !previousState)
  render(<Toggle
    onValueChange={tmpCh}
    value={tmp}
    label={""}
  />)
  expect(screen.toJSON()).toMatchSnapshot()
})
