import { render, screen } from '@testing-library/react-native'

import SetEntry from '~/components/tracker/set-entry'

describe('SetEntry', () => {
  it('should render correctly', async () => {
    render(<SetEntry />)
    expect(screen.getByTestId('set-type-button-container'))
    expect(screen.getByTestId('unilateral-switch-container'))
    expect(screen.getByTestId('weight-input-container'))
    expect(screen.getByTestId('reps-input-container'))
    expect(screen.getByTestId('completed-button-container'))
  })
})
