import { router } from 'expo-router';
import React from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
});

const Nav = () => {

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: 'Home', routeName: 'Home' },
          { key: 'Go Auth', routeName: 'Auth' },
          { key: 'Notif/dm', routeName: 'NotifDm' },
          { key: 'Notif/misc', routeName: 'NotifMisc' }
        ]}
        renderItem={({ item }) => (
          <Button
            title={item.key}
            onPress={() => router.push(item.routeName)}
          />
        )}
      />
    </View>
  );
};

export default Nav;
