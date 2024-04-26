import React, { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Route, router } from 'expo-router'

import { Entypo, Feather, Ionicons } from '@expo/vector-icons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import Button from '~/components/ui/button/button'
import NavBar from '~/components/ui/nav-bar/NavBar'
import { useGlobalContext } from '~/context/global-context'
import colors from '~/styles/colors'
import { FA } from '~/utils/constants'
import { api } from '~/utils/trpc/api'

interface NavigationListItem {
  title: string
  iconName: string
  onPress: () => void
}

const styles = StyleSheet.create({
  navigationListItemIcon: {
    padding: 8,
    alignSelf: 'center',
    color: colors.purple,
  },
  navigationListItemLabel: {
    flex: 4,
    margin: 4,
    alignSelf: 'center',
    color: colors.silver,
  },
  navigationListItemChevron: {
    alignSelf: 'center',
    color: colors.silver,
  },
})

const tailwindClasses = {
  mainTile: 'm-4 p-4 rounded-lg bg-bb-dark-gray',
  mainTileTitle: 'text-2xl text-slate-200',
  mainTileItem: 'flex-row',
  navigationListItemLabel: 'm-2 self-center text-slate-200',
  navigationListItemChevron: 'self-center text-slate-200',
}

const accountItems: NavigationListItem[] = [
  { title: 'Personal Data', iconName: 'user', onPress: () => router.push('user/personal-data') },
  { title: 'Achievements', iconName: 'award', onPress: () => router.push('user/achievements') },
  {
    title: 'Activity History',
    iconName: 'history',
    onPress: () => router.push('user/activity-history'),
  },
  {
    title: 'Workout Progress',
    iconName: 'chart-pie',
    onPress: () => router.push('user/workout-progress'),
  },
]

const otherItems: NavigationListItem[] = [
  { title: 'Contact Us', iconName: 'envelope', onPress: () => router.push('contact-us/') },
  {
    title: 'Privacy Policy',
    iconName: 'shield-alt',
    onPress: () => router.push('privacy-policy/'),
  },
]

const AccountSettings = () => {
  const { userData } = useGlobalContext()

  // FIXME:
  if (!userData) {
    return null
  }

  const { data: user, isLoading, isFetching } = api.user.byId.useQuery({ id: userData.id })
  const updateUserMutation = api.user.update.useMutation()

  const [notificationsSwitchEnabled, setNotificationsSwitchEnabled] = useState(false)

  React.useEffect(() => {
    if (user) {
      setNotificationsSwitchEnabled(user.notificationsBanners ?? false)
    }
  }, [user])

  const toggleNotificationSwitch = async () => {
    const newValue = !notificationsSwitchEnabled
    setNotificationsSwitchEnabled(newValue)
    try {
      await updateUserMutation.mutateAsync({
        id: userData.id,
        notificationsBanners: newValue,
      })
    } catch (error) {
      console.error('Failed to update user settings', error)
      setNotificationsSwitchEnabled(!newValue)
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#1e1e1e', flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <RotatingBarbellIcon />
        </View>
      ) : (
        <>
          <NavBar left={<View />} center='My Profile' />

          <ScrollView className='px-3 pt-2'>
            <View className='flex items-center'>
              <View className='flex items-center justify-center'>
                {/* <View className='h-36 w-36 rounded-full bg-slate-300' /> */}
                <Ionicons name='person-circle-sharp' size={120} color={colors.silver} />
                <View className='bg-dark-purple absolute bottom-1 right-2 rounded-full border-[3px] border-[#1e1e1e] p-2'>
                  <Feather name='edit-3' size={16} color={colors.silver} />
                </View>
              </View>
              <View className='mt-2'>
                <Text className='text-2xl font-semibold text-slate-200'>{user?.name}</Text>
                <View className='mt-1 flex flex-row items-center justify-center gap-x-2'>
                  <FontAwesome5 name='fire-alt' size={18} color={colors.tracker.cancel} />
                  <Text className='text-md text-light-red'>{user?.streak} days</Text>
                </View>
              </View>
            </View>

            <View className='flex gap-y-5'>
              <View>
                <Text className='mb-2 text-xl font-semibold text-slate-200'>Account</Text>
                <View className='rounded-lg bg-neutral-800 py-1'>
                  <View className='w-full px-4'>
                    {accountItems.map((item, idx) => (
                      <Button
                        key={idx}
                        onPress={item.onPress}
                        color='icon'
                        className={`flex flex-row items-center justify-between ${
                          idx !== accountItems.length - 1 && 'border-b'
                        } border-b-neutral-700 px-1`}
                      >
                        <View className='flex flex-row items-center gap-x-3'>
                          <View className='w-6 items-center '>
                            <FontAwesome5 name={item.iconName} size={20} color={colors.silver} />
                          </View>
                          <Text className={tailwindClasses.navigationListItemLabel}>
                            {item.title}
                          </Text>
                        </View>

                        <Ionicons name='chevron-forward' size={20} color={colors.silver} />
                      </Button>
                    ))}
                  </View>
                </View>
              </View>

              <View>
                <Text className='mb-2 text-xl font-semibold text-slate-200'>Notifications</Text>

                <View className='rounded-lg bg-neutral-800 py-1'>
                  <View className='flex flex-row justify-between px-4 py-2'>
                    <View className='flex flex-row items-center gap-x-3'>
                      <View className='flex w-6 items-center justify-center'>
                        <Entypo name='popup' size={20} color={colors.silver} />
                      </View>
                      <Text className={tailwindClasses.navigationListItemLabel}>Banners</Text>
                    </View>
                    <Switch
                      onChange={toggleNotificationSwitch}
                      value={notificationsSwitchEnabled}
                      trackColor={{ true: colors.purple }}
                      disabled={isFetching}
                      thumbColor={colors.silver}
                    />
                  </View>
                </View>
              </View>

              <View>
                <Text className='mb-2 text-xl font-semibold text-slate-200'>Other</Text>
                <View className='rounded-lg bg-neutral-800 px-4 py-1'>
                  {otherItems.map((item, idx) => (
                    <Button
                      key={idx}
                      onPress={item.onPress}
                      color='icon'
                      className={`flex flex-row items-center justify-between ${
                        idx !== otherItems.length - 1 && 'border-b'
                      } border-b-neutral-700 px-1`}
                    >
                      <View className='flex flex-row items-center gap-x-3'>
                        <View className='w-6 items-center'>
                          <FontAwesome5 name={item.iconName} size={20} color={colors.silver} />
                        </View>
                        <Text className={tailwindClasses.navigationListItemLabel}>
                          {item.title}
                        </Text>
                      </View>
                      <Ionicons name='chevron-forward' size={20} color={colors.silver} />
                    </Button>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  )
}

export default AccountSettings
