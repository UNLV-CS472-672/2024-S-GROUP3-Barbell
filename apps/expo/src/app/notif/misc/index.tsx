import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function MiscNotifScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="chevron-back" size={24} color="#CACACA" />
      <Text style={styles.header}>Notifications</Text>
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
    fontSize: 20,
    color: '#CACACA',
  },
});