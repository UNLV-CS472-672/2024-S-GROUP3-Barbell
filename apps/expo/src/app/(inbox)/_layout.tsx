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
        {/* switch nav or inbox, notif, dm and so forth */}
        <Tabs.Screen name='index' />

      </Tabs>
    </>
  )
}

export default Layout
