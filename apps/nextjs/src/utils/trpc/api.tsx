'use client'

import type { TRPCLink } from '@trpc/client'
import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  createWSClient,
  loggerLink,
  // httpBatchLink,
  splitLink,
  unstable_httpBatchStreamLink,
  wsLink,
} from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import SuperJSON from 'superjson'

import type { AppRouter } from '@acme/api'

/**
 * A set of typesafe hooks for consuming your API.
 */
export const api = createTRPCReact<AppRouter>()
export { type RouterInputs, type RouterOutputs } from '@acme/api'

/**
 *
 * @returns
 */
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // deployed on vercel baby
  return `http://localhost:${process.env.PORT ?? 3000}`
}

/**
 *
 * @returns
 */
export const getWsUrl = () => {
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location
    const [hostname] = host.split(':')

    // how tf would we develop that shit on the net
    if (protocol === 'https:') {
      // TODO: deployed, where is that shit be
      return ``
    }

    // LOCAL HOST
    console.log('hostname', hostname)
    return `ws://${hostname}:3001/ws`
  }

  return null // When running in SSR, we aren't using subscriptions <-- yea, no clue
}

const wsUrl = getWsUrl()

const wsClient =
  wsUrl !== null
    ? createWSClient({
        url: wsUrl,
      })
    : null

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

  const client = createWSClient({
    url: `ws://localhost:3001`,
  })

  return wsLink({
    client,
    /**
     * @link https://trpc.io/docs/v11/data-transformers
     */
    transformer: SuperJSON,
  })
}

export function TRPCReactProvider(props: { children: React.ReactNode; headers?: Headers }) {
  /*  */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
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
      ],
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
