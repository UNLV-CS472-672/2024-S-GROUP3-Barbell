import React, { useRef } from 'react'
import { View, Text } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Tabs } from 'expo-router'
import { cn } from '@/packages/ui/src/cn'
import BottomSheet from '@gorhom/bottom-sheet'
import CirclePlus from '~assets/svgs/circle-plus.svg'
import HomeLogo from '~assets/svgs/home.svg'
import Profile from '~assets/svgs/profile.svg'

import type { CustomBottomSheetModalRef } from '~/components/custom-bottom-sheet-modal'
import CustomBottomSheetModal from '~/components/custom-bottom-sheet-modal'
import CustomBottomSheet from '~/components/ui/bottom-sheet'
import colors from '~/styles/colors'

const Layout = () => {
  // const bottomSheetRef = useRef<CustomBottomSheetModalRef>(null)

  // const handlePresentModal = () => {
  //   bottomSheetRef.current?.present()
  // }

  // for animated dot
  const AnimatedDot = ({ focused }: { focused: boolean }) => (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className={cn(
        'h-1.5 w-1.5 rounded-full',
        focused ? 'bg-white' : 'bg-transparent',
      )}
    />
  )

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarStyle: {
            height: 85,
            backgroundColor: colors.bottomav.nav,
            borderColor: colors.background,
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
                  fill={focused ? `${colors.bottomav.icon}` : 'none'}
                />
                <AnimatedDot focused={focused} />
              </View>
            ),
          }}
        />

        {/* PLUS CIRCLE */}
        <Tabs.Screen
          name="one"
          redirect={false}
          listeners={{
            tabPress: (e) => {
              // e.preventDefault()
              // handlePresentModal()
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
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <View className="items-center">
                <Profile
                  width={size * 1.25}
                  height={size * 1.25}
                  fill={focused ? `${colors.bottomav.icon}` : 'none'}
                />
                <AnimatedDot focused={focused} />
              </View>
            ),
          }}
        />
      </Tabs>


      {/* FIXME: */}
      {/* <CustomBottomSheetModal
        ref={bottomSheetRef}
        customSnapPoints={['30%', '10%']}
        startIndex={0}
        renderBackdrop
        enablePanDownToClose
      >
        <Text>Example Content</Text>
      </CustomBottomSheetModal> */}
    </>
  )
}

export default Layout
