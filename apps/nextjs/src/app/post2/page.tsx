'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'

import { api } from '@/utils/trpc/api'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function AddMessageForm({ onMessagePost }: { onMessagePost: () => void }) {
  const addPost = api.post2.add.useMutation()
  // const { data: session } = useSession();
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
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          /**
           * In a real app you probably don't want to use this manually
           * Checkout React Hook Form - it works great with tRPC
           * @link https://react-hook-form.com/
           */
          await postMessage()
        }}
      >
        <fieldset disabled={addPost.isPending} className='min-w-0'>
          <div className='flex w-full items-end rounded bg-gray-500 px-3 py-2 text-lg text-gray-200'>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='flex-1 bg-transparent outline-0'
              rows={message.split(/\r|\n/).length}
              id='text'
              name='text'
              autoFocus
              onKeyDown={async (e) => {
                if (e.key === 'Shift') {
                  setEnterToPostMessage(false)
                }
                if (e.key === 'Enter' && enterToPostMessage) {
                  void postMessage()
                }
                isTyping.mutate({ typing: true })
              }}
              onKeyUp={(e) => {
                if (e.key === 'Shift') {
                  setEnterToPostMessage(true)
                }
              }}
              onBlur={() => {
                setEnterToPostMessage(true)
                isTyping.mutate({ typing: false })
              }}
            />
            <div>
              <button type='submit' className='rounded bg-indigo-500 px-4 py-1'>
                Submit
              </button>
            </div>
          </div>
        </fieldset>
        {addPost.error && <p style={{ color: 'red' }}>{addPost.error.message}</p>}
      </form>
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

  api.post2.whoIsTyping.useSubscription(undefined, {
    onData(data) {
      setCurrentlyTyping(data)
    },
  })

  return (
    <>
      <div className='flex h-screen flex-col md:flex-row'>
        <div className='flex-1 overflow-y-hidden md:h-screen'>
          <section className='flex h-full flex-col justify-end space-y-4 bg-gray-700 p-4 px-20'>
            <div className='space-y-4 overflow-y-auto'>
              <button
                data-testid='loadMore'
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                className='rounded bg-indigo-500 px-4 py-2 text-white disabled:opacity-40'
              >
                {isFetchingNextPage
                  ? 'Loading more...'
                  : hasNextPage
                    ? 'Load More'
                    : 'Nothing more to load'}
              </button>
              <div className='space-y-4'>
                {messages?.map((item) => (
                  <article key={item.id} className=' text-gray-50'>
                    <header className='flex space-x-2 text-sm'>
                      <h3 className='text-base'>
                        {item.source === 'RAW' ? (
                          item.name
                        ) : (
                          <a
                            href={`https://github.com/${item.name}`}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {item.name}
                          </a>
                        )}
                      </h3>
                      <span className='text-gray-500'>
                        {new Intl.DateTimeFormat('en-GB', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        }).format(item.createdAt)}
                      </span>
                    </header>
                    <p className='whitespace-pre-line text-xl leading-tight'>{item.text}</p>
                  </article>
                ))}
                <div ref={scrollTargetRef}></div>
              </div>
            </div>
            <div className='w-full'>
              <AddMessageForm onMessagePost={() => scrollToBottomOfList()} />
              <p className='h-2 italic text-gray-400'>
                {currentlyTyping.length ? `${currentlyTyping.join(', ')} typing...` : ''}
              </p>
            </div>

            {process.env.NODE_ENV !== 'production' && (
              <div className='hidden md:block'>
                <ReactQueryDevtools initialIsOpen={false} />
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/v11/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
