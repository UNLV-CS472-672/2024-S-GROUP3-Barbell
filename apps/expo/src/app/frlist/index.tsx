import React, { useEffect,useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { api } from '~/utils/api';

/*
 * Main FriendsListScreen frontend component
 * 
 * TODO: Create pop-up modal for removing friend
 * TODO: Add search bar for searching friends 
 */
interface Friend {
  id: string;
  username: string;
  avatar: string;
}

type RootStackParamList = {
  FriendsList: undefined;
  Messages: { friend: Friend };
  Profile: { userId: string };
  // Add other route definitions here as needed
};

type FriendsListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FriendsList'>;

const FriendsListScreen = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const navigation = useNavigation<FriendsListScreenNavigationProp>();

  // Use the tRPC query to fetch friends
  const { data: friendsData } = api.friend.getFriends.useQuery();

  useEffect(() => {
    if (friendsData) {
      setFriends(friendsData);
    }
  }, [friendsData]);

  // Remove the fetchFriends function since you're using tRPC

  const handleRemoveFriend = async (userId: string) => {
    try {
      const response = await fetch(`/api/friends/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error removing friend');
      }
      setFriends(friends.filter(friend => friend.id !== userId));
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  const renderFriendItem = ({ item }: { item: Friend }) => {
    return (
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full mr-4" />
          <Text className="text-lg font-semibold">{item.username}</Text>
        </View>
        <View className="flex-row">
          <TouchableOpacity onPress={() => navigation.navigate('Messages', { friend: item })}>
            <Text className="text-blue-500 font-semibold mr-4">Message</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId: item.id })}>
            <Text className="text-blue-500 font-semibold mr-4">Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveFriend(item.id)}>
            <Text className="text-red-500 font-semibold">Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="p-4 border-b border-gray-200">
            <Text className="text-2xl font-bold">Friends List</Text>
          </View>
        }
      />
    </View>
  );
};

export default FriendsListScreen;