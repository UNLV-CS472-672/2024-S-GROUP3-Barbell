import React, { useRef } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import CirclePlus from '~assets/svgs/circle-plus.svg'
import HomeLogo from '~assets/svgs/home.svg'
import Profile from '~assets/svgs/profile.svg'

import type { CustomBottomSheetModalRef } from '~/components/custom-bottom-sheet-modal'
import CustomBottomSheetModal from '~/components/custom-bottom-sheet-modal'
import colors from '~/styles/colors'

const Layout = () => {
  const bottomSheetRef = useRef<CustomBottomSheetModalRef>(null)

  const handlePresentModal = () => {
    bottomSheetRef.current?.present()
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarStyle: {
            height: 80,
            backgroundColor: '#272727',
          },
          tabBarIconStyle: { marginHorizontal: 10, marginBottom: 2 },
          tabBarShowLabel: false,
        }}
      >
        {/*  */}
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

        {/*  */}
        <Tabs.Screen
          name="one"
          listeners={{
            tabPress: (e) => {
              e.preventDefault()
              handlePresentModal()
            },
          }}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <View style={{ marginTop: -30 }}>
                <CirclePlus width={size * 3} height={size * 3} fill={color} />
              </View>
            ),
          }}
        />

        {/*  */}
        <Tabs.Screen
          name="two"
          options={{
            tabBarLabel: 'two',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Profile width={size * 1.4} height={size * 1.4} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Bottom Sheet Modal */}
      <CustomBottomSheetModal
        ref={bottomSheetRef}
        customSnapPoints={['30%', '10%']}
        startIndex={0}
        renderBackdrop
      >
        {/* Your modal content here */}
        <Text>Example Content</Text>
      </CustomBottomSheetModal>
    </>
  )
}

export default Layout
