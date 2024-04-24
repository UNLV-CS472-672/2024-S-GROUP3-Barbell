'use client'

import type { TRPCLink } from '@trpc/client'
import { useMemo, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createWSClient, loggerLink, unstable_httpBatchStreamLink, wsLink, splitLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import SuperJSON from 'superjson'

import type { AppRouter } from '@acme/api'

/**
 * A set of typesafe hooks for consuming your API.
 */
export const api = createTRPCReact<AppRouter>()
export { type RouterInputs, type RouterOutputs } from '@acme/api'

/**
 * nextjs able to deployed through Vercel, so our getBaseUrl will be slightly
 * different from the expo version
 * @returns
 */
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''                            // relative path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`  // deployed on vercel baby
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const getWsUrl = () => {
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location
    const [hostname] = host.split(':')

    if (protocol === 'https:') {
      return `wss://starfish-app-z8v32.ondigitalocean.app/`
    }

    return `ws://${hostname}:3001`
  }

  return ''
  // return null // When running in SSR, we aren't using subscriptions
}

function getEndingLink(): TRPCLink<AppRouter> {
  if (typeof window === 'undefined') {
    return unstable_httpBatchStreamLink({
      /**
       * @link https://trpc.io/docs/v11/data-transformers
       */
      transformer: SuperJSON,
      url: `${getBaseUrl()}/api/trpc`,
      async headers() {
        const headers = new Headers()
        headers.set('x-trpc-source', 'nextjs-react')
        return headers
      },
    })
  }

  console.log('wsLink, hopefully')

  // FIXED: wsLink url
  const client = createWSClient({
    url: getWsUrl(),
  })

  console.log('AND THE LINK IS: ', getWsUrl())

  return wsLink({
    client,
    /**
     * @link https://trpc.io/docs/v11/data-transformers
     */
    transformer: SuperJSON,
  })
}

const wsUrl = getWsUrl()

const wsClient = createWSClient({
  url: wsUrl ?? '',
  onOpen: () => {
    console.log('ws open')
  },
  onClose: (cause) => {
    console.log('ws close', cause)
  },
})

export function TRPCReactProvider(props: { children: React.ReactNode; headers?: Headers }) {
  /*  */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
            gcTime: 24 * 60 * 60 * 1000,
          },
        },
      }),
  )

  const httpLink = unstable_httpBatchStreamLink({
    /**
     * @link https://trpc.io/docs/v11/data-transformers
     */
    transformer: SuperJSON,
    url: `${getBaseUrl()}/api/trpc`,
    async headers() {
      const headers = new Headers()
      headers.set('x-trpc-source', 'nextjs-react')
      return headers
    },
  })

  // const wsLinkClient = useMemo(() => {
  //   const client = createWSClient({
  //     url: getWsUrl(),
  //     onOpen: () => {
  //       console.log('ws open')
  //     },
  //     onClose: (cause) => {
  //       console.log('ws close', cause)
  //     },
  //   })

  //   return wsLink({
  //     client,
  //     /**
  //      * @link https://trpc.io/docs/v11/data-transformers
  //      */
  //     transformer: SuperJSON,
  //   })
  // }, [])

  /*  */
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        /* verison 1 */
        // https://trpc.io/docs/client/links/httpBatchStreamLink
        // unstable_httpBatchStreamLink({
        //   transformer: SuperJSON,
        //   url: getBaseUrl() + '/api/trpc',
        //   async headers() {
        //     const headers = new Headers()
        //     headers.set('x-trpc-source', 'nextjs-react')
        //     return headers
        //   },
        // }),

        /* version 2 */
        // getEndingLink(),

        /* version 3 */
        wsClient
          ? splitLink({
              condition: ({ type }) => type === 'subscription',
              true: wsLink({ client: wsClient, transformer: SuperJSON }),
              false: httpLink,
            })
          : httpLink,

        /* version 4 */
        // wsLinkClient,
      ],

      /* version 5 */
      // links:
      //   wsUrl !== null
      //     ? [

      //     ]
      //     : [
      //         loggerLink({
      //           enabled: (op) =>
      //             process.env.NODE_ENV === 'development' ||
      //             (op.direction === 'down' && op.result instanceof Error),
      //         }),
      //         wsLinkClient,
      //       ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
