import React from 'react'
import { Linking, Text, View } from 'react-native'

import { Feather, Fontisto, SimpleLineIcons } from '@expo/vector-icons'

import NavBar from '~/components/ui/nav-bar/NavBar'

export default function ContactUsPage() {
  return (
    <View style={{ flex: 1, backgroundColor: '#1C1B1B' }}>
      {/* Header */}
      <NavBar center='Contact Us' />

      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        {/* Email */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <Fontisto name='email' size={24} color='#CACACA' style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 18, color: '#CACACA' }}>barbell_support@gmail.com</Text>
        </View>

        {/* Phone */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40 }}>
          <Feather name='phone' size={24} color='#CACACA' style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 18, color: '#CACACA' }}>+1 (702) 895-3011</Text>
        </View>

        {/* Location */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40 }}>
          <SimpleLineIcons
            name='location-pin'
            size={24}
            color='#CACACA'
            style={{ marginRight: 10 }}
          />
          <View>
            <Text style={{ fontSize: 18, color: '#CACACA' }}>University of Nevada, Las Vegas</Text>
            <Text style={{ fontSize: 18, color: '#CACACA' }}>4505 South Maryland Parkway</Text>
            <Text style={{ fontSize: 18, color: '#CACACA' }}>Las Vegas, NV 89154</Text>
          </View>
        </View>

        {/* Response Time */}
        <Text style={{ fontSize: 16, marginTop: 40, color: '#CACACA' }}>
          Our goal is to respond to your inquiries within a 24-hour time frame on weekdays.
        </Text>
      </View>
    </View>
  )
}
