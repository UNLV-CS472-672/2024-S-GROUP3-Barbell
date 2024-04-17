import { render, screen } from '@testing-library/react-native'

import FrontBackSwitch from "~/components/muscleGroup/FrontBackSwitch";
import {useState} from "react";

test('FrontBackSwitch', () => {
  const [tmp, setTmp] = useState(false)
  const tmpCh = () => setTmp((previousState) => !previousState)

  render(<FrontBackSwitch
    onValueChange={tmpCh}
    value={tmp}
    label={""}
  />)
  expect(screen.toJSON()).toMatchSnapshot()
})
