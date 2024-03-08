import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackArrow from '~/app/public/icons/back_arrow/BackArrow';
import WriteMessage from '~/app/public/icons/write_message_icon/WriteMessage';

export default function MiscNotifScreen() {
  return (
    <View style={styles.container}>
      <BackArrow />
      <Text style={styles.header}>Notifications</Text>
      <WriteMessage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#1C1B1B',
  },
  header: {
    fontSize: 25,
    color: '#CACACA',
  },
});