import React from 'react'
import { Tabs } from 'expo-router'

const Layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 0,
          },
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        {/*  */}
        <Tabs.Screen name='index' />

        {/* create */}

        {/* existing */}
      </Tabs>
    </>
  )
}

export default Layout
