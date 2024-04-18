import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link, Route, router } from 'expo-router'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ChatType } from '@prisma/client'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import SearchBar from '~/components/ui/search-bar/SearchBar'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    color: '#fff',
  },
  actionButton: {
    paddingHorizontal: 8,
    color: '#fff',
  },
})

interface Friend {
  id: number
  name: string | null
  username: string
  chatId?: number | null
}

export default function FriendsListScreen() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([])
  const { userData } = useGlobalContext()

  const {
    data: friendsData,
    isFetching,
    isFetched,
    error,
  } = api.friend.getFriendsWithChatIdFromUserId.useQuery({ id: userData?.id! })

  const deleteFriendMutation = api.friend.delete.useMutation()

  useEffect(() => {
    if (friendsData) {
      const transformedData = friendsData.map((friend) => ({
        id: friend.id,
        name: friend.name,
        username: friend.username,
        chatId: friend.chatId,
      }))

      setFriends(transformedData)
      setFilteredFriends(transformedData)
    }
  }, [friendsData])

  const handleNavigateToProfile = (userId: number) => {
    router.push(`/user/${userId}` as Route<string>)
  }

  const handleNavigateToMessages = async (friend: Friend) => {
    console.log('chatId: ' + friend.chatId)
  }

  const handleRemoveFriend = useCallback(
    async (userId: number) => {
      try {
        await deleteFriendMutation.mutateAsync({ id: userId })
        setFriends(friends.filter((friend) => friend.id !== userId))
        setFilteredFriends(filteredFriends.filter((friend) => friend.id !== userId))
      } catch (error) {
        console.error('Error removing friend:', error)
      }
    },
    [deleteFriendMutation, friends, filteredFriends],
  )

  const filterFriendsMapPromises = filteredFriends.map((item: any) => {
    let chatId: string = ''
    if (item.chatId) {
      chatId = String(item.chatId)
    } else {
      const createChat = api.friend.createChatWithFriend.useMutation()
      chatId = String(createChat.mutateAsync({ userId: userData?.id!, friendId: item.id }))
    }
    const chatName = item.username
    const type = ChatType.DIRECT
    return (
      <View style={styles.friendItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons
            style={styles.iconContainer}
            name='face-man-profile'
            size={36}
            color='#CACACA'
          />
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Link href={{ pathname: 'messages/', params: {} }} asChild={true}>
            <TouchableOpacity onPress={() => handleNavigateToMessages(item)}>
              <Text style={styles.actionButton}>Message</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={() => handleNavigateToProfile(item.id)}>
            <Text style={styles.actionButton}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveFriend(item.id)}>
            <Text style={styles.actionButton}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  })

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <View style={styles.container}>
      <SearchBar
        list={friends}
        setFilteredList={
          setFilteredFriends as React.Dispatch<React.SetStateAction<any[] | undefined>>
        }
        filterBy='username'
        placeholder='Search For Friend By Username...'
      />
      {isFetching && <RotatingBarbellIcon />}
      {isFetched && filterFriendsMapPromises}
    </View>
  )
}
