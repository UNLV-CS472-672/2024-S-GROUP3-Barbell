import React, { useState } from 'react'
import { Switch, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import colors from '~/styles/colors'

const tailwindClasses = {
  mainTile: 'm-4 p-4 rounded-lg bg-bb-dark-gray',
  mainTileTitle: 'text-2xl text-slate-200',
  mainTileItem: 'flex-row',
  navigationListItemLabel: 'flex-auto m-2 self-center text-slate-200',
  navigationListItemChevron: 'self-center text-slate-200',
}

const PrivacyPolicy = () => {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const privacyToggleSwitch = async () => {}
  // The privacy policy was AI generated via a prompt to chatGPT, the link to the prompt is below
  // https://chat.openai.com/share/edbfaba8-f225-4168-8d86-c8263ed9ddc5
  return (
    <SafeAreaView
      className='bg-bb-slate-100 flex-1'
      style={{ backgroundColor: '#1e1e1e', flex: 1 }}
    >
      <ScrollView>
        <View>
          <Text
            className='text-2xl text-slate-200'
            style={{ fontSize: 30, textAlign: 'center', paddingHorizontal: 10 }}
          >
            Privacy Policy
          </Text>
          <Text
            className='text-2xl text-slate-200'
            style={{ fontSize: 15, textAlign: 'center', paddingHorizontal: 10 }}
          >
            {'\n'}Effective Date: [4/19/2024]{'\n'}
          </Text>
          <Text className='text-2xl text-slate-200' style={{ paddingHorizontal: 10 }}>
            Welcome to Barbell, your ultimate companion for fitness and workout routines. At
            Barbell, we are committed to protecting your privacy and ensuring the security of your
            personal information. This Privacy Policy outlines how we collect, use, disclose, and
            protect your information when you use our mobile application ("App") and services.
            {'\n\n'}
          </Text>

          <Text className='text-2xl text-slate-200' style={{ fontSize: 25, paddingHorizontal: 10 }}>
            Information We Collect
          </Text>
          <Text className='text-2xl text-slate-200' style={{ paddingHorizontal: 10 }}>
            {'\n'}a. Personal Information: {'\n'}When you create an account with Barbell, we may
            collect personal information such as your name, email address, age, gender, and profile
            picture. Additionally, if you choose to link your Spotify account, we may collect
            information from Spotify's API, including your current listening activity.{'\n\n'}b.
            Workout Data:{'\n'} Barbell collects information about your workout activities,
            including exercise routines, duration, intensity, and progress. This data may be shared
            with friends and the public by default within the App.{'\n\n'}c. Device Information:
            {'\n'} We may collect information about your device, including its unique device
            identifier, operating system, and mobile network information.{'\n\n'}d. Location
            Information:{'\n'} With your consent, we may collect and process information about your
            precise or approximate location when you use certain features of the App, such as
            mapping your running routes.{'\n'}
          </Text>

          <Text className='text-2xl text-slate-200' style={{ fontSize: 25, paddingHorizontal: 10 }}>
            How We Use Your Information:
          </Text>
          <Text className='text-2xl text-slate-200' style={{ paddingHorizontal: 10 }}>
            a. Personalization: We use the information collected to personalize your experience with
            the App, including suggesting workout routines, tracking progress, and providing
            relevant content.b. Social Sharing: Your workout data may be shared with friends and the
            public within the App. However, you have control over the visibility settings of your
            profile and can adjust the privacy settings accordingly.c. Integration with Spotify: If
            you choose to link your Spotify account, we may access your Spotify data through
            Spotify's API to display your current listening activity to others on the App. This
            feature enhances social interaction within the fitness community.d. Analytics: We may
            use aggregated and anonymized data for analytical purposes to improve the performance
            and functionality of the App.
          </Text>

          <Text
            className='text-2xl text-slate-200'
            style={{ fontSize: 25, paddingHorizontal: 10 }}
          ></Text>
          <Text className='text-2xl text-slate-200' style={{ paddingHorizontal: 10 }}></Text>

          <Text
            className='text-2xl text-slate-200'
            style={{ fontSize: 25, paddingHorizontal: 10 }}
          ></Text>
          <Text className='text-2xl text-slate-200' style={{ paddingHorizontal: 10 }}></Text>

          <Text
            className='text-2xl text-slate-200'
            style={{ fontSize: 25, paddingHorizontal: 10 }}
          ></Text>
          <Text className='text-2xl text-slate-200' style={{ paddingHorizontal: 10 }}></Text>

          <Text
            className='text-2xl text-slate-200'
            style={{ fontSize: 25, paddingHorizontal: 10 }}
          ></Text>
          <Text className='text-2xl text-slate-200' style={{ paddingHorizontal: 10 }}></Text>

          <Text
            className='text-2xl text-slate-200'
            style={{ fontSize: 25, paddingHorizontal: 10 }}
          ></Text>
          <Text className='text-2xl text-slate-200' style={{ paddingHorizontal: 10 }}></Text>

          <Text
            className='text-2xl text-slate-200'
            style={{ fontSize: 25, paddingHorizontal: 10 }}
          ></Text>
          <Text className='text-2xl text-slate-200' style={{ paddingHorizontal: 10 }}></Text>

          <View
            style={{ flexDirection: 'row', alignItems: 'center' }}
            className={tailwindClasses.mainTile}
          >
            <Text className='text-2xl text-slate-200' style={{ fontSize: 18 }}>
              {' '}
              Accept the terms of the Privacy Policy
            </Text>
            <View style={{ padding: 0 }}>
              <Switch
                onChange={privacyToggleSwitch}
                onValueChange={toggleSwitch}
                value={isEnabled}
                trackColor={{ true: colors.purple }}
                thumbColor={isEnabled ? colors.purple : colors.silver}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PrivacyPolicy
