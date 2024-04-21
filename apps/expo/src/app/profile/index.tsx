import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import NavBar from '~/components/ui/nav-bar/NavBar'
import { api } from '~/utils/trpc/api'

interface ProfileViewProps {
  userId: number
}

export default function ProfileView({ userId }: ProfileViewProps) {
  // const { data } = api.user.byId.useQuery({ id: userId })

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <NavBar center={'1'} />
    </SafeAreaView>
  )
}
