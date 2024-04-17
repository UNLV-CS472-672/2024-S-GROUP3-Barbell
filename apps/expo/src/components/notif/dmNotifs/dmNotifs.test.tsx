import { render, screen } from '@testing-library/react-native'

import * as api from '~/utils/trpc/api'
import DmNotifs from './dmNotifs'

jest.mock('~/context/global-context', () => ({
  useGlobalContext: () => ({
    userData: {
      id: 1,
      username: 'testUser',
    },
  }),
}))

const mockApi = api as { api: any }

jest.mock('~/utils/trpc/api', () => ({
  __esModule: true,
  api: {
    notif: {
      getMessagePreviewsFromUserIdAndChatType: {
        useQuery: jest.fn(),
      },
    },
  },
}))

jest.mock('~/components/notif/Conversation', () => ({
  __esModule: true,
  default: () => <></>,
}))

// mocking this component because it uses an useEffect hook that causes the test to
// throw warnings about not using act() when rendering the component
jest.mock('~/components/notif/RotatingBarbellIcon')

describe('DmNotifs', () => {
  it('should render DmNotifs component', () => {
    mockApi.api.notif.getMessagePreviewsFromUserIdAndChatType.useQuery = jest.fn(() => ({}))
    render(<DmNotifs />)
    expect(screen.getByTestId('dm-notifications-container')).toBeTruthy()
  })

  it('should render rotating barbell icon when fetching messages', () => {
    mockApi.api.notif.getMessagePreviewsFromUserIdAndChatType.useQuery = jest.fn(() => ({
      data: [],
      isFetched: false,
      isFetching: true,
    }))
    render(<DmNotifs />)
    expect(screen.getByTestId('rotating-barbell-icon-container')).toBeTruthy()
  })

  it('should render no messages text when no messages are fetched', () => {
    mockApi.api.notif.getMessagePreviewsFromUserIdAndChatType.useQuery = jest.fn(() => ({
      data: [],
      isFetched: true,
      isFetching: false,
    }))
    render(<DmNotifs />)
    expect(screen.getByTestId('no-messages-text')).toBeTruthy()
  })
})
