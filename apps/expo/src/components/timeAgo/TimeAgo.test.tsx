import { render, screen } from '@testing-library/react-native'

import TimeAgo from './TimeAgo'

test('TimeAgo', async () => {
  const expectedCreatedAt = new Date('2021-01-:00:00Z')
  const expectedTimeAgo = '168 weeks ago'

  render(<TimeAgo createdAt={expectedCreatedAt} />)

  const timeAgoOutput = await screen.findByTestId('timeAgoText')

  expect(timeAgoOutput).toHaveTextContent(expectedTimeAgo)
  expect(screen.toJSON()).toMatchSnapshot()

  const expectedErrorDate = new Date('TESTING_BAD_DATE')

  render(<TimeAgo createdAt={expectedErrorDate} />)
  const timeAgoBadDateOutput = await screen.findByTestId('timeAgoBadDate')

  expect(timeAgoBadDateOutput).toHaveTextContent('')
})
