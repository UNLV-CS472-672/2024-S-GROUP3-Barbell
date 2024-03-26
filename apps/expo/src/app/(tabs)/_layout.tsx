import React, { useRef } from 'react'
import { Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Tabs } from 'expo-router'
import CirclePlus from '~assets/svgs/circle-plus.svg'
import HomeLogo from '~assets/svgs/home.svg'
import Profile from '~assets/svgs/profile.svg'

import CustomBottomSheetModal, {
  CustomBottomSheetModalRef,
} from '~/components/custom-bottom-sheet-modal'
import colors from '~/styles/colors'

const Layout = () => {
  const bottomSheetRef = useRef<CustomBottomSheetModalRef>(null)

  const handlePresentModal = () => {
    bottomSheetRef.current?.present()
  }

  // for animated dot
  const AnimatedDot = () => (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className="mt-2 h-[5px] w-[5px] rounded-full bg-white"
    />
  )

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarStyle: {
            height: 85,
            backgroundColor: colors.background,
          },
          tabBarShowLabel: false,
          tabBarIconStyle: { paddingHorizontal: 10 },
        }}
      >
        {/*  */}
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <View className="items-center">
                <HomeLogo
                  width={size * 1.25}
                  height={size * 1.25}
                  fill={focused ? '#CACACA' : 'none'}
                />
                {focused && <AnimatedDot />}
              </View>
            ),
          }}
        />
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
        <Tabs.Screen
          name="two"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <View className="items-center">
                <Profile
                  width={size * 1.25}
                  height={size * 1.25}
                  fill={focused ? '#CACACA' : 'none'}
                />
                {focused && <AnimatedDot />}
              </View>
            ),
          }}
        />
      </Tabs>

      {/* FIXME: */}
      <CustomBottomSheetModal
        ref={bottomSheetRef}
        customSnapPoints={['30%', '10%']}
        startIndex={0}
        renderBackdrop
        enablePanDownToClose
      >
        <Text>Example Content</Text>
      </CustomBottomSheetModal>
    </>
  )
}

export default Layout
