import { Text, View } from 'react-native'

import calculateTimeAgo from '~/utils/calculateTime'

export interface TimeAgoProps {
  createdAt: Date
}

export default function TimeAgo({ createdAt }: TimeAgoProps) {
  const timeAgo = calculateTimeAgo(createdAt)
  // this is just further error checking/bug prevention. if there is something wrong with the timeAgo calculation then we want
  // to just return an empty view component so we don't get any weird "NaN ago" outputs or weird spacing. This can occur if
  // the notification object doesn't have a time / if the time zone is wrong and the date is in the future.
  return timeAgo == '' ? (
    <View testID="timeAgoBadDate" className="pb-2 pt-2" />
  ) : (
    <Text
      className="pb-2 pt-2 text-right"
      style={{ color: '#CACACA', fontSize: 11 }}
      testID="timeAgoText"
    >
      {timeAgo}
    </Text>
  )
}
