import React from 'react'
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native'

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
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.userTile}>
        <Text style={styles.userTileUpper}>pic</Text>
        <View style={[styles.userTileUpper, { flex: 3 }]}>
          <Text style={styles.userFullName}>Marcos Villanueva</Text>
          <Text style={styles.userProgram}>No-neck program</Text>
        </View>
        <Button title="Nudge" onPress={() => alert('poke!')}/>
      </View>
      <View style={styles.userTile}>
        <View style={styles.userTileItem}>
          <Text style={[styles.userInfoTile, styles.userInfoTileUpper]}>180cm</Text>
          <Text style={[styles.userInfoTile, styles.userInfoTileLower]}>Height</Text>
        </View>
        <View style={styles.userTileItem}>
          <Text style={[styles.userInfoTile, styles.userInfoTileUpper]}>65kg</Text>
          <Text style={[styles.userInfoTile, styles.userInfoTileLower]}>Weight</Text>
        </View>
        <View style={styles.userTileItem}>
          <Text style={[styles.userInfoTile, styles.userInfoTileUpper]}>22yo.</Text>
          <Text style={[styles.userInfoTile, styles.userInfoTileLower]}>Age</Text>
        </View>
      </View>
      <View style={styles.mainTile}>
        <Text style={styles.mainTileTitle}>Account</Text>
        <View style={styles.mainTileItem}>
          <Text style={styles.mainTileIcon}>img</Text>
          <Text style={styles.mainTileItemLabel}>Personal Data</Text>
          <Button title="link"/>
        </View>
        <View style={styles.mainTileItem}>
          <Text style={styles.mainTileIcon}>img</Text>
          <Text style={styles.mainTileItemLabel}>Achievements</Text>
          <Button title="link"/>
        </View>
        <View style={styles.mainTileItem}>
          <Text style={styles.mainTileIcon}>img</Text>
          <Text style={styles.mainTileItemLabel}>Activity History</Text>
          <Button title="link"/>
        </View>
        <View style={styles.mainTileItem}>
          <Text style={styles.mainTileIcon}>img</Text>
          <Text style={styles.mainTileItemLabel}>Workout Progress</Text>
          <Button title="link"/>
        </View>
      </View>
      <View style={styles.mainTile}>
        <Text style={styles.mainTileTitle}>Notification</Text>
        <View style={styles.mainTileItem}>
          <Text style={styles.mainTileIcon}>img</Text>
          <Text style={styles.mainTileItemLabel}>Pop-up Notification</Text>
          <Button title="switch" />
        </View>
      </View>
      <View style={styles.mainTile}>
        <Text style={styles.mainTileTitle}>Other</Text>
        <View style={styles.mainTileItem}>
          <Text style={styles.mainTileIcon}>img</Text>
          <Text style={styles.mainTileItemLabel}>Contact Us</Text>
          <Button title="link"/>
        </View>
        <View style={styles.mainTileItem}>
          <Text style={styles.mainTileIcon}>img</Text>
          <Text style={styles.mainTileItemLabel}>Privacy Policy</Text>
          <Button title="link"/>
        </View>
      </View>
    </ScrollView>
  )
}

export default Profile
