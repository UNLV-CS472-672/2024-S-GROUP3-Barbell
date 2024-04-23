import { Text, View } from 'react-native'

import TimeAgo from '~/components/timeAgo/TimeAgo'

export interface PostProps {
  post: any
  user: any
}

const Post: React.FC<PostProps> = ({ post, user }) => {
  return (
    <View
      className='text-bb-slate-100 mx-3 p-3'
      style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }}
      testID='post-container'
    >
      <View className='flex-row items-start justify-between'>
        <Text className='mb-1 text-2xl font-bold text-slate-200'>{user.name}</Text>
        <TimeAgo createdAt={post.createdAt}></TimeAgo>
      </View>
      <Text className='mt-4 text-slate-200' testID='test-content'>
        {post.content}
      </Text>
    </View>
  )
}

export default Post
