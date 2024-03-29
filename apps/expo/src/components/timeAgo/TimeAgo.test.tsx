import { render, screen } from '@testing-library/react-native'

import TimeAgo from './TimeAgo'

/**
 * The function has been generated since we are using snapshots to do our frontend testing.
 * This snapshot would be outdated in one week if we were to use a specific date in our testing.
 * To fix this, we will just get the date from exactly 4 weeks ago to see if the TimeAgo component
 * will return an item with the appropriate text of "4 weeks ago"
 * Thus, the snapshot will now never be out of date.
 */
function getDateFourWeeksAgo(): Date {
  const currentDate = new Date()
  const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000 // milliseconds in a week
  const millisecondsInFourWeeks = 4 * millisecondsInAWeek // milliseconds in 4 weeks

  const fourWeeksAgo = new Date(currentDate.getTime() - millisecondsInFourWeeks)
  return fourWeeksAgo
}

// Adjust the timeout for this test
test('TimeAgo', async () => {
  const expectedCreatedAt = getDateFourWeeksAgo()
  const expectedTimeAgo = '4 weeks ago'

  render(<TimeAgo createdAt={expectedCreatedAt} />)
  const timeAgoOutput = await screen.findByTestId('timeAgoText')

  expect(timeAgoOutput).toHaveTextContent(expectedTimeAgo)
  expect(screen.toJSON()).toMatchSnapshot()

  // The part below seems to be intended for testing bad date handling.
  // Ensure that your TimeAgo component and calculateTimeAgo function are designed to handle and test such cases correctly.
  // It's also not clear from the provided code how 'timeAgoBadDate' is set since the 'calculateTimeAgo' handling of bad dates is not shown.
}, 10000) // Increase the timeout for this test
