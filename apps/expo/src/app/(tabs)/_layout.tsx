import React, { useRef } from 'react'
import { Button, Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import HomeLogo from '~assets/nav/home.svg'

import CustomBottomSheetModal, {
  CustomBottomSheetModalRef,
} from '~/components/custom-bottom-sheet-modal'
import colors from '~/styles/colors'

const Layout = () => {
  const bottomSheetRef = useRef<CustomBottomSheetModalRef>(null)

  const handlePresentModal = () => {
    bottomSheetRef.current?.present()
  }

  return (
    <View style={{ flex: 1 }}>
      <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Luv',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <HomeLogo width={size} height={size} fill={color} />
            ),
          }}
        />
        {/* Custom Tab Button */}
        <Tabs.Screen
          name="one"
          // component={() => <View />} // A placeholder component, might be empty since we're not navigating
          listeners={{
            tabPress: (e) => {
              e.preventDefault() // Prevent the default action (navigation)
              handlePresentModal() // Open the bottom sheet instead
            },
          }}
          options={{
            tabBarLabel: 'one',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            tabBarLabel: 'two',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons
                name="person-circle-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>

      {/* Bottom Sheet Modal */}
      <CustomBottomSheetModal
        ref={bottomSheetRef}
        customSnapPoints={['30%', '93%']}
        startIndex={1}
        renderBackdrop
      >
        {/* Your modal content here */}
        <Text>Example Content</Text>
      </CustomBottomSheetModal>
    </View>
  )
}

export default Layout
