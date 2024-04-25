import React, { useState } from 'react'
import { Switch, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import Label from '~/components/ui/label/Label'
import NavBar from '~/components/ui/nav-bar/NavBar'

const tailwindClasses = {
  mainTile: 'm-4 p-4 rounded-lg bg-bb-dark-gray',
  mainTileTitle: 'text-base text-slate-200',
  mainTileItem: 'flex-row',
  navigationListItemLabel: 'flex-auto m-2 self-center text-slate-200',
  navigationListItemChevron: 'self-center text-slate-200',
}

const PrivacyPolicy = () => {
  // The privacy policy was AI generated via a prompt to chatGPT, the link to the prompt is below
  // https://chat.openai.com/share/edbfaba8-f225-4168-8d86-c8263ed9ddc5
  return (
    <SafeAreaView style={{ backgroundColor: '#1e1e1e' }}>
      <NavBar center={'Privacy Policy'} />
      <ScrollView className='bg-[#1e1e1e]'>
        <View className='mx-auto mt-2 flex-row'>
          <Label
            text='Data Collection'
            textColor='#CFCFCF'
            backgroundColor='#48476D'
            fontSize={13}
          />
          <Text> </Text>
          <Label
            text='Third-Party Integration'
            textColor='#CFCFCF'
            backgroundColor='#48476D'
            fontSize={13}
          />
        </View>

        <Text
          className='text-sm text-slate-200'
          style={{ textAlign: 'center', paddingHorizontal: 10 }}
        >
          {'\n'}Effective Date: [4/19/2024]
        </Text>
        <View className={tailwindClasses.mainTile}>
          <Text className='text-base text-slate-200' style={{ paddingHorizontal: 10 }}>
            Welcome to Barbell, your ultimate companion for fitness and workout routines. At
            Barbell, we are committed to protecting your privacy and ensuring the security of your
            personal information. This Privacy Policy outlines how we collect, use, disclose, and
            protect your information when you use our mobile application ("App") and services.
          </Text>
        </View>

        <View className={tailwindClasses.mainTile}>
          <Text className='text-lg text-slate-200' style={{ paddingHorizontal: 10 }}>
            1. Information We Collect
          </Text>

          <Text className='text-base text-slate-200' style={{ paddingHorizontal: 10 }}>
            {'\n'}a. Personal Information: {'\n\t\t\t'} When you create an account with Barbell, we
            may collect personal information such as your name, email address, age, gender, and
            profile picture. Additionally, if you choose to link your Spotify account, we may
            collect information from Spotify's API, including your current listening activity.
            {'\n\n'}b. Workout Data:{'\n\t\t\t'} Barbell collects information about your workout
            activities, including exercise routines, duration, intensity, and progress. This data
            may be shared with friends and the public by default within the App.{'\n\n'}c. Device
            Information:
            {'\n\t\t\t'} We may collect information about your device, including its unique device
            identifier, operating system, and mobile network information.{'\n\n'}d. Location
            Information:{'\n\t\t\t'} With your consent, we may collect and process information about
            your precise or approximate location when you use certain features of the App, such as
            mapping your running routes.
          </Text>
        </View>

        <View className={tailwindClasses.mainTile}>
          <Text className='text-lg text-slate-200' style={{ paddingHorizontal: 10 }}>
            2. How We Use Your Information
          </Text>
          <Text className='text-base text-slate-200' style={{ paddingHorizontal: 10 }}>
            {'\n'}a. Personalization:{'\n\t\t\t'} We use the information collected to personalize
            your experience with the App, including suggesting workout routines, tracking progress,
            and providing relevant content.{'\n\n'}b. Social Sharing:{'\n\t\t\t'} Your workout data
            may be shared with friends and the public within the App. However, you have control over
            the visibility settings of your profile and can adjust the privacy settings accordingly.
            {'\n\n'}c. Integration with Spotify:{'\n\t\t\t'} Integration with Spotify: If you choose
            to link your Spotify account, we may access your Spotify data through Spotify's API to
            display your current listening activity to others on the App. This feature enhances
            social interaction within the fitness community, and you may choose to opt out at any
            time from user settings should you change your mind.{'\n\n'}d. Analytics:
            {'\n\t\t\t'} We may use aggregated and anonymized data for analytical purposes to
            improve the performance and functionality of the App.
          </Text>
        </View>

        <View className={tailwindClasses.mainTile}>
          <Text className='text-lg text-slate-200' style={{ paddingHorizontal: 10 }}>
            3. Information Sharing and Disclosure
          </Text>
          <Text className='text-base text-slate-200' style={{ paddingHorizontal: 10 }}>
            {'\n'}Third-Party Service Providers:{'\n\t\t\t'} We may share your information with
            trusted third-party service providers who assist us in operating the App, such as
            hosting services, analytics providers, and customer support.{'\n\n'}b. Legal Compliance:
            {'\n\t\t\t'} We may disclose your information in response to legal obligations, such as
            complying with subpoenas, court orders, or other legal processes.
          </Text>
        </View>

        <View className={tailwindClasses.mainTile}>
          <Text className='text-lg text-slate-200' style={{ paddingHorizontal: 10 }}>
            4. Data Security
          </Text>
          <Text className='text-base text-slate-200' style={{ paddingHorizontal: 10 }}>
            {'\n\t\t\t'} Barbell takes reasonable measures to protect your information from
            unauthorized access, use, or disclosure. However, no method of transmission over the
            internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute
            security.
          </Text>
        </View>

        <View className={tailwindClasses.mainTile}>
          <Text className='text-lg text-slate-200' style={{ paddingHorizontal: 10 }}>
            5. Your Choices and Rights
          </Text>
          <Text className='text-base text-slate-200' style={{ paddingHorizontal: 10 }}>
            {'\n'}a. Account Settings:{'\n\t\t\t'} You have the option to review and update your
            account information and privacy settings within the App.{'\n\n'}b. Opt-Out:
            {'\n\t\t\t'} You may choose not to share certain information or opt-out of specific
            features or services within the App.{'\n\n'}c. Access and Rectification:{'\n\t\t\t'} You
            have the right to access and correct inaccuracies in your personal information held by
            Barbell.
          </Text>
        </View>

        <View className={tailwindClasses.mainTile}>
          <Text className='text-lg text-slate-200' style={{ paddingHorizontal: 10 }}>
            6. Children's Privacy
          </Text>
          <Text className='text-base text-slate-200' style={{ paddingHorizontal: 10 }}>
            {'\n\t\t\t'}
            Barbell is not intended for individuals under the age of 13. We do not knowingly collect
            personal information from children under 13. If you are a parent or guardian and believe
            that your child has provided us with personal information, please contact us
            immediately.
          </Text>
        </View>

        <View className={tailwindClasses.mainTile}>
          <Text className='text-lg text-slate-200' style={{ paddingHorizontal: 10 }}>
            7. Changes to this Privacy Policy
          </Text>
          <Text className='text-base text-slate-200' style={{ paddingHorizontal: 10 }}>
            {'\n\t\t\t'} We reserve the right to update or modify this Privacy Policy at any time.
            We will notify you of any material changes by posting the updated policy on our website
            or through other communication channels.
          </Text>
        </View>

        <View className={tailwindClasses.mainTile}>
          <Text className='text-2x1 text-slate-200' style={{ paddingHorizontal: 10 }}>
            By using the Barbell App, you consent to the collection, use, and sharing of your
            information as described in this Privacy Policy. We encourage you to review this policy
            periodically for any updates or changes.
          </Text>
        </View>

        <Text className='text-2x1 text-slate-500' style={{ paddingHorizontal: 10 }}>
          Last updated: April 20, 2020
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PrivacyPolicy
