import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import * as trpcNext from '@trpc/server/adapters/next'

import { appRouter, createTRPCContext } from '@acme/api'

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */

const setCorsHeaders = (res: Response) => {
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Request-Method', '*')
  res.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
  res.headers.set('Access-Control-Allow-Headers', '*')
}

export const OPTIONS = (): Response => {
  const response = new Response(null, { status: 204 })
  setCorsHeaders(response)
  return response
}

const handler = async (req: Request) => {
  const response = await fetchRequestHandler({
    req,
    router: appRouter,
    endpoint: '/api/trpc',
    // FIXME: typeof createTRPCContext is not compatible with fetchRequestHandler
    createContext: createTRPCContext,
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error)
    },
  })
  setCorsHeaders(response)
  return response
}
export { handler as GET, handler as POST }

// export default trpcNext.createNextApiHandler({
//   router: appRouter,
//   /**
//    * @link https://trpc.io/docs/v11/context
//    */
//   createContext: createTRPCContext,
//   /**
//    * @link https://trpc.io/docs/v11/error-handling
//    */
//   onError({ error }) {
//     if (error.code === 'INTERNAL_SERVER_ERROR') {
//       // send to bug reporting
//       console.error('Something went wrong', error)
//     }
//   },
//   /**
//    * @link https://trpc.io/docs/v11/caching#api-response-caching
//    */
//   // responseMeta() {
//   //   // ...
//   // },
// })

