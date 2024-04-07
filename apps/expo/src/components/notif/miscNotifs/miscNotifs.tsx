import { Text, View } from 'react-native'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/api'
import FriendRequestNotif from './FriendRequestNotif'
import NudgeNotif from './NudgeNotif'

const handleNotif = (notif: any, id: number, receiverId: number) => {
  if (notif.type == 'FRIEND_REQUEST') {
    return (
      <FriendRequestNotif
        notif={notif}
        key={id}
        senderUsername={notif.sender?.username.trim()}
        receiverId={receiverId}
      />
    )
  } else if (notif.type == 'NUDGE') {
    return <NudgeNotif notif={notif} key={id} senderUsername={notif.sender?.username.trim()} />
  }
}

export default function MiscNotifs() {
  const { userData } = useGlobalContext()

  if (!userData) {
    return null
  }

  const { data, isFetched, isFetching } = api.notif.getMiscNotifsWithSenderUsernameFromUserId.useQuery({
    id: userData.id,
  })
  const renderedNotifications = []

  if (data) {
    for (let i = 0; i < data.length; i++) {
      const notif = data[i]
      if (notif) {
        renderedNotifications?.push(handleNotif(notif, notif.id, userData.id))
      }
    }
  }

  // push some extra space to the array so that we can a little extra room at the bottom of the notifications list
  // this is best for newer mobile displays that have curved corners
  renderedNotifications.push(<View className="pb-10" key={-1} />)

  return renderedNotifications.length == 1 ? (
    <View>
      {isFetched && (
        <Text className="flex pt-10 text-center" style={{ color: '#CACACA' }}>
          No notifications to display.
        </Text>
      )}
      {isFetching && <RotatingBarbellIcon />}
    </View>
  ) : (
    renderedNotifications
  )
}
