import React from 'react'
import { Tabs } from 'expo-router'

const Layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            display: 'none',
          },
          headerShown: false,
          tabBarShowLabel: false,
          headerStyle: {
            display: 'none',
          },
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
