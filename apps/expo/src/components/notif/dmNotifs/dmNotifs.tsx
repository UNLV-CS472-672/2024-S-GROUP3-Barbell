import { Text, View } from 'react-native'

import { ChatType } from '@prisma/client'

import Conversation from '~/components/notif/Conversation'
import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

export default function DmNotifs() {
  const { userData } = useGlobalContext()

  if (!userData) {
    return null
  }
  
  const { data, isFetched, isFetching } = api.notif.getMessagePreviewsFromUserIdAndChatType.useQuery({
    id: userData.id,
    type: ChatType.DIRECT,
  })
  const renderedNotifications: any[] = []

  // Iterate over each chat object
  if (data != undefined) {
    data.forEach((chat) => {
      const messages = chat.messages
      messages.forEach((message) => {
        renderedNotifications.push(
          <Conversation
            key={chat.id}
            chatId={chat.id}
            chatName={String(
              chat.users[0]?.username == userData.username ? chat.users[1]?.username : chat.users[0]?.username,
            )}
            messageContent={message.content}
            createdAt={message.createdAt}
            readBy={chat.readByUserIds}
            type={ChatType.DIRECT}
          />,
        )
      })
    })
  }

  // push some extra space to the array so that we can a little extra room at the bottom of the notifications list
  // this is best for newer mobile displays that have curved corners
  renderedNotifications.push(<View className="pb-10" key={-1} />)

  return (
    <View testID="dm-notifications-container">
      {renderedNotifications.length == 1 ? (
        <>
          {isFetched && (
            <Text testID="no-messages-text" className="flex pt-10 text-center" style={{ color: '#CACACA' }}>
              No messages to display.
            </Text>
          )}
          {isFetching && (
            <View testID="rotating-barbell-icon-container">
              <RotatingBarbellIcon />
            </View>
          )}
        </>
      ) : (
        renderedNotifications
      )}
    </View>
  )
}
