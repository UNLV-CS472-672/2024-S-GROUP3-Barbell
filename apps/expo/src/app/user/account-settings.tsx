import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Switch, FlatList, Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '~/utils/api';
import { router } from 'expo-router';

const iconSize = 26;
const borderRadius = 12;
const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#eeeeee'
  },
  userTile: {
    flexDirection: 'row',
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
    borderRadius: borderRadius
  },
  mainTile: {
    margin: 12,
    padding: 18,
    borderRadius: borderRadius,
    backgroundColor: '#ffffff'
  },
  mainTileTitle: {
    fontSize: 22,
  },
  mainTileItem: {
    flexDirection: 'row'
  },
  mainTileIcon: {
    margin: 4
  },
  userFullName: {
    fontSize: 22,
    margin: 6 
  },
  userProgram: {
    margin: 6
  },
  navigationListItemIcon: {
    padding: 8,
    alignSelf: 'center'
  },
  navigationListItemLabel: {
    flex: 4,
    margin: 4,
    alignSelf: 'center'
  },
  navigationListItemChevron: {
    alignSelf: 'center'
  },
  nudgeBtn: {
    margin: 12
  }
})

interface NavigationListItem {
  title: string,
  iconName: string,
  onPress: () => void;
}

const AccountSettings = () => {
  const [notificationsSwitchEnabled, setIsEnabled] = useState(false);
  const toggleNotificationSwitch = () => setIsEnabled(previousState => !previousState);

  const { data } = api.user.byId.useQuery({ id: 1 });
  const user = data; // alias for readability

  const accountItems: NavigationListItem[] = [
    { title: 'Personal Data', iconName: 'user', onPress: () => router.push('/user/personal-data') },
    { title: 'Achievements', iconName: 'award', onPress: () => router.push('/user/achievements') },
    { title: 'Activity History', iconName: 'history', onPress: () => router.push('/user/activity-history') },
    { title: 'Workout Progress', iconName: 'chart-pie', onPress: () => router.push('/user/workout-progress') }
  ];

  const otherItems: NavigationListItem[] = [
    { title: 'Contact Us', iconName: 'envelope', onPress: () => router.push('/contact-us') },
    { title: 'Privacy Policy', iconName: 'shield-alt', onPress: () => router.push('/privacy-policy') }
  ]

  return (
    <SafeAreaView>
      <View style={styles.userTile}>
        <View style={ { flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome5 name="user" size={48} style={ { padding: 22 }}/>
        </View>
        <View style={[styles.userTileUpper, { flex: 3 }]}>
          <Text style={styles.userFullName}>{user?.name}</Text>
          <Text style={styles.userProgram}>Program</Text>
        </View>
        <View style={ { flexDirection: 'row', alignItems: 'center', padding: 12 }}>
          <Button title="Nudge" onPress={() => alert('boop')} />
        </View>
      </View>
      <View style={styles.mainTile}>
        <Text style={styles.mainTileTitle}>Account</Text>
        <View style={styles.mainTileItem}>
          <FlatList data={accountItems} renderItem={({ item }) => (
            <Pressable onPress={item.onPress} style={ { flexDirection: 'row' }}>
              <FontAwesome5 name={item.iconName} size={iconSize} style={styles.navigationListItemIcon}/>
              <Text style={styles.navigationListItemLabel}>{item.title}</Text>
              <FontAwesome5 name="chevron-right" style={styles.navigationListItemChevron} />
            </Pressable>
          )}/>
        </View>
      </View>
      <View style={styles.mainTile}>
        <Text style={styles.mainTileTitle}>Notifications</Text>
        <View style={styles.mainTileItem}>
          <Text style={styles.navigationListItemLabel}>Banners</Text>
          <Switch onValueChange={toggleNotificationSwitch} value={notificationsSwitchEnabled} />
        </View>
      </View>
      <View style={styles.mainTile}>
        <Text style={styles.mainTileTitle}>Other</Text>
          <FlatList data={otherItems} renderItem={({ item }) => (
            <Pressable onPress={item.onPress} style={ { flexDirection: 'row' }}>
              <FontAwesome5 name={item.iconName} size={iconSize} style={styles.navigationListItemIcon} />
              <Text style={styles.navigationListItemLabel}>{item.title}</Text>
              <FontAwesome5 name="chevron-right" style={styles.navigationListItemChevron} />
            </Pressable>
          )}/>
      </View>
    </SafeAreaView>
  )
}

export default AccountSettings
