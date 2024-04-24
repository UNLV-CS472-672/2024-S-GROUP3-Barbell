import React from 'react'
import { Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { router, Tabs } from 'expo-router'

import { DashboardHeader } from '^/apps/expo/src/layouts/headers/dashboard-header'
import CircleMinus from '~assets/svgs/circle-minus.svg'
import CirclePlus from '~assets/svgs/circle-plus.svg'
import HomeLogo from '~assets/svgs/home.svg'
import Profile from '~assets/svgs/profile.svg'

import Button from '~/components/ui/button/button'
// import type { CustomBottomSheetModalRef } from '~/components/ui/custom-bottom-sheet-modal'
// import Button from '~/components/ui/button/button'
// import CustomBottomSheetModal from '~/components/ui/custom-bottom-sheet-modal'
import PickerModal from '~/components/ui/picker-modal/picker-modal'
import colors from '~/styles/colors'
import { cn } from '~/utils/cn'

const Layout = () => {
  const AnimatedDot = ({ focused }: { focused: boolean }) => (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className={cn('h-1.5 w-1.5 rounded-full', focused ? 'bg-white' : 'bg-transparent')}
    />
  )

  // const bottomSheetRef = React.useRef<CustomBottomSheetModalRef>(null)
  // const handlePresentModalPress = () => bottomSheetRef.current?.present()

  /* states */
  const [isVisible, setVisible] = React.useState(false)

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
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIconStyle: { paddingHorizontal: 10 },
        }}
      >
        {/*  */}
        <Tabs.Screen
          name='index'
          options={{
            // header: () => <DashboardHeader />,
            tabBarIcon: ({ focused, size }) => (
              <View className='items-center'>
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
          name='unused'
          redirect={false}
          listeners={{
            tabPress: (e) => {
              e.preventDefault()
              // handlePresentModalPress()
              setVisible(true)
            },
          }}
          options={{
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

        {/* Account Settings */}
        <Tabs.Screen
          name='account-settings'
          options={{
            // header: () => <DashboardHeader />,
            tabBarIcon: ({ focused, size }) => (
              <View className='items-center'>
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

      {/* <CustomBottomSheetModal
        ref={bottomSheetRef}
        customSnapPoints={['30%']}
        startIndex={0}
        renderBackdrop
        enablePanDownToClose
      >
        <View className='align-center flex-1 items-center bg-background py-10'>
          <Button
            color='trap'
            size='full'
            value='Start Saved Workout'
            className='mb-5'
            testID='button-test'
          ></Button>
          <Button
            color='trap'
            size='full'
            value='Create New Workout'
            testID='button-test-2'
          ></Button>
        </View>
      </CustomBottomSheetModal> */}

      <PickerModal
        title='Would you like to?'
        isVisible={isVisible}
        onBackdropPress={() => {
          setVisible(false)
        }}
      >
        <View className='flex gap-y-4 px-4 pb-4'>
          <Button
            color='dark'
            onPress={() => {
              router.push('(workout)/')
              setVisible(false)
            }}
          >
            <Text className='py-2 text-center text-lg font-semibold text-white'>
              Create a new workout
            </Text>
          </Button>
          <Button color='dark'>
            <Text className='py-2 text-center text-lg font-semibold text-white'>
              Start an existing workout
            </Text>
          </Button>
        </View>
      </PickerModal>
    </>
  )
}

export default Layout
