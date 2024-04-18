import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

import { Route, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useGlobalContext } from '~/context/global-context';
import { api } from '~/utils/trpc/api';

import SearchBar from '~/components/ui/search-bar/SearchBar'


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
});

interface Friend {
  id: number;
  username: string;
}

const handleNavigateToProfile = (userId: number) => {
  router.push(`/user/${userId}` as Route<string>);
};

const handleNavigateToMessages = async (friend: Friend) => {
  const { userData } = useGlobalContext();
  const mutation = api.friend.getChatIdByFriendId.useMutation();

  // Use mutateAsync to perform the mutation and wait for the result
  const chatId = await mutation.mutateAsync({
    userId: userData?.id ?? 0,
    friendId: friend.id,
  });

  if (chatId) {
    router.push(`/messages/${chatId}` as Route<string>);
  } else {
    // Handle any error that may occur during chat creation
    console.error('Failed to create a new chat');
  }
};

const FriendsListScreen = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);
  const { userData } = useGlobalContext();
  console.log('userData:', userData);

  const { data: friendsData, isLoading, error } = api.friend.getFriends.useQuery(
    { id: userData?.id ?? 0 },
    { enabled: !!userData?.id }
  );

  const deleteFriendMutation = api.friend.delete.useMutation();

  useEffect(() => {
    if (friendsData) {
      const transformedData = friendsData.map((friend) => ({
        id: friend.id,
        name: friend.name,
        username: friend.username,
      }));
  
      setFriends(transformedData);
      setFilteredFriends(transformedData);
    }
  }, [friendsData]);

  const handleRemoveFriend = useCallback(
    async (userId: number) => {
      try {
        await deleteFriendMutation.mutateAsync({ id: userId });
        setFriends(friends.filter(friend => friend.id !== userId));
        setFilteredFriends(filteredFriends.filter(friend => friend.id !== userId));
      } catch (error) {
        console.error('Error removing friend:', error);
      }
    },
    [deleteFriendMutation, friends, filteredFriends]
  );

  const renderFriendItem = ({ item }: { item: Friend }) => {
    return (
      <View style={styles.friendItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons
            style={styles.iconContainer}
            name="face-man-profile"
            size={36}
            color="#CACACA"
          />
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => handleNavigateToMessages(item)}>
            <Text style={styles.actionButton}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigateToProfile(item.id)}>
            <Text style={styles.actionButton}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveFriend(item.id)}>
            <Text style={styles.actionButton}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (isLoading) {

    return (
        <ActivityIndicator size="large" color="#0000ff" />
    );
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <SearchBar
        list={friends}
        setFilteredList={setFilteredFriends as React.Dispatch<React.SetStateAction<any[] | undefined>>}
        filterBy="username"
        placeholder="Search For Friend By Username..."
      />
      <FlatList
        data={filteredFriends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default FriendsListScreen;