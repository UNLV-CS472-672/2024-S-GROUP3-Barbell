import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Friend from '~/components/frlist/Friend';

jest.mock('expo-router', () => ({
    Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('Friend', () => {
    const defaultProps = {
        username: 'john123',
        userId: 1,
        chatId: 1,
        name: 'John',
    };
  
    it('renders the friend information correctly', () => {
        const { getByText } = render(<Friend {...defaultProps} />);
        expect(getByText('john123')).toBeTruthy();
        expect(getByText('John')).toBeTruthy();
    });
  
    it('renders the username correctly when name is null', () => {
        const props = { ...defaultProps, name: null };
        const { getByText, queryByText } = render(<Friend {...props} />);
        expect(getByText('john123')).toBeTruthy();
        expect(queryByText('John')).toBeNull();
    });
  

    it.skip('navigates to the profile screen when profile button is pressed', () => {
        const { getByTestId } = render(<Friend {...defaultProps} />);
        const profileButton = getByTestId('profile-button');
        fireEvent.press(profileButton);
        // Add assertion to check if navigation to profile screen is triggered
    });

    it.skip('navigates to the messages screen when message button is pressed', () => {
        const { getByTestId } = render(<Friend {...defaultProps} />);
        const messageButton = getByTestId('message-button');
        fireEvent.press(messageButton);
        // Add assertion to check if navigation to messages screen is triggered
    });
});