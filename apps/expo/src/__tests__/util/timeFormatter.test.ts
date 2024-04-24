import { formatForWorkoutCompletion } from '~/utils/timerFormatter';

describe('formatForWorkoutCompletion', () => {
  test('formats seconds correctly', () => {
    expect(formatForWorkoutCompletion(0)).toBe('0s');
    expect(formatForWorkoutCompletion(1)).toBe('1s');
    expect(formatForWorkoutCompletion(23)).toBe('23s');
  });

  test('formats minutes and seconds correctly', () => {
    expect(formatForWorkoutCompletion(60)).toBe('1m 0s');
    expect(formatForWorkoutCompletion(61)).toBe('1m 1s');
    expect(formatForWorkoutCompletion(3599)).toBe('59m 59s');
  });

  test('formats hours, minutes, and seconds correctly', () => {
    expect(formatForWorkoutCompletion(3600)).toBe('1h 0m 0s');
    expect(formatForWorkoutCompletion(3661)).toBe('1h 1m 1s');
    expect(formatForWorkoutCompletion(7322)).toBe('2h 2m 2s');
    expect(formatForWorkoutCompletion(43500)).toBe('12h 5m 0s');
  });
});
