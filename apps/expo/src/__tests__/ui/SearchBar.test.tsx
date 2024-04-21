import React from 'react'

import renderer from 'react-test-renderer'

import SearchBar from '~/components/ui/search-bar/SearchBar'

describe('SearchBar Component', () => {
  test('renders correctly and matches snapshot', () => {
    const list = [{ id: 1, name: 'Example' }]
    const setFilteredList = jest.fn()

    const tree = renderer
      .create(
        <SearchBar
          list={list}
          setFilteredList={setFilteredList}
          filterBy='name'
          placeholder='Search...'
        />,
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
