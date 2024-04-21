import React from 'react'

import { render } from '@testing-library/react-native'
import { UseTRPCQueryResult } from '@trpc/react-query/shared'

import FriendsListScreen from '~/app/frlist'
import { TGlobalContext, useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

// Mock the useRouter hook
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}))

// Mock the api module
jest.mock('~/utils/trpc/api', () => ({
  api: {
    friend: {
      getFriendsWithChatIdFromUserId: {
        useQuery: jest.fn(),
      },
    },
  },
}))

// Mock the useGlobalContext hook
jest.mock('~/context/global-context', () => ({
  useGlobalContext: jest.fn(),
}))

// Mock the Friend component
jest.mock('~/components/frlist/Friend', () => ({
  __esModule: true,
  default: require('~/__mocks__/friend').default,
}))

// supress any console.logs
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('FriendsListScreen', () => {
  let useGlobalContextMock: jest.MockedFunction<typeof useGlobalContext>
  let getFriendsWithChatIdQueryMock: jest.MockedFunction<
    typeof api.friend.getFriendsWithChatIdFromUserId.useQuery
  >

  beforeEach(() => {
    // Create typed mocks for the hooks and API functions
    useGlobalContextMock = useGlobalContext as jest.MockedFunction<typeof useGlobalContext>
    getFriendsWithChatIdQueryMock = api.friend.getFriendsWithChatIdFromUserId
      .useQuery as jest.MockedFunction<typeof api.friend.getFriendsWithChatIdFromUserId.useQuery>

    // Mock the return value of useGlobalContext
    useGlobalContextMock.mockReturnValue({
      userData: { id: 9 },
    } as TGlobalContext)

    // Mock the return value of api.friend.getFriendsWithChatIdFromUserId.useQuery
    getFriendsWithChatIdQueryMock.mockReturnValue({
      data: [
        { id: 1, name: 'John', username: 'john123', chatId: 1 },
        { id: 2, name: 'Jane', username: 'jane456', chatId: 2 },
      ],
      isFetched: true,
      isFetching: false,
    } as unknown as UseTRPCQueryResult<unknown, any>)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the friends list correctly', () => {
    const { getByTestId } = render(<FriendsListScreen />)

    expect(getByTestId('friend-john123')).toBeTruthy()
    expect(getByTestId('friend-jane456')).toBeTruthy()
  })
})
