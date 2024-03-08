import React from 'react'
import { router } from 'expo-router'
import { StyleSheet, Button, Text, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  btn: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const Nav = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
            // add your component routes here
          {key: 'Home', route: '/'},
        ]}
        renderItem={({item}) => <Button style={styles.btn} title={item.key} onPress={() => router.push(item.route)}/>}
      />
    </View>
  );
};

export default Nav
