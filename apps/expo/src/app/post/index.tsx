import { View, Text, FlatList } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TimeAgo from "~/components/timeAgo/TimeAgo";

export interface PostProps {
  post: any;
  user: any;
}

const formatDate = (date: Date) => date ? `${date.toLocaleTimeString()}\n${date?.toLocaleDateString()}` : '';

const Post: React.FC<PostProps> = ({ post, user }) => {

  return (
    <View className="mx-3 p-3 text-bb-slate-100" style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }} testID="post-container">
      <View className="flex-row justify-between items-start">
        <Text className="text-2xl mb-1 font-bold text-slate-200">{user.name}</Text>
        <TimeAgo createdAt={post.createdAt}></TimeAgo>
      </View>
      <Text className="mt-4 text-slate-200" testID="test-content">{post.content}</Text>
    </View>
  )
}

export default Post;