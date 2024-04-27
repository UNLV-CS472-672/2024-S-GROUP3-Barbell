import { Text, View } from 'react-native'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import Label from '~/components/ui/label/Label'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

export default function PostDashboard() {
  const { userData } = useGlobalContext()
  /* istanbul ignore next */
  if (!userData) {
    return null
  }
  const { data, isFetching, isFetched } = api.post.getRecentPostsByUserIdAndPostCount.useQuery({
    id: userData.id,
    postCount: 3,
  })

  const loadingPosts = (
    <View className='h-20'>
      <RotatingBarbellIcon color={'black'} />
    </View>
  )

  const posts = data?.map((post) => (
    <View key={post.id} className='py-2'>
      <Text className='text-[16px] font-bold text-black'>{post.author?.username.trim()}</Text>
      <Text numberOfLines={1}>{post.content}</Text>
    </View>
  ))

  const noPosts = (
    <View className='mb-10'>
      <Text testID='no-posts-test' className='color-black text-center'>
        No posts to display.
      </Text>
    </View>
  )

  return (
    <View className='mx-3 rounded-2xl bg-white p-2'>
      <Label text='Posts' textColor='white' backgroundColor='#A7A7A7' />
      {isFetching && loadingPosts}
      {isFetched && (posts?.length == 0 ? noPosts : posts)}
    </View>
  )
}
