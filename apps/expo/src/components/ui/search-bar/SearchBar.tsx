import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

interface SearchBarProps {
  list: any[]
  setFilteredList: any
  filterBy: string
  placeholder: string
}

export default function SearchBar({ list, setFilteredList, filterBy, placeholder }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setFilteredList(list.filter((item) => item[filterBy].toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm])

  return (
    <View className="mx-3 rounded-[5px] bg-[#272727]" testID="searchBar">
      <TextInput
        className="top-0 mx-1 px-4 py-[6px] text-[12px]
          text-[#CACACA] placeholder:text-[20px] placeholder:italic placeholder:text-[#CACACA] placeholder:opacity-40"
        placeholder={placeholder}
        onChangeText={setSearchTerm}
      />
    </View>
  )
}
