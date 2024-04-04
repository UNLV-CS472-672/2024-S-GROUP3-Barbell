import React from 'react'
import { View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Tabs } from 'expo-router'

import { cn } from '^/packages/ui/src/cn'
import CircleMinus from '~assets/svgs/circle-minus.svg'
import CirclePlus from '~assets/svgs/circle-plus.svg'
import HomeLogo from '~assets/svgs/home.svg'
import Profile from '~assets/svgs/profile.svg'

import { useTBottomSheet } from '~/hooks/useTBottomSheet'
import { DefaultHeader } from '~/layouts/headers/default'
import colors from '~/styles/colors'
import BottomSheetContext from '../../context/bottom-sheet.context'

const Layout = () => {
  const AnimatedDot = ({ focused }: { focused: boolean }) => (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className={cn('h-1.5 w-1.5 rounded-full', focused ? 'bg-white' : 'bg-transparent')}
    />
  )

  const { isOpen, openBottomSheet, closeBottomSheet, bottomSheetRef } = useTBottomSheet()
  // const bottomSheetRef = React.useRef(null);
  // console.log('bottomSheetRef', bottomSheetRef)

  return (
    <>
      <BottomSheetContext.Provider value={{ bottomSheetRef, closeBottomSheet, openBottomSheet }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarStyle: {
              height: 85,
              backgroundColor: colors.bottomav.nav,
              borderColor: colors.background,
            },
            // headerShown: false,
            tabBarShowLabel: false,
            tabBarIconStyle: { paddingHorizontal: 10 },
          }}
        >
          {/*  */}
          <Tabs.Screen
            name="index"
            options={{
              header: () => (
                <DefaultHeader
                  onCategoryChanged={() => {
                    'Home'
                  }}
                />
              ),
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
                // e.preventDefault();
                console.log('tabPress', bottomSheetRef)
                if (!isOpen) {
                  openBottomSheet()
                } else {
                  closeBottomSheet()
                }
              },
            }}
            options={{
              // header: () => (
              //   <DefaultHeader
              //     onCategoryChanged={() => {
              //       'New Workout'
              //     }}
              //   />
              // ),
              tabBarIcon: ({ size, focused }) => (
                <View style={{ marginTop: -30 }}>
                  {/* <CirclePlus width={size * 3} height={size * 3} fill={color} /> */}
                  {focused ? (
                    <CircleMinus width={size * 3} height={size * 3} fill={colors.primary} />
                  ) : (
                    <CirclePlus width={size * 3} height={size * 3} fill={colors.bottomav.icon} />
                  )}
                </View>
              ),
            }}
          />

          {/*  */}
          <Tabs.Screen
            name="two"
            options={{
              header: () => (
                <DefaultHeader
                  onCategoryChanged={() => {
                    'Settings'
                  }}
                />
              ),
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
      </BottomSheetContext.Provider>
    </>
  )
}

export default Layout
