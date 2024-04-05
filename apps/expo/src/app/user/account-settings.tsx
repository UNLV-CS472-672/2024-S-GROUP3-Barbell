import React, { useState } from 'react'
import { Button, FlatList, Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { api } from '~/utils/api'

const iconSize = 26
const borderRadius = 12
const colors = {
  primary: '#FF385C',
  grey: '#cacaca',
  dark: '#1A1A1A',
  darkGrey: '#272727',
  purple: '#48476D',
  white: '#FFFFFF',
  background: '#1E1E1E',
  bottomav: {
    nav: '#272727',
    icon: '#CACACA',
  },
}
const styles = StyleSheet.create({
  screenContainer: {
    color: colors.primary,
    backgroundColor: colors.background,
  },
  userTile: {
    flexDirection: 'row',
    backgroundColor: colors.darkGrey,
    borderRadius: borderRadius,
    margin: 12,
  },
  userTileUpper: {
    margin: 12,
  },
  userTileItem: {
    flex: 1,
    textAlign: 'center',
    padding: 4,
    backgroundColor: '#ffffff',
    margin: 12,
    borderRadius: borderRadius,
  },
  mainTile: {
    margin: 12,
    padding: 18,
    borderRadius: borderRadius,
    backgroundColor: colors.darkGrey,
  },
  mainTileTitle: {
    fontSize: 22,
    color: colors.grey,
  },
  mainTileItem: {
    flexDirection: 'row',
  },
  mainTileIcon: {
    margin: 4,
  },
  userFullName: {
    fontSize: 22,
    margin: 6,
    color: colors.grey,
  },
  userProgram: {
    margin: 6,
    color: colors.grey,
  },
  navigationListItemIcon: {
    padding: 8,
    alignSelf: 'center',
    color: colors.purple,
  },
  navigationListItemLabel: {
    flex: 4,
    margin: 4,
    alignSelf: 'center',
    color: colors.grey,
  },
  navigationListItemChevron: {
    alignSelf: 'center',
    color: colors.grey,
  },
  nudgeBtn: {
    margin: 12,
  },
})

interface NavigationListItem {
  title: string
  iconName: string
  onPress: () => void
}

const AccountSettings = () => {
  const [notificationsSwitchEnabled, setIsEnabled] = useState(false)
  const toggleNotificationSwitch = () => setIsEnabled((previousState) => !previousState)
  const context = api.useUtils()

  const { data, isLoading } = api.user.byId.useQuery({ id: 1 })
  const user = data // alias for readability

  const accountItems: NavigationListItem[] = [
    { title: 'Personal Data', iconName: 'user', onPress: () => router.push('/user/personal-data') },
    { title: 'Achievements', iconName: 'award', onPress: () => router.push('/user/achievements') },
    { title: 'Activity History', iconName: 'history', onPress: () => router.push('/user/activity-history') },
    { title: 'Workout Progress', iconName: 'chart-pie', onPress: () => router.push('/user/workout-progress') },
  ]

  const otherItems: NavigationListItem[] = [
    { title: 'Contact Us', iconName: 'envelope', onPress: () => router.push('/contact-us') },
    { title: 'Privacy Policy', iconName: 'shield-alt', onPress: () => router.push('/privacy-policy') },
  ]

  return (
    <SafeAreaView style={[styles.screenContainer, { flex: 1 }]}>
      <View style={styles.userTile}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome5 name="user" size={48} style={{ padding: 22, color: colors.purple }} />
        </View>
        <View style={[styles.userTileUpper, { flex: 3 }]}>
          <Text style={styles.userFullName}>{user?.name}</Text>
          <Text style={styles.userProgram}>Program</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}></View>
      </View>
      <View style={styles.mainTile}>
        <Text style={styles.mainTileTitle}>Account</Text>
        <View style={styles.mainTileItem}>
          <FlatList
            data={accountItems}
            renderItem={({ item }) => (
              <Pressable onPress={item.onPress} style={{ flexDirection: 'row' }}>
                <FontAwesome5 name={item.iconName} size={iconSize} style={styles.navigationListItemIcon} />
                <Text style={styles.navigationListItemLabel}>{item.title}</Text>
                <FontAwesome5 name="chevron-right" style={styles.navigationListItemChevron} />
              </Pressable>
            )}
          />
        </View>
      </View>
      <View style={styles.mainTile}>
        <Text style={styles.mainTileTitle}>Notifications</Text>
        <View style={styles.mainTileItem}>
          <Text style={styles.navigationListItemLabel}>Banners</Text>
          <Switch
            onValueChange={toggleNotificationSwitch}
            value={notificationsSwitchEnabled}
            trackColor={{ true: colors.purple }}
            thumbColor={notificationsSwitchEnabled ? colors.purple : colors.grey}
          />
        </View>
      </View>
      <View style={styles.mainTile}>
        <Text style={styles.mainTileTitle}>Other</Text>
        <FlatList
          data={otherItems}
          renderItem={({ item }) => (
            <Pressable onPress={item.onPress} style={{ flexDirection: 'row' }}>
              <FontAwesome5 name={item.iconName} size={iconSize} style={styles.navigationListItemIcon} />
              <Text style={styles.navigationListItemLabel}>{item.title}</Text>
              <FontAwesome5 name="chevron-right" style={styles.navigationListItemChevron} />
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default AccountSettings
