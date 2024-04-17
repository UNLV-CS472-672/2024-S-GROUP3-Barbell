import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FriendsListScreen from '~/app/frlist';

describe('FriendsListScreen', () => {
  it('renders loading indicator when data is loading', () => {
    const { getByTestId } = render(<FriendsListScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error message when there is an error', async () => {
    // Mock the useQuery hook to return an error
    jest.mock('~/utils/trpc/api', () => ({
      friend: {
        getFriends: {
          useQuery: jest.fn(() => ({
            data: undefined,
            isLoading: false,
            error: { message: 'Error message' },
          })),
        },
      },
    }));

    const { findByText } = render(<FriendsListScreen />);
    const errorMessage = await findByText('Error message');
    expect(errorMessage).toBeTruthy();
  });

  it('renders friend list when data is loaded', async () => {
    // Mock the useQuery hook to return friends data
    jest.mock('~/utils/trpc/api', () => ({
      friend: {
        getFriends: {
          useQuery: jest.fn(() => ({
            data: [{ id: 1, username: 'Friend 1' }, { id: 2, username: 'Friend 2' }],
            isLoading: false,
            error: undefined,
          })),
        },
        delete: {
          useMutation: jest.fn(() => ({ mutateAsync: jest.fn() })),
        },
      },
    }));

    const { findByText } = render(<FriendsListScreen />);
    const friend1 = await findByText('Friend 1');
    const friend2 = await findByText('Friend 2');
    expect(friend1).toBeTruthy();
    expect(friend2).toBeTruthy();
  });

  it('removes friend when remove button is clicked', async () => {
    const mockMutateAsync = jest.fn();
    // Mock the useQuery hook to return friends data
    jest.mock('~/utils/trpc/api', () => ({
      friend: {
        getFriends: {
          useQuery: jest.fn(() => ({
            data: [{ id: 1, username: 'Friend 1' }],
            isLoading: false,
            error: undefined,
          })),
        },
        delete: {
          useMutation: jest.fn(() => ({ mutateAsync: mockMutateAsync })),
        },
      },
    }));

    const { getByText, queryByText } = render(<FriendsListScreen />);
    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledTimes(1);
      expect(queryByText('Friend 1')).toBeNull(); // Friend should be removed from the list
    });
  });
});