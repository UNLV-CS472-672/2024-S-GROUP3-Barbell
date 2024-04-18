'use client'

import { useState } from 'react'

// import { env } from '@/env.mjs'
import { api } from '@/utils/api'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import SuperJSON from 'superjson'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin          // on god
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`    // deployed on vercel baby
  return `http://localhost:${process.env.PORT ?? 3000}`
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
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + '/api/trpc',
          async headers() {
            const headers = new Headers()
            headers.set('x-trpc-source', 'nextjs-react')
            return headers
          },
        }),

        /* another one here */

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
