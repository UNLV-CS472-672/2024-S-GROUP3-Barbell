import React from 'react'
import { Tabs } from 'expo-router'

import { InboxHeader } from '~/layouts/headers/inbox-headers'

const Layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 0,
          },
          // headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        {/* switch nav or inbox, notif, dm and so forth */}
        <Tabs.Screen
          name='index'
          options={{
            header: () => <InboxHeader title='Notifications' key={'notifications'} />,
          }}
        />

        <Tabs.Screen
          name='direct-messages'
          options={{
            header: () => <InboxHeader title='Direct Messages' key={'dms'} />,
          }}
        />

        <Tabs.Screen
          name='group-messages'
          options={{
            header: () => <InboxHeader title='Group Messages' key={'groups'} />,
          }}
        />
      </Tabs>
    </>
  )
}

export default Layout
