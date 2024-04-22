import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { api } from '~/utils/trpc/api'

function AddMessageForm({ onMessagePost }: { onMessagePost: () => void }) {
  const addPost = api.post2.add.useMutation()
  const [message, setMessage] = useState('')
  const [enterToPostMessage, setEnterToPostMessage] = useState(true)

  async function postMessage() {
    const input = {
      text: message,
    }
    try {
      await addPost.mutateAsync(input)
      setMessage('')
      onMessagePost()
    } catch {}
  }

  const isTyping = api.post2.isTyping.useMutation()

  return (
    <>
      <TouchableOpacity
        onPress={postMessage}
        style={{
          backgroundColor: '#16a085',
          borderRadius: 5,
          padding: 10,
          justifyContent: 'center',
        }}
      >
        <Text className='text-center text-white'>Submit</Text>
      </TouchableOpacity>
      <View className='mb-10 rounded-lg bg-gray-800 p-5'>
        <TextInput
          multiline
          value={message}
          onChangeText={setMessage}
          placeholder='Type your message...'
          className='min-h-[40px] bg-transparent text-white'
          autoFocus
          onSubmitEditing={postMessage}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Enter' && enterToPostMessage) {
              void postMessage()
            }
            isTyping.mutate({ typing: true })
          }}
          onBlur={() => {
            Keyboard.dismiss()
            isTyping.mutate({ typing: false })
          }}
        />

        {addPost.error && <Text style={{ color: 'red' }}>{addPost.error.message}</Text>}
      </View>
    </>
  )
}

export default function IndexPage() {
  const postsQuery = api.post2.infinite.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
    },
  )
  const utils = api.useUtils()
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = postsQuery

  // list of messages that are rendered
  const [messages, setMessages] = useState(() => {
    const msgs = postsQuery.data?.pages.map((page) => page.items).flat()
    return msgs
  })
  type Post = NonNullable<typeof messages>[number]
  // const { data: session } = useSession();
  // const userName = session?.user?.name;
  const scrollTargetRef = useRef<HTMLDivElement>(null)

  // fn to add and dedupe new messages onto state
  const addMessages = useCallback((incoming?: Post[]) => {
    setMessages((current) => {
      const map: Record<Post['id'], Post> = {}
      for (const msg of current ?? []) {
        map[msg.id] = msg
      }
      for (const msg of incoming ?? []) {
        map[msg.id] = msg
      }
      return Object.values(map).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    })
  }, [])

  // when new data from `useInfiniteQuery`, merge with current state
  useEffect(() => {
    const msgs = postsQuery.data?.pages.map((page) => page.items).flat()
    addMessages(msgs)
  }, [postsQuery.data?.pages, addMessages])

  const scrollToBottomOfList = useCallback(() => {
    if (scrollTargetRef.current == null) {
      return
    }

    scrollTargetRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [scrollTargetRef])
  useEffect(() => {
    scrollToBottomOfList()
  }, [])

  // subscribe to new posts and add
  api.post2.onAdd.useSubscription(undefined, {
    onData(post) {
      addMessages([post])
    },
    onError(err) {
      console.error('Subscription error:', err)
      // we might have missed a message - invalidate cache
      utils.post2.infinite.invalidate()
    },
  })

  const [currentlyTyping, setCurrentlyTyping] = useState<string[]>([])

  // subscribe to who is typing
  // FIX: this never got invoke
  api.post2.whoIsTyping.useSubscription(undefined, {
    onData(data) {
      setCurrentlyTyping(data)
    },
  })


  return (
    <View className='bg-dark-purple flex h-[90%] flex-1 flex-col md:flex-row'>
      {/*  */}
      <TouchableOpacity
        onPress={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className='rounded bg-indigo-500 px-4 py-2 text-white disabled:opacity-40'
      >
        <Text className=''>
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </Text>
      </TouchableOpacity>

      {/*  */}
      <ScrollView
        // ref={scrollTargetRef}
        className='flex-1 overflow-y-auto'
        contentContainerStyle={styles.messageContentContainer}
      >
        {messages?.map((item) => (
          <View key={item.id} style={styles.message}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.dateText}>
              {new Date(item.createdAt).toLocaleDateString('en-GB')}
            </Text>
          </View>
        ))}
      </ScrollView>

      <AddMessageForm
        onMessagePost={() => scrollTargetRef.current?.scrollTo({ behavior: 'smooth', top: 0 })}
      />

      <Text className='mb-5'>
        {currentlyTyping.length > 0
          ? `${currentlyTyping.join(', ')} is typing...`
          : 'No one is typing'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
    paddingBottom: 25,
  },
  messageContainer: {
    flex: 1,
  },
  messageContentContainer: {
    padding: 10,
  },
  message: {
    backgroundColor: '#95a5a6',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  messageText: {
    fontSize: 18,
    color: '#2c3e50',
  },
  dateText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#2c3e50',
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    color: 'white',
    borderWidth: 1,
    borderColor: '#555',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  submitButton: {
    justifyContent: 'center',
    backgroundColor: '#16a085',
    borderRadius: 5,
    padding: 10,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
})
