import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';

const svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>`;

export default function MiscNotifScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="chevron-back" size={24} color="#CACACA" />
      <Text style={styles.header}>Notifications</Text>
      <SvgXml xml={svgXml} width={24} height={24} />
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
