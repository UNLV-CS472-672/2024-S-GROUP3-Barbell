import React from 'react'
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Octicons } from '@expo/vector-icons'

export default function MessageInput() {
  return (
    <KeyboardAvoidingView style={{ flex: 1, paddingBottom: 10 }}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <TextInput
            placeholder="Message..."
            placeholderTextColor="#CACACA"
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#272727',
              borderRadius: 20,
              padding: 10,
              color: 'white',
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
              }}
            >
              <Octicons name="paper-airplane" size={18} color="#CACACA" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
