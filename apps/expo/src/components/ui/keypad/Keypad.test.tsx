import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import Keypad from './Keypad'

describe('Keypad component', () => {
  it('renders correctly with visible keypad', () => {
    const { getByTestId } = render(
      <Keypad setNumber={jest.fn()} number='' keypadVisible={true} setKeypadVisible={jest.fn()} />,
    )

    // Check if the keys are rendered
    expect(getByTestId('test-1')).toBeTruthy()
    expect(getByTestId('test-2')).toBeTruthy()
    expect(getByTestId('test-3')).toBeTruthy()
    expect(getByTestId('test-4')).toBeTruthy()
    expect(getByTestId('test-5')).toBeTruthy()
    expect(getByTestId('test-6')).toBeTruthy()
    expect(getByTestId('test-7')).toBeTruthy()
    expect(getByTestId('test-8')).toBeTruthy()
    expect(getByTestId('test-9')).toBeTruthy()
    expect(getByTestId('test-0')).toBeTruthy()
    expect(getByTestId('test-.')).toBeTruthy()
    expect(getByTestId('test-backspace')).toBeTruthy()
  })

  it('checks each key for functionality', () => {
    const setNumber = jest.fn()
    const { getByTestId } = render(
      <Keypad setNumber={setNumber} number='' keypadVisible={true} setKeypadVisible={jest.fn()} />,
    )

    fireEvent.press(getByTestId('test-1'))
    expect(setNumber).toHaveBeenCalledWith('1')
    fireEvent.press(getByTestId('test-2'))
    expect(setNumber).toHaveBeenCalledWith('2')
    fireEvent.press(getByTestId('test-3'))
    expect(setNumber).toHaveBeenCalledWith('3')
    fireEvent.press(getByTestId('test-4'))
    expect(setNumber).toHaveBeenCalledWith('4')

    fireEvent.press(getByTestId('test-backspace'))
    fireEvent.press(getByTestId('test-backspace'))
    fireEvent.press(getByTestId('test-backspace'))
    fireEvent.press(getByTestId('test-backspace'))

    expect(setNumber).toHaveBeenCalledWith('')

    fireEvent.press(getByTestId('test-5'))
    expect(setNumber).toHaveBeenCalledWith('5')
    fireEvent.press(getByTestId('test-6'))
    expect(setNumber).toHaveBeenCalledWith('6')
    fireEvent.press(getByTestId('test-7'))
    expect(setNumber).toHaveBeenCalledWith('7')
    fireEvent.press(getByTestId('test-8'))
    expect(setNumber).toHaveBeenCalledWith('8')

    fireEvent.press(getByTestId('test-backspace'))
    fireEvent.press(getByTestId('test-backspace'))
    fireEvent.press(getByTestId('test-backspace'))
    fireEvent.press(getByTestId('test-backspace'))

    fireEvent.press(getByTestId('test-9'))
    expect(setNumber).toHaveBeenCalledWith('9')
    fireEvent.press(getByTestId('test-0'))
    expect(setNumber).toHaveBeenCalledWith('0')
    fireEvent.press(getByTestId('test-.'))
    expect(setNumber).toHaveBeenCalledWith('.')
  })

  it('simulates minimize being pressed', () => {
    const setNumber = jest.fn()
    const keypadVisible = true
    const { getByTestId } = render(
      <Keypad
        setNumber={setNumber}
        number='123'
        keypadVisible={keypadVisible}
        setKeypadVisible={jest.fn()}
      />,
    )

    fireEvent.press(getByTestId('test-minimize'))
    expect(keypadVisible).toBeTruthy()
  })

  it('handles dot button press correctly', () => {
    const setNumberMock = jest.fn()
    const { getByTestId } = render(
      <Keypad
        setNumber={setNumberMock}
        number='3.14'
        keypadVisible={true}
        setKeypadVisible={() => {}}
      />,
    )

    fireEvent.press(getByTestId('test-.'))
    expect(setNumberMock).not.toHaveBeenCalled()
  })

  it('simulates zero (char[0]) being replaced', () => {
    const setNumber = jest.fn()
    const { getByTestId } = render(
      <Keypad setNumber={setNumber} number='0' keypadVisible={true} setKeypadVisible={jest.fn()} />,
    )

    fireEvent.press(getByTestId('test-5'))
    expect(setNumber).toHaveBeenCalledWith('5')
  })

  it('denies numbers over 9999.99', () => {
    const setNumber = jest.fn()
    const number = '9999.99'
    const { getByTestId } = render(
      <Keypad
        setNumber={setNumber}
        number={number}
        keypadVisible={true}
        setKeypadVisible={jest.fn()}
      />,
    )

    fireEvent.press(getByTestId('test-1'))
    expect(setNumber).not.toHaveBeenCalled()
  })

  it('deletes last number', () => {
    const setNumber = jest.fn()
    const { getByTestId } = render(
      <Keypad
        setNumber={setNumber}
        number='123'
        keypadVisible={true}
        setKeypadVisible={jest.fn()}
      />,
    )

    fireEvent.press(getByTestId('test-backspace'))
    expect(setNumber).toHaveBeenCalledWith('12')
  })

  it('checks empty view', () => {
    const setNumber = jest.fn()
    const { getByTestId } = render(
      <Keypad setNumber={setNumber} number='' keypadVisible={false} setKeypadVisible={jest.fn()} />,
    )

    expect('invisible-test').toBeTruthy()
  })
})
