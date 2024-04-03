import { StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import Body from "react-native-body-highlighter";

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
        //{if (e.slug != "abs")
          setBodyPartSelected({ slug: e.slug, intensity: 2 })
        //}
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
          <Text style={{ color: '#CACACA', fontSize: 20 }}>Side ({isBackSideEnabled ? "Back" : "Front"})</Text>
          <Switch onValueChange={toggleSwitch} value={isBackSideEnabled} />
        </View>
        <View style={styles.switch}>
          <Text style={{ color: '#CACACA', fontSize: 20 }}>Gender ({isMale ? "Male" : "Female"})</Text>
          <Switch onValueChange={toggleGenderSwitch} value={isMale} />
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