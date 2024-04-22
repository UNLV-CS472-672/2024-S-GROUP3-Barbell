import React from 'react'
import { Linking, SafeAreaView, Text, View } from 'react-native'

import { Feather, Fontisto, SimpleLineIcons } from '@expo/vector-icons'

import NavBar from '~/components/ui/nav-bar/NavBar'

{
  /* these variables are used to simplify common styling */
}
const viewStyles = 'mt-10 flex flex-row items-center'
const textStyles = 'text-xl text-slate-200'

export default function ContactUsPage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C1B1B' }}>
      {/* Header */}
      <NavBar center='Contact Us' />

      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {/* Email */}
        <View className={viewStyles}>
          <Fontisto name='email' size={24} color='#CACACA' style={{ marginRight: 10 }} />
          <Text className={textStyles}>barbell_support@gmail.com</Text>
        </View>

        {/* Phone */}
        <View className={viewStyles}>
          <Feather name='phone' size={24} color='#CACACA' style={{ marginRight: 10 }} />
          <Text className={textStyles}>+1 (702) 895-3011</Text>
        </View>

        {/* Location */}
        <View className={viewStyles}>
          <SimpleLineIcons
            name='location-pin'
            size={24}
            color='#CACACA'
            style={{ marginRight: 10 }}
          />
          <View>
            <Text className={textStyles}>University of Nevada, Las Vegas</Text>
            <Text className={textStyles}>4505 South Maryland Parkway</Text>
            <Text className={textStyles}>Las Vegas, NV 89154</Text>
          </View>
        </View>

        {/* Response Time */}
        <Text style={{ fontSize: 16, color: '#CACACA', marginTop: 40, textAlign: 'center' }}>
          Our goal is to respond to your inquiries within 24 business hours.
        </Text>
      </View>
    </SafeAreaView>
  )
}
