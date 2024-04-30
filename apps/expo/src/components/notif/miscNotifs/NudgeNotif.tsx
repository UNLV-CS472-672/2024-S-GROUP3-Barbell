import { Text, TouchableOpacity, View } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Notification } from '@prisma/client'

import TimeAgo from '~/components/timeAgo/TimeAgo'

export interface NudgeNotifProps {
  notif: Notification
  senderUsername: string
}

export default function NudgeNotif({ notif, senderUsername }: NudgeNotifProps) {
  return (
    <View testID='nudge-notif-container'>
      <View className='ml-3 mr-3 mt-4 flex flex-row items-center'>
        {/*flexing arm is the placeholder, might change in future*/}
        <View className='flex flex-col'>
          <View className='mr-2'>
            <MaterialCommunityIcons name='arm-flex' size={56} color='#CACACA' />
          </View>
        </View>

        <View className='flex flex-1 flex-col'>
          {/*nudged text*/}
          <Text
            className='mb-2 mr-2'
            style={{ color: '#CACACA' }}
            testID='sender-username-with-content'
          >
            {senderUsername} {notif.content}
          </Text>
          {/*nudge back button*/}
          <TouchableOpacity
            className='flex-1 rounded-lg px-4 py-2'
            style={{ backgroundColor: '#CACACA' }}
          >
            <Text style={{ color: '#1C1B1B' }} className='text-center'>
              Nudge back
            </Text>
          </TouchableOpacity>
          <TimeAgo createdAt={notif.createdAt} />
        </View>
      </View>
      {/*thin line between notifications*/}
      <View className='ml-3 mr-3' style={{ borderBottomWidth: 1, borderBottomColor: '#737272' }} />
    </View>
  )
}
