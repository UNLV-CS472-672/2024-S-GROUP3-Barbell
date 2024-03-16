import type { Route } from 'expo-router'
import React from 'react'
import { Button, FlatList, StyleSheet, View } from 'react-native'
import { router } from 'expo-router'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
})

const Nav = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          // add your component routes here
          { key: 'Home', route: '/' },
          { key: 'Go Auth', route: '/auth' },
          { key: 'Notif/dm', route: '/notif/dm' },
          { key: 'Notif/misc', route: '/notif/misc' },
        ]}
        renderItem={({ item }) => (
          <Button
            title={item.key}
            onPress={() => router.push(item.route as Route<string>)}
          />
        )}
      />
    </View>
  )
}

export default Nav
