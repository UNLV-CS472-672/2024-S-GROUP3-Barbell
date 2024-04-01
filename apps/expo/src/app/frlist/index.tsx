import React, { useEffect, useState } from 'react';
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
  const { data: friendsData, isLoading } = api.friend.getFriends.useQuery();

  useEffect(() => {
    if (friendsData) {
      setFriends(friendsData);
    }
  }, [friendsData]);

  // Remove the fetchFriends function since you're using tRPC

  const handleRemoveFriend = async (userId: string) => {
    // ... (same as before)
  };

  const renderFriendItem = ({ item }: { item: Friend }) => {
    // ... (same as before)
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={item => item.id}
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