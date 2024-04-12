import { render, screen } from '@testing-library/react-native'

import FrontBackSwitch from "~/components/muscleGroup/FrontBackSwitch";

test('FrontBackSwitch', () => {
  render(<FrontBackSwitch />)
  expect(screen.toJSON()).toMatchSnapshot()
})
