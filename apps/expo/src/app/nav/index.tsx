import type { Route } from 'expo-router'
import React from 'react'
import { Button, FlatList, StyleSheet, View } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
    },
})

const Nav = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[
                    // add your component routes here
                    { key: 'Home', route: '/' },
                    { key: 'Go Auth', route: '/auth' },
                    { key: 'Notif/dm', route: '/notif/dm' },
                    { key: 'Notif/misc', route: '/notif/misc' },
                    { key: 'Message Input', route: '/messages'},
                    { key: 'Create New Workout', route: '/workout/createNew' },
                    { key: 'Award', route: '/award' },
                ]}
                renderItem={({ item }) => (
                    <Button title={item.key} onPress={() => router.push(item.route as Route<string>)} />
                )}
            />
        </SafeAreaView>
    )
}

export default Nav
