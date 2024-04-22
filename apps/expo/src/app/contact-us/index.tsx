import React from 'react'
import { Linking, SafeAreaView, Text, View, ViewStyle } from 'react-native'

import { Feather, Fontisto, SimpleLineIcons } from '@expo/vector-icons'

import NavBar from '~/components/ui/nav-bar/NavBar'

{
  /* these variables are used to simplify common styling */
}
const viewStyles: ViewStyle = { flexDirection: 'row', alignItems: 'center', marginTop: 30 }
const textStyles = { fontSize: 18, color: '#CACACA' }

export default function ContactUsPage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C1B1B' }}>
      {/* Header */}
      <NavBar center='Contact Us' />

      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        {/* Email */}
        <View style={viewStyles}>
          <Fontisto name='email' size={24} color='#CACACA' style={{ marginRight: 10 }} />
          <Text style={textStyles}>barbell_support@gmail.com</Text>
        </View>

        {/* Phone */}
        <View style={viewStyles}>
          <Feather name='phone' size={24} color='#CACACA' style={{ marginRight: 10 }} />
          <Text style={textStyles}>+1 (702) 895-3011</Text>
        </View>

        {/* Location */}
        <View style={viewStyles}>
          <SimpleLineIcons
            name='location-pin'
            size={24}
            color='#CACACA'
            style={{ marginRight: 10 }}
          />
          <View>
            <Text style={textStyles}>University of Nevada, Las Vegas</Text>
            <Text style={textStyles}>4505 South Maryland Parkway</Text>
            <Text style={textStyles}>Las Vegas, NV 89154</Text>
          </View>
        </View>

        {/* Response Time */}
        <Text style={{ ...textStyles, fontSize: 16, marginTop: 40, textAlign: 'center' }}>
          Our goal is to respond to your inquiries within 24 business hours.
        </Text>
      </View>
    </SafeAreaView>
  )
}
