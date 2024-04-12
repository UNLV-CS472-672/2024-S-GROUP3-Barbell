import React, { useEffect,useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'
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

  // handle removing a friend from the friends list
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

  // render each friend item in the list and provide options to message, view profile, and remove friend
  const renderFriendItem = ({ item }: { item: Friend }) => {
    return (
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <View className="flex-row items-center">
        <MaterialCommunityIcons name="face-man-profile" size={56} color="#CACACA" />
          <Text className="text-lg font-semibold">{item.username}</Text>
        </View>
        <View className="flex-row">
          <TouchableOpacity onPress={() => navigation.navigate('Messages', { friend: item })}>
            <Text className='font-IstokWeb px-4 pb-1 text-[#FFFFFF]'>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId: item.id })}>
            <Text className='font-IstokWeb px-4 pb-1 text-[#FFFFFF]'>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveFriend(item.id)}>
            <Text className='font-IstokWeb px-4 pb-1 text-[#FFFFFF]'>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // main render of friends list screen
  return (
    <View className="flex-1 bg-[#1C1B1B]">
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="p-4 border-b border-[#CACACA]">
            <Text className="text-2xl font-bold text-[#CACACA]">Friends List</Text>
          </View>
        }
      />
    </View>
  );
};

export default FriendsListScreen;