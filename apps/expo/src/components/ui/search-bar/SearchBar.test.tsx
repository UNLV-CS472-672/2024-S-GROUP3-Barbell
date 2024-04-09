import React, { useState } from 'react'

import { fireEvent, render, screen } from '@testing-library/react-native'

import SearchBar from './SearchBar'

test('SearchBar', async () => {
  const TestComponent = () => {
    const item1 = {
      id: 1,
      name: 'ab',
    }
    const item2 = {
      id: 2,
      name: 'abc',
    }
    const item3 = {
      id: 3,
      name: 'bac',
    }

    const listToFilter = [item1, item2, item3]
    const [filteredList, setFilteredList] = useState(listToFilter)

    return <SearchBar list={listToFilter} placeholder="Search..." setFilteredList={setFilteredList} filterBy="name" />
  }

  render(<TestComponent />)

  // Find the search input
  const searchInput = screen.getByPlaceholderText('Search...')

  // Simulate typing in the search input
  fireEvent.changeText(searchInput, 'a') // Type 'a'
})
