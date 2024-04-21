import React from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { Octicons } from '@expo/vector-icons'

export default function MessageInput() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 'auto',
        marginBottom: 10,
      }}
    >
      <TextInput
        placeholder="Message..."
        placeholderTextColor="#CACACA"
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: '#FFFFFF',
          borderRadius: 20,
          padding: 10,
          color: 'white',
          backgroundColor: '#1C1B1B',
          opacity: 0.9,
        }}
        keyboardAppearance="dark"
      />
      <TouchableOpacity>
        <View
          style={{
            marginLeft: 10,
            backgroundColor: '#48476D',
            borderRadius: 20,
            padding: 10,
            borderColor: '#FFFFFF',
            borderWidth: 1,
          }}
        >
          <Octicons name="paper-airplane" size={18} color="#CACACA" />
        </View>
      </TouchableOpacity>
    </View>
  )
}