import { generateUsername } from '~/utils/usernameGenerator'

jest.mock('react-native-get-random-values', () => ({
  getRandomBase64: jest.fn(),
}))

jest.mock('uuid', () => ({
  v4: jest.fn(() => ({
    split: jest.fn(() => ({
      join: jest.fn(() => ({
        slice: jest.fn(() => '1234567890123'),
      })),
    })),
  })),
}))

test('generateUsername', () => {
  expect(generateUsername()).toBe('user_1234567890123')
})
