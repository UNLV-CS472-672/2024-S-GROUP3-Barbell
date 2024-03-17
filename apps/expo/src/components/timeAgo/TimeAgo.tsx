import { View, Text } from "react-native"
import calculateTimeAgo from "~/utils/calculateTime"

export default function TimeAgo({ notif }: { notif: any }) {
  const timeAgo = calculateTimeAgo(notif.createdAt)
  // this is just further error checking/bug prevention. if there is something wrong with the timeAgo calculation then we want 
  // to just return an empty view component so we don't get any weird "NaN ago" outputs or weird spacing. This can occur if 
  // the notification object doesn't have a time / if the time zone is wrong and the date is in the future.
  return timeAgo == "" ? <View className="pt-2 pb-2" /> :
                         <Text className="text-right pt-2 pb-2" style={{color: "#CACACA", fontSize: 11}}>{timeAgo}</Text>
}