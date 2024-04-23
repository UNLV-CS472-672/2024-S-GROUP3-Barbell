import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import TimeAgo from '~/components/timeAgo/TimeAgo'
import Button from '~/components/ui/button/button'
import { api } from '~/utils/trpc/api'

interface PostProps {
  post: any
  username: string
}

const Post = ({ post, username }: PostProps) => {
  if (post?.createdAt != undefined) {
    // check if post has been created // if this line doesnt exist it renders empty post
    return (
      <View
        className='text-bb-slate-100 mx-3 p-3'
        style={{ borderBottomWidth: 1, borderBottomColor: '#424242' }}
        testID='post-container'
      >
        <View className='flex-row items-start justify-between'>
          <Text className='mb-1 text-2xl font-bold text-slate-200'>{username}</Text>
          <TimeAgo createdAt={post.createdAt}></TimeAgo>
        </View>
        <Text className='mt-4 text-slate-200' testID='test-content'>
          {post.content}
        </Text>
      </View>
    )
  }
}

interface ProfilePostsProps {
  id: number
  username: string
}

export default function ProfilePosts({ id, username }: ProfilePostsProps) {
  const postAmount = 5
  const [postIndex, setPostIndex] = useState<number>(1)
  const { data, isFetching } = api.post.getUsersPostsByIdAndPostCount.useQuery({
    id: id,
    posts: postIndex * postAmount,
  })

  const [posts, setPosts] = useState<any>()

  useEffect(() => {
    if (data != undefined) {
      if (posts == undefined) {
        setPosts(data)
      } else {
        setPosts(Array(posts).concat(data))
      }
    }
  }, [data])

  return (
    <View className='flex-1'>
      {isFetching && <RotatingBarbellIcon />}
      {posts && posts.map((post: any) => <Post key={post.id} post={post} username={username} />)}
      <Button onPress={() => setPostIndex(postIndex + 1)}>
        <Text>More</Text>
      </Button>
    </View>
  )
}
