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
import { SafeAreaView } from 'react-native-safe-area-context'
import { Route, router } from 'expo-router'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

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
  navigationListItemLabel: 'flex-auto m-2 self-center text-slate-200',
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
  { title: 'Contact Us', iconName: 'envelope', onPress: () => router.push('/') },
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View className='py-10'>
        <Text>Something</Text>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>
    )
  }

  return (
    <SafeAreaView
      className='bg-bb-slate-100 flex-1'
      style={{ backgroundColor: '#1e1e1e', flex: 1 }}
    >
      <View className='bg-bb-dark-gray m-4 flex-row rounded-lg'>
        <View className='flex-row items-center'>
          <FontAwesome5
            name='user'
            size={FA.xl}
            className='text-bb-dark-purple p-6'
            style={{ color: '#48476D' }}
          />
        </View>
        <View className='flex-3 m-4'>
          <Text className='text-2xl text-slate-200'>{user?.name}</Text>
          <Text className='text-md text-slate-200'>Streak: {user?.streak} days</Text>
        </View>
      </View>

      <View className={tailwindClasses.mainTile}>
        <Text className={tailwindClasses.mainTileTitle}>Account</Text>
        <View className={tailwindClasses.mainTileItem}>
          <FlatList
            data={accountItems}
            renderItem={({ item }) => (
              <Pressable onPress={item.onPress} className='flex-row'>
                <FontAwesome5
                  name={item.iconName}
                  size={FA.reg}
                  style={styles.navigationListItemIcon}
                />
                <Text className={tailwindClasses.navigationListItemLabel}>{item.title}</Text>
                <FontAwesome5
                  name='chevron-right'
                  className={tailwindClasses.navigationListItemChevron}
                  style={styles.navigationListItemChevron}
                />
              </Pressable>
            )}
          />
        </View>
      </View>

      <View className={tailwindClasses.mainTile}>
        <Text className={tailwindClasses.mainTileTitle}>Notifications</Text>
        <View className={tailwindClasses.mainTileItem}>
          <Text className={tailwindClasses.navigationListItemLabel}>Banners</Text>
          <Switch
            // onValueChange={toggleNotificationSwitch}
            onChange={toggleNotificationSwitch}
            value={notificationsSwitchEnabled}
            trackColor={{ true: colors.purple }}
            disabled={isFetching}
            thumbColor={notificationsSwitchEnabled ? colors.purple : colors.silver}
          />
        </View>
      </View>

      <View className={tailwindClasses.mainTile}>
        <Text className={tailwindClasses.mainTileTitle}>Other</Text>
        <FlatList
          data={otherItems}
          renderItem={({ item }) => (
            <Pressable onPress={item.onPress} className='flex-row'>
              <FontAwesome5
                name={item.iconName}
                size={FA.reg}
                style={styles.navigationListItemIcon}
              />
              <Text className={tailwindClasses.navigationListItemLabel}>{item.title}</Text>
              <FontAwesome5
                name='chevron-right'
                className={tailwindClasses.navigationListItemChevron}
                style={styles.navigationListItemChevron}
              />
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default AccountSettings
