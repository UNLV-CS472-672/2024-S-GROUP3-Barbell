import calculateTimeAgo from './calculateTime'

describe('calculateTimeAgo', () => {
  test('returns empty string for future dates', () => {
    const futureDate = new Date()
    futureDate.setMinutes(futureDate.getMinutes() + 5) // 5 minutes into the future
    expect(calculateTimeAgo(futureDate)).toBe('')
  })

  test('returns "Just now" for times less than a minute ago', () => {
    const justNow = new Date()
    expect(calculateTimeAgo(justNow)).toBe('Just now')
  })

  test('returns minutes correctly', () => {
    const tenMinutesAgo = new Date(new Date().getTime() - 10 * 60000)
    expect(calculateTimeAgo(tenMinutesAgo)).toBe('10 minutes ago')
  })

  test('returns hours correctly', () => {
    const twoHoursAgo = new Date(new Date().getTime() - 2 * 3600000)
    expect(calculateTimeAgo(twoHoursAgo)).toBe('2 hours ago')
  })

  test('returns days correctly', () => {
    const threeDaysAgo = new Date(new Date().getTime() - 3 * 86400000)
    expect(calculateTimeAgo(threeDaysAgo)).toBe('3 days ago')
  })

  test('returns weeks correctly', () => {
    const fourWeeksAgo = new Date(new Date().getTime() - 4 * 604800000)
    expect(calculateTimeAgo(fourWeeksAgo)).toBe('4 weeks ago')
  })

  test('handles invalid dates gracefully', () => {
    const invalidDate = new Date('not a real date')
    expect(calculateTimeAgo(invalidDate)).toBe('')
  })

  const oneMinuteAgo = new Date(new Date().getTime() - 60 * 1000)
  test('returns "1 minute ago" for times exactly one minute ago', () => {
    expect(calculateTimeAgo(oneMinuteAgo)).toBe('1 minute ago')
  })

  const fiftyNineMinutesAgo = new Date(new Date().getTime() - 59 * 60 * 1000)
  test('returns minutes correctly just before an hour', () => {
    expect(calculateTimeAgo(fiftyNineMinutesAgo)).toBe('59 minutes ago')
  })

  const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000)
  test('returns "1 hour ago" for times exactly one hour ago', () => {
    expect(calculateTimeAgo(oneHourAgo)).toBe('1 hour ago')
  })

  const twentyThreeHoursAgo = new Date(new Date().getTime() - 23 * 3600 * 1000)
  test('returns hours correctly just before a day', () => {
    expect(calculateTimeAgo(twentyThreeHoursAgo)).toBe('23 hours ago')
  })

  const oneDayAgo = new Date(new Date().getTime() - 24 * 3600 * 1000)
  test('returns "1 day ago" for times exactly one day ago', () => {
    expect(calculateTimeAgo(oneDayAgo)).toBe('1 day ago')
  })

  const sixDaysAgo = new Date(new Date().getTime() - 6 * 86400 * 1000)
  test('returns days correctly just before a week', () => {
    expect(calculateTimeAgo(sixDaysAgo)).toBe('6 days ago')
  })

  const oneWeekAgo = new Date(new Date().getTime() - 7 * 86400 * 1000)
  test('returns "1 week ago" for times exactly one week ago', () => {
    expect(calculateTimeAgo(oneWeekAgo)).toBe('1 week ago')
  })

  // Edge case: what if the date is right now, ensuring "Just now" is consistent
  test('returns "Just now" for the current time', () => {
    const rightNow = new Date()
    expect(calculateTimeAgo(rightNow)).toBe('Just now')
  })
})
