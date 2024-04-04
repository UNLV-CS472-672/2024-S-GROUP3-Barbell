import React from 'react'
import { View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Tabs } from 'expo-router'

import { cn } from '^/packages/ui/src/cn'
import CircleMinus from '~assets/svgs/circle-minus.svg'
import CirclePlus from '~assets/svgs/circle-plus.svg'
import HomeLogo from '~assets/svgs/home.svg'
import Profile from '~assets/svgs/profile.svg'

import type { CustomBottomSheetModalRef } from '~/components/custom-bottom-sheet-modal'
import CustomBottomSheetModal from '~/components/custom-bottom-sheet-modal'
import Button from '~/components/ui/button/button'
import { DefaultHeader } from '~/layouts/headers/default'
import colors from '~/styles/colors'

const Layout = () => {
  const AnimatedDot = ({ focused }: { focused: boolean }) => (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className={cn('h-1.5 w-1.5 rounded-full', focused ? 'bg-white' : 'bg-transparent')}
    />
  )

  const bottomSheetRef = React.useRef<CustomBottomSheetModalRef>(null)
  const handlePresentModalPress = () => bottomSheetRef.current?.present()

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
              handlePresentModalPress()
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
                <Profile width={size * 1.25} height={size * 1.25} fill={focused ? `${colors.bottomav.icon}` : 'none'} />
                <AnimatedDot focused={focused} />
              </View>
            ),
          }}
        />
      </Tabs>

      <CustomBottomSheetModal ref={bottomSheetRef} customSnapPoints={['30%']} startIndex={0} renderBackdrop enablePanDownToClose>
        <View className="align-center bg-background flex-1 items-center py-10">
          <Button color="trap" size="full" value="Start Saved Workout" className="mb-5" testID="button-test"></Button>
          <Button color="trap" size="full" value="Create New Workout" testID="button-test-2"></Button>
        </View>
      </CustomBottomSheetModal>
    </>
  )
}

export default Layout
