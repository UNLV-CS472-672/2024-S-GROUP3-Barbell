import type { TRPCLink } from '@trpc/client'
import React from 'react'
import Constants from 'expo-constants'

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createWSClient,
  httpBatchLink,
  loggerLink,
  // httpBatchLink,
  TRPCClientError,
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

// function getEndingLink(): TRPCLink<AppRouter> {
//   if (typeof window === 'undefined') {
//     return unstable_httpBatchStreamLink({
//       /**
//        * @link https://trpc.io/docs/v11/data-transformers
//        */
//       transformer: SuperJSON,
//       url: `${getBaseUrl()}/api/trpc`,
//       async headers() {
//         const headers = new Headers()
//         headers.set('x-trpc-source', 'nextjs-react')
//         return headers
//       },
//     })
//   }
//   console.log('wsLink, hopefully')

//   const client = createWSClient({
//     url: `ws://localhost:3001`,
//   })
//   return wsLink({
//     client,
//     /**
//      * @link https://trpc.io/docs/v11/data-transformers
//      */
//     transformer: SuperJSON,
//   })
// }


























/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
export const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   *
   * **NOTE**: This is only for development. In production, you'll want to set the
   * baseUrl to your production API URL.
   */
  const debuggerHost = Constants.expoConfig?.hostUri
  const localhost = debuggerHost?.split(':')[0]

  if (!localhost) {
    // return "https://turbo.t3.gg";
    return 'https://2024-s-group-3-barbell-nextjs.vercel.app/'
  }

  // console.log('localhost', localhost)
  return `http://${localhost}:3000`
}

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */
export function TRPCProvider(props: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Since queries are prefetched on the server, we set a stale time so that
            // queries aren't immediately refetched on the client
            staleTime: 60 * 1000,
            gcTime: 1000 * 60 * 60 * 24,
          },
        },
        queryCache: new QueryCache({
          onError: (err) => {
            if (err instanceof TRPCClientError) {
              console.log('TRPCClientError', err)
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (err) => {
            if (err instanceof TRPCClientError) {
              console.log('TRPCClientError', err)
            }
          },
        }),
      }),
  )

  /* tbd */
  const [trpcClient] = React.useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
          colorMode: 'ansi',
        }),
        httpBatchLink({
          transformer: SuperJSON,
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const headers = new Map<string, string>()
            headers.set('x-trpc-source', 'expo-react')
            return Object.fromEntries(headers)
          },
        }),

        /*  */
      ],
    }),
  )

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </api.Provider>
  )
}
