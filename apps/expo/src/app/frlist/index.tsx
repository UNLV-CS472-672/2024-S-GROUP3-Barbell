import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from 'expo-router'

import Friend from '~/components/frlist/Friend'
import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import TopNavBar from '~/components/ui/nav-bar/NavBar'
import SearchBar from '~/components/ui/search-bar/SearchBar'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

interface Friend {
  id: number
  name: string | null
  username: string
  chatId?: number | null
}

export default function FriendsListScreen() {
  const { userData } = useGlobalContext()
  const { data, isFetched, isFetching, refetch } =
    api.friend.getFriendsWithChatIdFromUserId.useQuery({
      id: userData?.id!,
    })

  const [filteredList, setFilteredList] = useState(data)

  const friendComponents = filteredList?.map((friend) => (
    <Friend
      chatId={friend.chatId}
      userId={friend.id}
      username={friend.username}
      key={friend.id}
      name={friend.name}
    />
  ))

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, []),
  )

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <TopNavBar center={'Friends'} />
      <SearchBar
        filterBy='username'
        list={data}
        setFilteredList={setFilteredList}
        placeholder='Search friends'
      />

      <ScrollView>
        {isFetching && <RotatingBarbellIcon />}
        {isFetched && friendComponents}
      </ScrollView>
    </SafeAreaView>
  )
}
