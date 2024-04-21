import React, { useState } from 'react'

import { fireEvent, render, screen } from '@testing-library/react-native'

import SearchBar from '~/components/ui/search-bar/SearchBar'

type ListItem = {
  id: number
  name: string
}

test('SearchBar filters items based on search input', async () => {
  const TestComponent = () => {
    const item1: ListItem = { id: 1, name: 'apple' }
    const item2: ListItem = { id: 2, name: 'banana' }
    const item3: ListItem = { id: 3, name: 'apricot' }

    const listToFilter: ListItem[] = [item1, item2, item3]
    const [filteredList, setFilteredList] = useState<any[] | undefined>(listToFilter)

    return (
      <>
        <SearchBar
          list={listToFilter}
          placeholder='Search...'
          setFilteredList={setFilteredList}
          filterBy='name'
        />
        {filteredList?.map((item) => <div key={item.id}>{item.name}</div>)}
      </>
    )
  }

  render(<TestComponent />)

  const searchInput = screen.getByPlaceholderText('Search...')

  fireEvent.changeText(searchInput, 'ap')

  expect(screen.getByText('apple')).toBeTruthy()
  expect(screen.getByText('apricot')).toBeTruthy()
  expect(screen.queryByText('banana')).toBeNull() // Use toBeNull for non-existent elements in RN
})
