import React from 'react';
import { render, screen } from '@testing-library/react-native'
import PrivacyPolicy from '~/app/privacy-policy/index'; 

test('PrivacyPolicy', () => {
  render(<PrivacyPolicy />)
  expect(screen.toJSON()).toMatchSnapshot()
})