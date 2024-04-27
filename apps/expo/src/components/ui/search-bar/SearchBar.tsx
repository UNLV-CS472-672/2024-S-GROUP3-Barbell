/**
 * HOW TO USE:
 * --------------------------------------------------------------------------------
 * Inside of your PARENT component, you need to have the following:
 * - list: any[]
 *    - This is your raw data that you get from a query
 * - const[filteredList, setFilteredList] = useState<any[]>(List)
 *    - filteredList is what is going to be displayed
 *    - setFilteredList is how we set the values that are going to be outputted
 * - filterBy: string
 *    - this is the field that you want to filter your data by
 * - placeholder: string
 *    - placeholder text within the search bar
 * --------------------------------------------------------------------------------
 * To output the data, you want to use a map and map the items within filteredList
 * to your list item component.
 *
 * For example:
 *  <SearchBar list={list} placeholder="Search..." setFilteredList={setFilteredList} filterBy="name" />
 *  {filteredList.map((item, index) => (
 *    <View key={index}>
 *      <Text>{item.name}</Text>
 *    </View>
 *  ))}
 */

import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { Fontisto } from '@expo/vector-icons'

interface SearchBarProps {
  list: any[] | undefined
  setFilteredList: React.Dispatch<React.SetStateAction<any[] | undefined>>
  filterBy: string
  placeholder: string
}

export default function SearchBar({
  list,
  setFilteredList,
  filterBy,
  placeholder,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    /* istanbul ignore next */
    if (list) {
      setFilteredList(
        list.filter((item) => item[filterBy].toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }
  }, [list, filterBy, searchTerm])

  return (
    <View
      className='mx-3 my-2 flex-row items-center rounded-xl bg-[#272727] px-3'
      testID='searchBar'
    >
      <Fontisto name='search' size={24} color='#717171' />
      <TextInput
        className='placeholder:color-[#717171] w-full px-3 py-3 text-[20px] text-white'
        placeholder={placeholder}
        onChangeText={setSearchTerm}
      />
    </View>
  )
}
