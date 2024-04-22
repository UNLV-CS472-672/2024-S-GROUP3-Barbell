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
      <View style={{ padding: 20, backgroundColor: '#444', borderRadius: 5 }}>
        <TextInput
          multiline
          value={message}
          onChangeText={setMessage}
          placeholder='Type your message...'
          style={{
            flex: 1,
            minHeight: 40,
            color: 'white',
            borderBottomWidth: 0,
          }}
          autoFocus
          // onSubmitEditing={enterToPostMessage ? postMessage : null}
          onSubmitEditing={postMessage}
          onBlur={() => {
            setEnterToPostMessage(true)
            isTyping.mutate({ typing: false })
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Enter' && !enterToPostMessage) {
              Keyboard.dismiss() // prevent double submission on 'Enter'
            }
          }}
        />
        <TouchableOpacity
          onPress={postMessage}
          style={{
            marginTop: 10,
            borderRadius: 5,
            padding: 10,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
        </TouchableOpacity>
        {addPost.error && <Text style={{ color: 'red' }}>{addPost.error.message}</Text>}
      </View>
    </>
  )
}

type Post = {
  id: string
  name: string
  source: string
  text: string
  createdAt: Date
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

  api.post2.whoIsTyping.useSubscription(undefined, {
    onData(data) {
      setCurrentlyTyping(data)
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.messageContainer}>
          {messages?.map((item) => (
            <View key={item.id} style={styles.message}>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.dateText}>
                {new Date(item.createdAt).toLocaleDateString('en-GB')}
              </Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          style={[styles.loadMoreButton, isFetchingNextPage && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#2c3e50',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
  },
  introText: {
    fontSize: 16,
    color: '#bdc3c7',
    marginBottom: 10,
  },
  linkText: {
    color: '#3498db',
    textDecorationLine: 'underline',
  },
  titleText: {
    fontSize: 20,
    color: '#ecf0f1',
    padding: 20,
  },
  listText: {
    fontSize: 16,
    color: '#ecf0f1',
    paddingLeft: 40,
  },
  content: {
    flex: 1,
    backgroundColor: '#34495e',
  },
  messageContainer: {
    flex: 1,
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
  loadMoreButton: {
    padding: 10,
    backgroundColor: '#16a085',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
})
