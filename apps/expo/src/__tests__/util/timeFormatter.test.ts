import formatTime from '../../utils/timerFormatter'

test('formatTime', () => {
  expect(formatTime(0)).toBe('0:00')
  expect(formatTime(1)).toBe('0:01')
  expect(formatTime(10)).toBe('0:10')
  expect(formatTime(60)).toBe('1:00')
  expect(formatTime(61)).toBe('1:01')
  expect(formatTime(600)).toBe('10:00')
  expect(formatTime(601)).toBe('10:01')
  expect(formatTime(3600)).toBe('1:00:00')
  expect(formatTime(3601)).toBe('1:00:01')
  expect(formatTime(3660)).toBe('1:01:00')
  expect(formatTime(3661)).toBe('1:01:01')
  expect(formatTime(36610)).toBe('10:10:10')
})
