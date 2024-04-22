'use client'

import type { TRPCLink } from '@trpc/client'
import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  createWSClient,
  // httpBatchLink,
  loggerLink,
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

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin // on god
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // deployed on vercel baby
  return `http://localhost:${process.env.PORT ?? 3000}`
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

  /*  */
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
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

        /* another one here */
        getEndingLink(),
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
