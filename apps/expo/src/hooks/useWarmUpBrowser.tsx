import React from 'react'
import { Platform } from 'react-native'
import * as WebBrowser from 'expo-web-browser'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    if (Platform.OS !== 'android') return

    void WebBrowser.warmUpAsync()
    return () => {
      if (Platform.OS !== 'android') return

      void WebBrowser.coolDownAsync()
    }
  }, [])
}
