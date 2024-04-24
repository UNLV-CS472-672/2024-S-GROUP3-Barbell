import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'

import { headers } from 'next/headers'

import { TRPCReactProvider } from '@/utils/trpc/api'
import { ClerkProvider } from '@clerk/nextjs'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Barbell',
  description: 'Simple monorepo with shared backend for web & mobile apps',
  // openGraph: {
  //   title: 'Barbell',
  //   description: 'Simple monorepo with shared backend for web & mobile apps',
  //   url: 'https://create-t3-turbo.vercel.app',
  //   siteName: 'Barbell',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@barbell',
  //   creator: '@barbell',
  // },
}

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning={true}>
        <body
          className={['font-sans', fontSans.variable].join(' ')}
          suppressHydrationWarning={true}
        >
          <TRPCReactProvider headers={headers()}>{props.children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
