<<<<<<< Updated upstream
import { StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import Body from "react-native-body-highlighter";
=======
import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import Body from "react-native-body-highlighter";
import ToggleSwitch from "~/components/toggle/Toggle";
import FrontBackSwitch from "~/components/toggle/FrontBackSwitch";






>>>>>>> Stashed changes

export default function MuscleGroup() {
  const [bodyPartSelected, setBodyPartSelected] = useState({/*
    slug: "biceps",
    intensity: 2,*/
  });
  const [isBackSideEnabled, setIsBackSideEnabled] = useState(false);
  const [isMale, setIsMale] = useState(true);
  const toggleSwitch = () =>
    setIsBackSideEnabled((previousState) => !previousState);

  const toggleGenderSwitch = () => setIsMale((previousState) => !previousState);

<<<<<<< Updated upstream
=======
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  const vmin70 = Math.min(screenWidth, screenHeight) * 0.7

>>>>>>> Stashed changes
  return (
    <View style={styles.container}>
      <Body
        data={[/*
          { slug: "chest", intensity: 1 },
          { slug: "abs", intensity: 2 },
          { slug: "upper-back", intensity: 1 },
          { slug: "lower-back", intensity: 2 },*/
          bodyPartSelected,
        ]}
        onBodyPartPress={(e) =>
<<<<<<< Updated upstream
        //{if (e.slug != "abs")
          setBodyPartSelected({ slug: e.slug, intensity: 2 })
        //}
=======
          //{if (e.slug != "abs")
          setBodyPartSelected({ slug: e.slug, intensity: 2 })
          //}
>>>>>>> Stashed changes
        }
        gender={isMale ? "male" : "female"}
        side={isBackSideEnabled ? "back" : "front"}
        scale={1.7}
      />

      <View>
        <Text style={{ color: '#CACACA', fontSize: 20 }}>
          Muscle Group Selected:  {bodyPartSelected.slug}
        </Text>
      </View>

      <View style={styles.switchContainer}>
        <View style={styles.switch}>
<<<<<<< Updated upstream
          <Text style={{ color: '#CACACA', fontSize: 20 }}>Side ({isBackSideEnabled ? "Back" : "Front"})</Text>
          <Switch onValueChange={toggleSwitch} value={isBackSideEnabled} />
        </View>
        <View style={styles.switch}>
          <Text style={{ color: '#CACACA', fontSize: 20 }}>Gender ({isMale ? "Male" : "Female"})</Text>
          <Switch onValueChange={toggleGenderSwitch} value={isMale} />
=======
          <Text style={{ color: '#CACACA', fontSize: 20 }}>Gender ({isMale ? "Male" : "Female"})</Text>
          <ToggleSwitch onValueChange={toggleGenderSwitch} value={isMale} />
        </View>
      </View>

      <View style={styles.switchContainer}>
        <View style={styles.switch}>
          <FrontBackSwitch
            onValueChange={toggleSwitch}
            value={isBackSideEnabled}
            label={"TEST"}
          />
>>>>>>> Stashed changes
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1B1B",
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    gap: 30,
  },
  switch: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});