import type { TRPCLink } from '@trpc/client'
import React from 'react'
import Constants from 'expo-constants'

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createWSClient,
  httpBatchLink,
  loggerLink,
  splitLink,
  TRPCClientError,
  // unstable_httpBatchStreamLink,
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
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 *
 * Deployed tactic, (tbd) cause I'm unsure if vercel can handle this
 */
export const getBaseUrl = (ws = false) => {
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

  // TODO: configure ws url, on deployed environment

  if (!localhost) {
    // return "https://turbo.t3.gg";
    return 'https://2024-s-group-3-barbell-nextjs.vercel.app/'
  }

  if (ws) return `ws://${localhost}:3001/ws`
  return `http://${localhost}:3000`
}

/**
 * @returns terminating ws link for the trpc client
 * @see https://trpc.io/docs/client/links/splitLink (the illustration demonstrates how it is)
 */
function wsLinkClient(): TRPCLink<AppRouter> {
  console.log('wsLink, hopefully')

  const client = createWSClient({
    url: getBaseUrl(true),
    onOpen: () => {
      console.log('ws open')
    },
    onClose: (cause) => {
      console.log('ws close', cause)
    },
  })

  return wsLink({
    client,
    /**
     * @link https://trpc.io/docs/v11/data-transformers
     */
    transformer: SuperJSON,
  })
}

/**
 * @returns terminating link for the trpc client
 * It batches an array of individual tRPC operations into a single HTTP
 * request that's sent to a single tRPC procedure.
 * @see https://trpc.io/docs/client/links/splitLink (the illustration demonstrates how it is)
 */
function httpLinkClient(): TRPCLink<AppRouter> {
  return httpBatchLink({
    transformer: SuperJSON,
    // url: getApiUrl(),
    url: `${getBaseUrl()}/api/trpc`,
    headers() {
      const headers = new Map<string, string>()
      headers.set('x-trpc-source', 'expo-react')
      return Object.fromEntries(headers)
    },
  })
}

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */
export function TRPCProvider(props: { children: React.ReactNode }) {
  /*  */
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

  // const httpLink = httpBatchLink({
  //   transformer: SuperJSON,
  //   // url: getApiUrl(),
  //   url: `${getBaseUrl()}/api/trpc`,
  //   headers() {
  //     const headers = new Map<string, string>()
  //     headers.set('x-trpc-source', 'expo-react')
  //     return Object.fromEntries(headers)
  //   },
  // })

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

        /* version 1 */
        // httpBatchLink({
        //   transformer: SuperJSON,
        //   url: `${getBaseUrl()}/api/trpc`,
        //   headers() {
        //     const headers = new Map<string, string>()
        //     headers.set('x-trpc-source', 'expo-react')
        //     return Object.fromEntries(headers)
        //   },
        // }),

        /* version 2 */
        splitLink({
          condition: ({ type }) => type === 'subscription',
          true: wsLinkClient(),
          false: httpLinkClient(),
        }),
      ],
    }),
  )

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </api.Provider>
  )
}
