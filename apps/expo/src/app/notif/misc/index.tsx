import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router'
import MiscNotifs from '~/components/notif/miscNotifs/miscNotifs';
import DmNotifs from '~/components/notif/dmNotifs/dmNotifs';
import GcNotifs from '~/components/notif/gcNotifs';
import { SafeAreaView } from 'react-native-safe-area-context';

export type notifsType = "misc" | "dm" | "gc"

export default function NotifScreen() {
  
  const [visibleNotifs, setVisibleNotifs] = useState<notifsType>("misc");
  
  return (
    <SafeAreaView style={{backgroundColor: "#1C1B1B", flex: 1}}>
      {/*header w/ back and new message buttons*/}
      <View className="flex flex-row justify-between px-5">
        <Ionicons onPress={() => router.back()} name="chevron-back" size={24} color="#CACACA" />
        <Text style={{color: "#CACACA", fontSize: 20}}>Notifications</Text>
        <MaterialCommunityIcons name="message-plus-outline" size={24} color="#CACACA" />
      </View>

      {/*notif nav buttons*/}
      <View className="flex flex-row items-center m-2" >
        <TouchableOpacity className="font-bold py-2 px-4 rounded-lg flex-1 ml-1 mr-1 mt-1" style={{backgroundColor: visibleNotifs == "misc" ? "#48476D" : "#CACACA"}}
        onPress={() => {setVisibleNotifs("misc")}}>
          <Text style={{color: visibleNotifs == "misc" ? "#CACACA" : "#1C1B1B", textAlign: "center"}}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity className="font-bold py-2 px-4 rounded-lg flex-1 ml-1 mr-1 mt-1" style={{backgroundColor: visibleNotifs == "dm" ? "#48476D" : "#CACACA"}}
        onPress={() => {setVisibleNotifs("dm")}}>
          <Text style={{color: visibleNotifs == "dm" ? "#CACACA" : "#1C1B1B", textAlign: "center"}}>Direct</Text>
        </TouchableOpacity>
        <TouchableOpacity className="font-bold py-2 px-4 rounded-lg flex-1 ml-1 mr-1 mt-1" style={{backgroundColor: visibleNotifs == "gc" ? "#48476D" : "#CACACA"}}
        onPress={() => {setVisibleNotifs("gc")}}>
          <Text style={{color: visibleNotifs == "gc" ? "#CACACA" : "#1C1B1B", textAlign: "center"}}>Group</Text>
        </TouchableOpacity>
      </View>

      {/*thin line between notifs and nav section*/}
      <View style={{borderBottomWidth: 1, borderBottomColor: "#737272"}}/>

      {/*list of notifications*/}
      <ScrollView className="flex-1">
        <View>
          {visibleNotifs == "misc" && <MiscNotifs />}
          {visibleNotifs == "dm" && <DmNotifs />}
          {visibleNotifs == "gc" && <GcNotifs />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
