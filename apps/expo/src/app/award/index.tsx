import React, {useState} from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { router } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Toggle from '~/components/toggle/Toggle';
import tailwind from "@/tooling/tailwind";

export default function Award() {
    // screen dimensions
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

    // vmin: CSS
    const vmin70 = Math.min(screenWidth, screenHeight) * 0.7;

    return (
        <SafeAreaView style={{backgroundColor: "#1C1B1B", flex: 1}}>
            <View className="flex flex-row justify-between px-5">
                <Ionicons onPress={() => router.back()} name="chevron-back" size={24} color="#CACACA" />
                <Text style={{color: "#CACACA", fontSize: 20}}>Award</Text>
                <Ionicons name="ellipsis-horizontal-sharp" size={24} color="#CACACA" />
            </View>

            <View className="flex flex-row items-center" >
                <Image source={require('assets/award/trophy.png')}
                       style={{ flex: 1,  width: screenWidth*0.9, height: screenWidth*0.9}}
                       resizeMode="contain"/>
            </View>


            <View className="flex flex-col items-center" >
                <Toggle
                    strRightSide={"defaultOn = TRUE"}
                    defaultOn={useState(true)}
                />

                <Toggle/>
            </View>

        </SafeAreaView>
    );
}
