import React from 'react'
import { Button, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router, Stack } from 'expo-router'
import { SignedIn } from '@clerk/clerk-expo'
import { FlashList } from '@shopify/flash-list'

import type { RouterOutputs } from '~/utils/api'
import { SignOut } from '~/components/auth/sign-out'
import { api } from '~/utils/api'

function PostCard(props: {
  post: RouterOutputs['post']['all'][number]
  onDelete: () => void
}) {
  return (
    <View className="flex flex-row rounded-lg bg-white/10 p-4">
      <View className="flex-grow">
        <Link
          asChild
          href={{
            pathname: '/post/[id]',
            params: { id: props.post.id },
          }}
        >
          <Pressable>
            <Text className="text-xl font-semibold text-pink-400">
              {props.post.title}
            </Text>
            <Text className="mt-2 text-black">{props.post.content}</Text>
          </Pressable>
        </Link>
      </View>
      <Pressable onPress={props.onDelete}>
        <Text className="font-bold uppercase text-pink-400">Delete</Text>
      </Pressable>
    </View>
  )
}

function CreatePost() {
  const utils = api.useUtils()

  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle('')
      setContent('')
      await utils.post.all.invalidate()
    },
  })

  return (
    <View className="mt-4">
      <TextInput
        className="mb-2 rounded bg-white/10 p-2 text-black  "
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.title}
        </Text>
      )}
      <TextInput
        className="mb-2 rounded bg-white/10 p-2 text-black"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={content}
        onChangeText={setContent}
        placeholder="Content"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <Pressable
        className="rounded bg-pink-400 p-2"
        onPress={() => {
          mutate({
            title,
            content,
          })
        }}
      >
        <Text className="font-semibold text-black">Publish post</Text>
      </Pressable>
      {error?.data?.code === 'UNAUTHORIZED' && (
        <Text className="mt-2 text-red-500">
          You need to be logged in to create a post
        </Text>
      )}
    </View>
  )
}

const StartPage = () => {
  const utils = api.useUtils()

  const postQuery = api.post.all.useQuery()

  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => utils.post.all.invalidate(),
  })

  return (
    <SafeAreaView>
      {/* Changes page title visble on the header */}
      <Stack.Screen options={{ title: 'Home Page' }} />
      <View className="h-full w-full p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-black">
          Create <Text className="text-black">T3</Text> Turbo
        </Text>

        <Button
          onPress={() => {
            router.push('/nav')
          }}
          title="screens"
          color={'#4444FF'}
        />
        <Button
          onPress={() => void utils.post.all.invalidate()}
          title="Refresh posts"
          color={'#000000'}
        />
        <View className="py-2">
          <Text className="font-semibold italic text-black">
            Press on a post
          </Text>
        </View>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p: any) => (
            <PostCard
              post={p.item}
              onDelete={() => deletePostMutation.mutate(p.item.id)}
            />
          )}
        />

        <CreatePost />
        <SignedIn>
          <Text>You are Signed in</Text>
          <SignOut />
        </SignedIn>
      </View>
    </SafeAreaView>
  )
}

export default StartPage
