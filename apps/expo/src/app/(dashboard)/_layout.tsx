import React from 'react'
import { Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { router, Tabs } from 'expo-router'

import CircleMinus from '~assets/svgs/circle-minus.svg'
import CirclePlus from '~assets/svgs/circle-plus.svg'
import HomeLogo from '~assets/svgs/home.svg'
import Profile from '~assets/svgs/profile.svg'

import Button from '~/components/ui/button/button'
import PickerModal from '~/components/ui/picker-modal/picker-modal'
import colors from '~/styles/colors'
import { cn } from '~/utils/cn'

const Layout = () => {
  const AnimatedDot = ({ focused }: { focused: boolean }) => (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className={cn('h-1.5 w-1.5 rounded-full', focused ? 'bg-slate-200' : 'bg-transparent')}
    />
  )

  const [isVisible, setVisible] = React.useState(false)
  const [isPlusActive, setIsPlusActive] = React.useState(false)

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 95,
            backgroundColor: colors.bottomav.black,
            borderTopColor: 'black',
            borderTopWidth: 0,
          },
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        {/*  */}
        <Tabs.Screen
          name='index'
          options={{
            tabBarIcon: ({ focused, size }) => (
              <View className='items-center'>
                <HomeLogo
                  width={size * 1.35}
                  height={size * 1.35}
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
              setIsPlusActive((prev) => !prev)
              setVisible(true)
            },
          }}
          options={{
            tabBarIcon: ({ size }) => (
              <View style={{ marginTop: -30 }}>
                {/* <CirclePlus width={size * 3} height={size * 3} fill={color} /> */}
                {isPlusActive ? (
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
            tabBarIcon: ({ focused, size }) => (
              <View className='items-center'>
                <Profile
                  width={size * 1.45}
                  height={size * 1.45}
                  fill={focused ? `${colors.bottomav.icon}` : 'none'}
                />
                <AnimatedDot focused={focused} />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name='create-new-workout'
          options={{
            tabBarButton: () => null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name='start-saved-workout'
          options={{
            tabBarButton: () => null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
      </Tabs>

      <PickerModal
        title='Would you like to?'
        isVisible={isVisible}
        onBackdropPress={() => {
          setVisible(false)
          setIsPlusActive(false)
        }}
      >
        <View className='flex gap-y-4 px-4 pb-4'>
          <Button
            color='dark'
            onPress={() => {
              router.push('(dashboard)/create-new-workout')
              setVisible(false)
              setIsPlusActive(false)
            }}
          >
            <Text className='py-2 text-center text-lg font-semibold text-white'>
              Create a new workout
            </Text>
          </Button>
          <Button
            color='dark'
            onPress={() => {
              router.push('(dashboard)/start-saved-workout')
              setVisible(false)
              setIsPlusActive(false)
            }}
          >
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
