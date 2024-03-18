import { Tabs } from 'expo-router'
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import HomeLogo from '~assets/nav/home.svg'

import colors from '~/styles/colors'

const Layout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Luv',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <HomeLogo width={size} height={size} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="one"
        options={{
          tabBarLabel: 'one',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarLabel: 'two',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default Layout
