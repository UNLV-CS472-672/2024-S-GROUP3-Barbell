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

interface SearchBarProps {
  list: any[] | undefined
  setFilteredList: React.Dispatch<React.SetStateAction<any[] | undefined>>
  filterBy: string
  placeholder: string
}

export default function SearchBar({ list, setFilteredList, filterBy, placeholder }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  if (list) {
    useEffect(() => {
      setFilteredList(list.filter((item) => item[filterBy].toLowerCase().includes(searchTerm.toLowerCase())))
    }, [searchTerm])
  }

  return (
    <View className="mx-3 rounded-[5px] bg-[#272727]" testID="searchBar">
      <TextInput
        className="placeholder:color-[#717171] top-0 mx-1 px-4 py-[6px] text-[20px] text-white"
        placeholder={placeholder}
        onChangeText={setSearchTerm}
      />
    </View>
  )
}
