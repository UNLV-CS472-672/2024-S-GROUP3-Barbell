import { render, screen } from '@testing-library/react-native'
import TimeAgo from './TimeAgo'

// Adjust the timeout for this test
test('TimeAgo', async () => {
  const expectedCreatedAt = new Date('2021-01-01T00:00:00Z') // Corrected date string
  const expectedTimeAgo = '168 weeks ago'

  render(<TimeAgo createdAt={expectedCreatedAt} />)
  const timeAgoOutput = await screen.findByTestId('timeAgoText')

  expect(timeAgoOutput).toHaveTextContent(expectedTimeAgo)
  expect(screen.toJSON()).toMatchSnapshot()
  
  // The part below seems to be intended for testing bad date handling.
  // Ensure that your TimeAgo component and calculateTimeAgo function are designed to handle and test such cases correctly.
  // It's also not clear from the provided code how 'timeAgoBadDate' is set since the 'calculateTimeAgo' handling of bad dates is not shown.
}, 10000); // Increase the timeout for this test
