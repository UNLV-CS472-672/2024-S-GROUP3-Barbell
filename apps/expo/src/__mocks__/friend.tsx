import React from 'react'
import { View } from 'react-native'

const MockFriend = ({ username }: { username: string }) => <View testID={`friend-${username}`} />

export default MockFriend
