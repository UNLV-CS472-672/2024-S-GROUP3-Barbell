import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router'
import MiscNotifs from '~/components/notif/miscNotifs';
import DmNotifs from '~/components/notif/dmNotifs';
import GcNotifs from '~/components/notif/gcNotifs';

export type notifsType = "misc" | "dm" | "gc"
type colorType = "#48476D" | "#CACACA"
type textColorType = "#1C1B1B" | "#CACACA"

export default function MiscNotifScreen() {
  
  const [visibleNotifs, setVisibleNotifs] = useState<notifsType>("misc");
  const [miscColor, setMiscColor] = useState<colorType>("#48476D");
  const [miscTextColor, setMiscTextColor] = useState<textColorType>("#CACACA");
  const [dmColor, setDmColor] = useState<colorType>("#CACACA");
  const [dmTextColor, setDmTextColor] = useState<textColorType>("#1C1B1B");
  const [gcColor, setGcColor] = useState<colorType>("#CACACA");
  const [gcTextColor, setGcTextColor] = useState<textColorType>("#1C1B1B");

  useEffect(() => {
    if(visibleNotifs == "misc"){
      setMiscColor("#48476D");
      setMiscTextColor("#CACACA");
      setDmColor("#CACACA");
      setDmTextColor("#1C1B1B");
      setGcColor("#CACACA");
      setGcTextColor("#1C1B1B")
    }
    else if(visibleNotifs == "dm"){
      setMiscColor("#CACACA");
      setMiscTextColor("#1C1B1B");
      setDmColor("#48476D");
      setDmTextColor("#CACACA");
      setGcColor("#CACACA");
      setGcTextColor("#1C1B1B");
    }
    else if(visibleNotifs == "gc"){
      setMiscColor("#CACACA");
      setMiscTextColor("#1C1B1B")
      setDmColor("#CACACA");
      setDmTextColor("#1C1B1B")
      setGcColor("#48476D");
      setGcTextColor("#CACACA")
    }
  }, [visibleNotifs])
  
  return (
    <View style={{backgroundColor: "#1C1B1B", flex: 1}}>
      {/*header w/ back and new message buttons*/}
      <View className="flex flex-row justify-between pt-5 px-5">
        <Ionicons onPress={() => router.back()} name="chevron-back" size={24} color="#CACACA" />
        <Text style={{color: "#CACACA", fontSize: 20}}>Notifications</Text>
        <MaterialCommunityIcons name="message-plus-outline" size={24} color="#CACACA" />
      </View>

      {/*notif nav buttons*/}
      <View className="flex flex-row items-center m-2" >
        <TouchableOpacity className="font-bold py-2 px-4 rounded-lg flex-1 ml-1 mr-1 mt-1" style={{backgroundColor: miscColor}}
        onPress={() => {setVisibleNotifs("misc")}}>
          <Text style={{color: miscTextColor, textAlign: "center"}}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity className="font-bold py-2 px-4 rounded-lg flex-1 ml-1 mr-1 mt-1" style={{backgroundColor: dmColor}}
        onPress={() => {setVisibleNotifs("dm")}}>
          <Text style={{color: dmTextColor, textAlign: "center"}}>Direct</Text>
        </TouchableOpacity>
        <TouchableOpacity className="font-bold py-2 px-4 rounded-lg flex-1 ml-1 mr-1 mt-1" style={{backgroundColor: gcColor}}
        onPress={() => {setVisibleNotifs("gc")}}>
          <Text style={{color: gcTextColor, textAlign: "center"}}>Group</Text>
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
    </View>
  );
}
