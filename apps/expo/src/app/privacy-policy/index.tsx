import React, { useState} from "react";
import { Switch, Text, View } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";



const PrivacyPolicy = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // Remember what Marcos said about border and padding (and maybe margin?)
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text style={{fontSize:30}}>Privacy Policy</Text>
                    <Text> We love seeing your data</Text>
                    <Text>At Barbell, we are passionate about helping you achieve your fitness goals, but we are equally passionate about collecting your data. Our privacy policy is designed to ensure that we gather as much information about you as possible. </Text>
                    <Text>When you use our app, we track your every move, both inside and outside the gym. We love to know your location, your workout routines, and even your eating habits.</Text>
                    <Text>By agreeing to our privacy policy, you are giving us permission to use your data in any way we see fit, including sharing it with third parties who may or may not have your best interests at heart.</Text>
                    <Text>But don't worry, we promise to keep your data safe and secure, just like we promise to keep your muscles growing. So go ahead and download Barbell today, and let us collect all the data we need to help you reach your fitness goals!</Text>
                    <Text> Please let us track you 🥺</Text>
                    <Switch
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PrivacyPolicy