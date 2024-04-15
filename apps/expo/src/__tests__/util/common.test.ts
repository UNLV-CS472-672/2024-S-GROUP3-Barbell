import getErrorMessage, { makeChatName } from '~/utils/common'

describe('getErrorMessage', () => {
  test('returns message for Error instances', () => {
    const errorMessage = 'This is an error'
    const errorInstance = new Error(errorMessage)
    expect(getErrorMessage(errorInstance)).toBe(errorMessage)
  })

  test('returns JSON string for object errors', () => {
    const objectError = { msg: 'This is an object error' }
    expect(getErrorMessage(objectError)).toBe(JSON.stringify(objectError))
  })

  test('returns string for string errors', () => {
    const stringError = 'This is a string error'
    expect(getErrorMessage(stringError)).toBe(stringError)
  })

  test('returns string representation for number errors', () => {
    const numberError = 404
    expect(getErrorMessage(numberError)).toBe('404')
  })

  test('handles null gracefully', () => {
    const nullError = null
    expect(getErrorMessage(nullError)).toBe('null')
  })

  test('handles undefined gracefully', () => {
    const undefinedError = undefined
    expect(getErrorMessage(undefinedError)).toBe('undefined')
  })
})

describe('makeChatName', () => {
  const users = [
    { username: 'Alice' },
    { username: 'Bob' },
    { username: 'Charlie' },
    { username: 'Dave' },
  ]

  test('formats chat name for exactly three users, excluding the current user', () => {
    const currentUser = { username: 'Dave' }
    expect(makeChatName(users, currentUser)).toBe('Alice, Bob, + 1 more')
  })

  test('formats chat name for more than two users, excluding the current user, without additional text', () => {
    const currentUser = { username: 'Dave' }
    expect(makeChatName(users, currentUser)).toBe('Alice, Bob, + 1 more')
  })

  test('formats chat name for two users exactly, excluding the current user', () => {
    const twoUsers = [{ username: 'Alice' }, { username: 'Bob' }, { username: 'Dave' }]
    const currentUser = { username: 'Dave' }
    expect(makeChatName(twoUsers, currentUser)).toBe('Alice and Bob')
  })
})
