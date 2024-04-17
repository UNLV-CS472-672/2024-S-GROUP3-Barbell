import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useRouter, Router } from 'expo-router';
import { api } from '~/utils/trpc/api';
import { useGlobalContext, TGlobalContext } from '~/context/global-context';
import FriendsListScreen from '~/app/frlist';
import { UseTRPCQueryResult, UseTRPCMutationResult } from '@trpc/react-query/shared';

// Mock the useRouter hook
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

// Mock the api module
jest.mock('~/utils/trpc/api', () => ({
  api: {
    friend: {
      getFriends: {
        useQuery: jest.fn(),
      },
      delete: {
        useMutation: jest.fn(),
      },
    },
  },
}));

// Mock the useGlobalContext hook
jest.mock('~/context/global-context', () => ({
  useGlobalContext: jest.fn(),
}));

describe('FriendsListScreen', () => {
  let useGlobalContextMock: jest.MockedFunction<typeof useGlobalContext>;
  let useRouterMock: jest.MockedFunction<typeof useRouter>;
  let getFriendsQueryMock: jest.MockedFunction<typeof api.friend.getFriends.useQuery>;
  let deleteFriendMutationMock: jest.MockedFunction<typeof api.friend.delete.useMutation>;

  beforeEach(() => {
    // Create typed mocks for the hooks and API functions
    useGlobalContextMock = useGlobalContext as jest.MockedFunction<typeof useGlobalContext>;
    useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;
    getFriendsQueryMock = api.friend.getFriends.useQuery as jest.MockedFunction<typeof api.friend.getFriends.useQuery>;
    deleteFriendMutationMock = api.friend.delete.useMutation as jest.MockedFunction<typeof api.friend.delete.useMutation>;

    // Mock the return value of useGlobalContext
    useGlobalContextMock.mockReturnValue({
      userData: { id: 9 },
    } as TGlobalContext);

    // Mock the return value of api.friend.getFriends.useQuery
    getFriendsQueryMock.mockReturnValue({
      data: [
        { id: 1, name: 'John', username: 'john123' },
        { id: 2, name: 'Jane', username: 'jane456' },
      ],
      isLoading: false,
      error: null,
      trpc: {
        path: '/friend.getFriends',
        refetch: jest.fn(),
        // other necessary properties...
      },
    } as unknown as UseTRPCQueryResult<unknown, any>);

    // Mock the return value of api.friend.delete.useMutation
    deleteFriendMutationMock.mockReturnValue({
      mutate: jest.fn(),
      mutateAsync: jest.fn(),
      // other properties...
    } as unknown as UseTRPCMutationResult<any, any, any, any>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the friends list correctly', () => {
    const { getByText } = render(<FriendsListScreen />);

    expect(getByText('john123')).toBeTruthy();
    expect(getByText('jane456')).toBeTruthy();
  });

  it.skip('navigates to the profile screen when profile button is pressed', () => {
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({ push: pushMock } as unknown as Router);

    const { getByText } = render(<FriendsListScreen />);
    fireEvent.press(getByText('Profile'));

    expect(pushMock).toHaveBeenCalledWith('/user/1');
  });

  it.skip('navigates to the messages screen when message button is pressed', () => {
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({ push: pushMock } as unknown as Router);

    const { getByText } = render(<FriendsListScreen />);
    fireEvent.press(getByText('Message'));

    expect(pushMock).toHaveBeenCalledWith('/messages/1');
  });

  it.skip('removes a friend when remove button is pressed', async () => {
    const { getByText } = render(<FriendsListScreen />);
    fireEvent.press(getByText('Remove'));

    await waitFor(() => {
      expect(deleteFriendMutationMock().mutateAsync).toHaveBeenCalledWith({ id: 1 });
    });
  });
});