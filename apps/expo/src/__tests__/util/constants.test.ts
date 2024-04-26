import { ACTIVITY_FEED_ITEM_LIMIT, FA } from '~/utils/constants'

describe('Font Awesome icon sizes', () => {
  test('should have correct default sizes', () => {
    expect(FA.reg).toBe(26)
    expect(FA.lg).toBe(32)
    expect(FA.xl).toBe(48)
  })
})

describe('Activity Feed Item Limit', () => {
  test('should have a default value of 10', () => {
    expect(ACTIVITY_FEED_ITEM_LIMIT).toBe(10)
  })
})
