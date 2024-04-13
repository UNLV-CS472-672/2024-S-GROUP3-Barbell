import { Text, View } from 'react-native'

import { ChatType } from '@prisma/client'

import Conversation from '~/components/notif/Conversation'
import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/api'
import { makeChatName } from '~/utils/common'

function makeNullMessagePreview(chat: any, loggedInUser: string): string {
  return (
    (chat.createdBy.username.trim() == loggedInUser ? 'You' : chat.createdBy.username.trim()) + ' created a new chat'
  )
}

export default function GcNotifs() {
  const { userData } = useGlobalContext()

  if (!userData) {
    return null
  }

  const { data, isFetched, isFetching } = api.notif.getMessagePreviewsFromUserIdAndChatType.useQuery({
    id: userData.id,
    type: ChatType.GROUP,
  })
  const renderedNotifications: any[] = []

  // Iterate over each chat object
  if (data != undefined) {
    data.forEach((chat) => {
      const lastMessage = chat.messages[0]
      const chatName: string = chat.name != undefined ? chat.name : makeChatName(chat.users, userData)
      const messageContent: string =
        lastMessage != undefined ? lastMessage.content : makeNullMessagePreview(chat, userData.username)
      const createdAt: Date = lastMessage != undefined ? lastMessage.createdAt : chat.createdAt
      renderedNotifications.push(
        <Conversation
          key={chat.id}
          chatId={chat.id}
          chatName={chatName}
          messageContent={messageContent}
          createdAt={createdAt}
          readBy={chat.readByUserIds}
          type={ChatType.GROUP}
        />,
      )
    })
  }

  // push some extra space to the array so that we can a little extra room at the bottom of the notifications list
  // this is best for newer mobile displays that have curved corners
  renderedNotifications.push(<View className="pb-10" key={-1} />)

  return renderedNotifications.length == 1 ? (
    <View>
      {isFetched && (
        <Text className="flex pt-10 text-center" style={{ color: '#CACACA' }}>
          No messages to display.
        </Text>
      )}
      {isFetching && <RotatingBarbellIcon />}
    </View>
  ) : (
    renderedNotifications
  )
}
