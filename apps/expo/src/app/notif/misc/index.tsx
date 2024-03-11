import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function MiscNotifScreen() {
  return (
    <View style={{backgroundColor: "#1C1B1B", flex: 1}}>
      {/*header w/ back and new message*/}
      <View className="flex flex-row justify-between pt-5 px-5">
        <Ionicons name="chevron-back" size={24} color="#CACACA" />
        <Text style={{color: "#CACACA", fontSize: 20}}>Notifications</Text>
        <MaterialCommunityIcons name="message-plus-outline" size={24} color="#CACACA" />
      </View>
      {/*notif nav buttons*/}
      <View className="flex flex-row items-center m-2">
        <View className="font-bold py-2 px-4 rounded-lg flex-1 m-1" style={{backgroundColor: "#48476D"}}>
          <Text style={{color: "#CACACA", textAlign: "center"}}>Notifications</Text>
        </View>
        <View className="font-bold py-2 px-4 rounded-lg flex-1 m-1" style={{backgroundColor: "#CACACA"}}>
          <Text style={{color: "#1C1B1B", textAlign: "center"}}>Direct</Text>
        </View>
        <View className="font-bold py-2 px-4 rounded-lg flex-1 m-1" style={{backgroundColor: "#CACACA"}}>
          <Text style={{color: "#1C1B1B", textAlign: "center"}}>Group</Text>
        </View>
      </View>
    </View>
  );
}
