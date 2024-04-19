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
                    <Text className="text-2xl text-slate-200" style={{fontSize:15, textAlign: 'center'}}>Effective Date: [4/19/2024]</Text>
                    <Text className="text-2xl text-slate-200">Welcome to Barbell, your ultimate companion for fitness and workout routines. At Barbell, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use our mobile application ("App") and services.</Text>
                    <Text className="text-2xl text-slate-200" style={{fontSize: 25}}>Information We Collect:</Text>
                    <Text className="text-2xl text-slate-200"></Text>
                    <Text className="text-2xl text-slate-200"></Text>
                    <Text className="text-2xl text-slate-200"></Text>
                    <Text className="text-2xl text-slate-200"></Text>
                    <Text className="text-2xl text-slate-200"></Text>
                    <Text className="text-2xl text-slate-200"></Text>
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