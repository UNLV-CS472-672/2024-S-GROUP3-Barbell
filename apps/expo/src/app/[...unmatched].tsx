// import { Text } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'

// export default function Page() {
//   return (
//     <>
//       {/* <Redirect href={'/'} /> */}
//       {alert('This page does not exist')}
//       <SafeAreaView>
//         <Text style={{ textAlign: 'center', padding: 30 }}>This page does not exist</Text>
//       </SafeAreaView>
//     </>
//   )
// }

import React, { useEffect, useState } from 'react'
import branch from 'react-native-branch'
import { Unmatched, useFocusEffect, useRouter } from 'expo-router'

export default function CustomUnmatched() {
  const [branchLoading, setBranchLoading] = useState(true)
  const [goNext, setGoNext] = useState('')
  const router = useRouter()

  useFocusEffect(() => {
    branch.subscribe({
      onOpenStart: ({ uri, cachedInitialEvent }) => {
        if (uri == null) {
          setBranchLoading(false)
          return
        }
      },
      onOpenComplete: ({ error, params, uri }) => {
        if (error) {
          console.error(
            'subscribe onOpenComplete, Error from opening uri: ' + uri + ' error: ' + error,
          )
          return
        }
        if (!params?.['+clicked_branch_link']) {
          setBranchLoading(false)
          return
        } else {
          let canonicalIdentifier = params.$canonical_identifier as string
          if (canonicalIdentifier) {
            setGoNext(canonicalIdentifier)
          }
          // Route based on Branch link data
          setBranchLoading(false)
          return
        }
      },
    })

    return () => {
      // branch.unsubscribe();
    }
  })
  useEffect(() => {
    if (goNext !== undefined) {
      router.push(goNext as any)
    }
  }, [goNext])

  return branchLoading ? null : <Unmatched />
}
