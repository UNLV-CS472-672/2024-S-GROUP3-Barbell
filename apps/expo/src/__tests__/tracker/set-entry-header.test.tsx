import { render, screen } from '@testing-library/react-native'

import SetEntryHeader from '~/components/tracker/set-entry-header'

describe('SetEntryHeader', () => {
  it('should render correctly', () => {
    render(<SetEntryHeader />)
    expect(screen.getByText('Set')).toBeTruthy()
    expect(screen.getByText('Unilateral')).toBeTruthy()
    expect(screen.getByText('lbs')).toBeTruthy()
    expect(screen.getByText('Reps')).toBeTruthy()
    expect(screen).toMatchSnapshot()
  })
})
