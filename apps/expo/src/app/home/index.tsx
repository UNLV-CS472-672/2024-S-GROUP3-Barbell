import Head from 'next/head'

import { HomeScreen } from '~/components/ui/screem'

export default function Page() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HomeScreen />
    </>
  )
}
