import React from 'react'
import { Tabs } from 'expo-router'

const Layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        }}
      ></Tabs>
    </>
  )
}

export default Layout
