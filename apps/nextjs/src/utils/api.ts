import { createTRPCReact } from '@trpc/react-query'

import type { AppRouter } from '@acme/api'
import getConfig from 'next/config';

export const api = createTRPCReact<AppRouter>()

export { type RouterInputs, type RouterOutputs } from '@acme/api'
