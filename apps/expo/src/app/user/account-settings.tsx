import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, FlatList, Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '~/utils/api';
import { router } from 'expo-router';
import colors from '~/styles/colors';
import { FA } from '~/utils/constants';

interface NavigationListItem {
  title: string;
  iconName: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  navigationListItemIcon: {
    padding: 8,
    alignSelf: 'center',
    color: colors.purple
  },
  navigationListItemLabel: {
    flex: 4,
    margin: 4,
    alignSelf: 'center',
    color: colors.silver
  },
  navigationListItemChevron: {
    alignSelf: 'center',
    color: colors.silver
  }
});

const tailwindClasses = {
  mainTile: 'm-4 p-4 rounded-lg bg-bb-dark-gray',
  mainTileTitle: 'text-2xl text-slate-200',
  mainTileItem: 'flex-row',
  navigationListItemLabel: 'flex-auto m-2 self-center text-slate-200',
  navigationListItemChevron: 'self-center text-slate-200'
};

const accountItems: NavigationListItem[] = [
  { title: 'Personal Data', iconName: 'user', onPress: () => router.push('/user/personal-data') },
  { title: 'Achievements', iconName: 'award', onPress: () => router.push('/user/achievements') },
  { title: 'Activity History', iconName: 'history', onPress: () => router.push('/user/activity-history') },
  { title: 'Workout Progress', iconName: 'chart-pie', onPress: () => router.push('/user/workout-progress') }
];

const otherItems: NavigationListItem[] = [
  { title: 'Contact Us', iconName: 'envelope', onPress: () => router.push('/contact-us') },
  { title: 'Privacy Policy', iconName: 'shield-alt', onPress: () => router.push('/privacy-policy') }
];

const AccountSettings = () => {
  const { data: user } = api.user.byId.useQuery({ id: 1 });
  const [notificationsSwitchEnabled, setNotificationsSwitchEnabled] = useState(false);
  const toggleNotificationSwitch = () => {
    setNotificationsSwitchEnabled(previousState => !previousState);
  };

  return (
    <SafeAreaView className='flex-1 bg-bb-slate-100' style={{backgroundColor: '#1e1e1e', flex: 1}}>
      <View className='flex-row bg-bb-dark-gray rounded-lg m-4'>
        <View className='flex-row items-center'>
          <FontAwesome5 name="user" size={FA.xl} className="p-6 text-bb-dark-purple" style={{color: '#48476D'}}/>
        </View>
        <View className='m-4 flex-3'>
          <Text className="text-2xl text-slate-200">{user?.name}</Text>
          <Text className="text-md text-slate-200">Streak: {user?.streak} days</Text>
        </View>
      </View>
      <View className={tailwindClasses.mainTile}>
        <Text className={tailwindClasses.mainTileTitle}>Account</Text>
        <View className={tailwindClasses.mainTileItem}>
          <FlatList data={accountItems} renderItem={({ item }) => (
            <Pressable onPress={item.onPress} className='flex-row'>
              <FontAwesome5 name={item.iconName} size={FA.reg} style={styles.navigationListItemIcon}/>
              <Text className={tailwindClasses.navigationListItemLabel}>{item.title}</Text>
              <FontAwesome5 name="chevron-right" className={tailwindClasses.navigationListItemChevron} style={styles.navigationListItemChevron}/>
            </Pressable>
          )}/>
        </View>
      </View>
      <View className={tailwindClasses.mainTile}>
        <Text className={tailwindClasses.mainTileTitle}>Notifications</Text>
        <View className={tailwindClasses.mainTileItem}>
          <Text className={tailwindClasses.navigationListItemLabel}>Banners</Text>
          <Switch
            onValueChange={toggleNotificationSwitch}
            value={notificationsSwitchEnabled}
            trackColor={{true: colors.purple}}
            thumbColor={notificationsSwitchEnabled ? colors.purple : colors.silver}/>
        </View>
      </View>
      <View className={tailwindClasses.mainTile}>
        <Text className={tailwindClasses.mainTileTitle}>Other</Text>
          <FlatList data={otherItems} renderItem={({ item }) => (
            <Pressable onPress={item.onPress} className='flex-row'>
              <FontAwesome5 name={item.iconName} size={FA.reg} style={styles.navigationListItemIcon} />
              <Text className={tailwindClasses.navigationListItemLabel}>{item.title}</Text>
              <FontAwesome5 name="chevron-right" className={tailwindClasses.navigationListItemChevron} style={styles.navigationListItemChevron}/>
            </Pressable>
          )}/>
      </View>
    </SafeAreaView>
  )
}

export default AccountSettings;
