import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Switch, FlatList, Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '~/utils/api';
import { router } from 'expo-router';

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#eeeeee'
  },
  userTile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
    borderRadius: 12
  },
  userInfoTile: {
    textAlign: 'center',
    padding: 8
  },
  userInfoTileUpper: {
    fontSize: 18,
  },
  userInfoTileLower: {
  },
  mainTile: {
    margin: 12,
    padding: 18,
    borderRadius: 12,
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
  mainTileItemLabel: {
    flex: 4,
    margin: 4
  },
  userFullName: {
    fontSize: 18,
    margin: 8 
  },
  userProgram: {
    margin: 8
  }
})

const Profile = () => {
  const [notificationsSwitchEnabled, setIsEnabled] = useState(false);
  const toggleNotificationSwitch = () => setIsEnabled(previousState => !previousState);
  const iconSize = 26;

  const { data } = api.user.byId.useQuery({ id: 1 });

  const userInfoItems = [
    { title: 'Height', value: data?.name },
    { title: 'Weight', value: data?.name },
    { title: 'Age', value: data?.name },
  ];

  const accountItems = [
    { title: 'Personal Data', iconName: 'user', onPress: () => router.push('/personal-data') },
    { title: 'Achievements', iconName: 'award', onPress: () => router.push('/achievements') },
    { title: 'Activity History', iconName: 'history', onPress: () => router.push('/activity-history') },
    { title: 'Workout Progress', iconName: 'chart-pie', onPress: () => router.push('/workout-progress') }
  ]

  return (
    <SafeAreaView>
      <ScrollView style={styles.screenContainer}>
        <View style={styles.userTile}>
          <Text style={styles.userTileUpper}>avatar</Text>
          <View style={[styles.userTileUpper, { flex: 3 }]}>
            <Text style={styles.userFullName}>Marcos Villanueva</Text>
            <Text style={styles.userProgram}>No-neck program</Text>
          </View>
          <View>
            <Button title="Nudge" onPress={() => alert('poke!')}/>
          </View>
        </View>
        <View style={styles.userTile}>
          <FlatList contentContainerStyle={styles.userTile} data={userInfoItems} renderItem={( { item }) => (
            <View style={styles.userTileItem}>
              <Text style={[styles.userInfoTile, styles.userInfoTileUpper]}>{item.value}</Text>
              <Text style={[styles.userInfoTile, styles.userInfoTileLower]}>{item.title}</Text>
            </View>
          )}/>
        </View>
        <View style={styles.mainTile}>
          <Text style={styles.mainTileTitle}>Account</Text>
          <View style={styles.mainTileItem}>
            <FlatList data={accountItems} renderItem={({ item }) => (
              <Pressable onPress={item.onPress} style={ { flexDirection: 'row' }}>
                <FontAwesome5 name={item.iconName} size={iconSize} />
                <Text style={styles.mainTileItemLabel}>{item.title}</Text>
                <FontAwesome5 name="chevron-right" />
              </Pressable>
            )}/>
          </View>
        </View>
        <View style={styles.mainTile}>
          <Text style={styles.mainTileTitle}>Notifications</Text>
          <View style={styles.mainTileItem}>
            <Text style={styles.mainTileItemLabel}>Banners</Text>
            <Switch onValueChange={toggleNotificationSwitch} value={notificationsSwitchEnabled} />
          </View>
        </View>
        <View style={styles.mainTile}>
          <Text style={styles.mainTileTitle}>Other</Text>
          <View style={styles.mainTileItem}>
            <FontAwesome5 name="envelope" size={iconSize} />
            <Text style={styles.mainTileItemLabel}>Contact Us</Text>
            <FontAwesome5 name="chevron-right" />
          </View>
          <View style={styles.mainTileItem}>
            <FontAwesome5 name="shield-alt" size={iconSize} />
            <Text style={styles.mainTileItemLabel}>Privacy Policy</Text>
            <FontAwesome5 name="chevron-right" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
