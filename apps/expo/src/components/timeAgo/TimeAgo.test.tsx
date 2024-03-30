import React from 'react'

import { render, screen } from '@testing-library/react-native'

import calculateTimeAgo from '~/utils/calculateTime'
import TimeAgo from './TimeAgo'

describe('TimeAgo', () => {
  /*  */
  test('renders correctly for different time intervals', () => {
    const now = new Date()
    const cases = [
      { createdAt: new Date(now.getTime() - 30 * 1000), expected: 'Just now' },
      { createdAt: new Date(now.getTime() - 2 * 60 * 1000), expected: '2 minutes ago' },
      { createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000), expected: '3 hours ago' },
      { createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), expected: '2 days ago' },
      { createdAt: new Date(now.getTime() - 2 * 7 * 24 * 60 * 60 * 1000), expected: '2 weeks ago' },
    ]

    for (const { createdAt, expected } of cases) {
      render(<TimeAgo createdAt={createdAt} />)
      const timeAgoText = screen.getByTestId('timeAgoText')
      expect(timeAgoText).toHaveTextContent(expected)
    }
  })

  /*  */
  test('renders an empty view for invalid or future dates', () => {
    const invalidDate = new Date('invalid')
    const futureDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour in the future

    render(<TimeAgo createdAt={invalidDate} />)
    expect(screen.getByTestId('timeAgoBadDate')).toBeTruthy()

    render(<TimeAgo createdAt={futureDate} />)
    expect(screen.getByTestId('timeAgoBadDate')).toBeTruthy()
  })

  /*  */
  test('calculateTimeAgo helper function works correctly', () => {
    const now = new Date()
    const cases = [
      { timeSent: new Date(now.getTime() - 30 * 1000), expected: 'Just now' },
      { timeSent: new Date(now.getTime() - 2 * 60 * 1000), expected: '2 minutes ago' },
      { timeSent: new Date(now.getTime() - 3 * 60 * 60 * 1000), expected: '3 hours ago' },
      { timeSent: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), expected: '2 days ago' },
      { timeSent: new Date(now.getTime() - 2 * 7 * 24 * 60 * 60 * 1000), expected: '2 weeks ago' },
    ]

    for (const { timeSent, expected } of cases) {
      expect(calculateTimeAgo(timeSent)).toBe(expected)
    }
  })

  it('renders correctly and matches snapshot', () => {
    const testDate = new Date()
    const { toJSON } = render(<TimeAgo createdAt={testDate} />)

    expect(toJSON()).toMatchSnapshot()
  })
})
