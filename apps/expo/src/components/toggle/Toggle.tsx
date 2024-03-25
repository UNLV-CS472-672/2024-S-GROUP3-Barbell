import React, { useState } from 'react';
import { Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Toggle() {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    return (
        <SafeAreaView style={{backgroundColor: "#1C1B1B", flex: 1}}>
            <View className="items-center" >
                <Switch
                    trackColor={{ false: "#CACACA", true: "#67D2A5" }}
                    thumbColor={isEnabled ? "#CACACA" : "#CACACA"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </SafeAreaView>
    );
};

