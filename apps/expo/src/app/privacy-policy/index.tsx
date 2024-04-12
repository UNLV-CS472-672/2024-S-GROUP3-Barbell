import React, { useState} from "react";
import { Switch, Text, View } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from '~/styles/colors'


const tailwindClasses = {
    mainTile: 'm-4 p-4 rounded-lg bg-bb-dark-gray',
    mainTileTitle: 'text-2xl text-slate-200',
    mainTileItem: 'flex-row',
    navigationListItemLabel: 'flex-auto m-2 self-center text-slate-200',
    navigationListItemChevron: 'self-center text-slate-200',
}


const PrivacyPolicy = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const privacyToggleSwitch = async() =>{

    }
    // Remember what Marcos said about border and padding (and maybe margin?)
    return (
        <SafeAreaView className="bg-bb-slate-100 flex-1" style={{ backgroundColor: '#1e1e1e', flex: 1 }}>
            <ScrollView>
                <View>
                    <Text className="text-2xl text-slate-200" style={{fontSize:30, textAlign: 'center'}}>Privacy Policy</Text>
                    <Text className="text-2xl text-slate-200" style={{fontSize:25}}> We love having your data!! 😊</Text>
                    <Text className="text-2xl text-slate-200">At Barbell, we are passionate about helping you achieve your fitness goals, but we are equally passionate about collecting your data. Our privacy policy is designed to ensure that we gather as much information about you as possible. </Text>
                    <Text className="text-2xl text-slate-200">When you use our app, we track your every move, both inside and outside the gym. We love to know your location, your workout routines, and even your eating habits.</Text>
                    <Text className="text-2xl text-slate-200">By agreeing to our privacy policy, you are giving us permission to use your data in any way we see fit, including sharing it with third parties who may or may not have your best interests at heart.</Text>
                    <Text className="text-2xl text-slate-200">But don't worry, we promise to keep your data safe and secure, just like we promise to keep your muscles growing. So go ahead and download Barbell today, and let us collect all the data we need to help you reach your fitness goals!</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} className={tailwindClasses.mainTile}>
                        <Text className="text-2xl text-slate-200"> Please let us track you 🥺</Text>
                        <View style={{ padding: 0, }}>
                            <Switch
                                onChange={privacyToggleSwitch}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                trackColor={{ true: colors.purple }}
                                thumbColor={isEnabled? colors.purple: colors.silver}
                            />
                        </View>
                    </View>
                </View>

                




            </ScrollView>
        </SafeAreaView>
    )
}

export default PrivacyPolicy