import { Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'
import Post from './post'
import { POSTS_FEED_ITEM_LIMIT } from '~/utils/constants'
import NavBar from '~/components/ui/nav-bar/NavBar'


const PostFeed = () => {
  let posts: any[] = [];
  const { userData } = useGlobalContext();
  const { data: friendsPosts, isLoading: friendsPostsLoading } = api.post.getRecentPostsByUserIdAndPostCount.useQuery({
    id: userData?.id ?? 0,
    postCount: POSTS_FEED_ITEM_LIMIT
  });

  if (!friendsPostsLoading) {
    posts = friendsPosts?.map(post => {
      return <Post user={post.author} post={post}></Post>;
    }) ?? [];
  }
  return (
    <SafeAreaView
      className='bg-bb-slate-100 flex-1'
      style={{ backgroundColor: '#1e1e1e', flex: 1 }}
    >
      <NavBar center="Recent Posts"/>
      <FlatList data={posts} renderItem={({ item }) => item} />
    </SafeAreaView>
  )
};

export default PostFeed;