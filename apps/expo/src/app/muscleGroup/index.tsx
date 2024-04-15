import React, { useState } from 'react'
import { Dimensions, Image, Text, View, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import Body from 'react-native-body-highlighter'
import Toggle from '~/components/toggle/Toggle'
import FrontBackSwitch from '~/components/muscleGroup/FrontBackSwitch'
// import tailwind from '@/tooling/tailwind'

export type muscleSelectDev =
  | "abs"
  | "adductors"
  | "ankles"
  | "biceps"
  | "calves"
  | "chest"
  | "deltoids"
  | "feet"
  | "forearm"
  | "gluteal"
  | "hamstring"
  | "hands"
  | "hair"
  | "head"
  | "knees"
  | "lower-back"
  | "neck"
  | "obliques"
  | "quadriceps"
  | "tibialis"
  | "trapezius"
  | "triceps"
  | "upper-back";

export type muscleSelectUser =
  | "Shoulder"
  | "Chest"
  | "Arm"
  | "Core"
  | "Upper leg"
  | "Lower leg"
  | "Upper back"
  | "Lat"
  | "Lower back"
  | "Glute";

export default function NewWorkoutMuscleGroup() {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  // <Svg viewBox={viewBox} height={400 * scale} width={200 * scale}>
  // Dynamically resize by reversing the work done in react-native-body-highlighter
  const maxScale = (screenHeight-64) / (400+96)
  // const maxScale = (screenHeight-96) / (400+64)

  const [bodyPartSelected, setBodyPartSelected] = useState({/*
    slug: "biceps",
    intensity: 2,*/
  }
  )
  const [isBackSideEnabled, setIsBackSideEnabled] = useState(false)
  const [isMale, setIsMale] = useState(true)
  const toggleSwitch = () =>
    setIsBackSideEnabled((previousState) => !previousState)

  const toggleGenderSwitch = () => setIsMale((previousState) => !previousState)

  //let tmp = "";
  let sameGroup = {};
  const [tmp1, setTmp1] = useState({})
  const [userSelection, setUserSelection] = useState("");

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <View className="flex flex-row justify-between px-5">
        <Ionicons
          onPress={() => router.back()}
          name="chevron-back"
          size={24}
          color="#CACACA"
        />
        <Text style={{ color: '#CACACA', fontSize: 20 }}>Select a muscle group</Text>
        <Text></Text>
      </View>

      <View className="flex-1"
            style = {{alignItems: "center", justifyContent: "center",
              position: "relative", bottom: 45}}>
        <Body

          onBodyPartPress={(e) =>
            {
              switch (e.slug) {
                case "deltoids":
                  // Shoulder
                  setBodyPartSelected({ slug: e.slug, intensity: 2 })
                  setUserSelection("Shoulder");

                  // setTmp1({ slug: "chest", intensity: 2 })
                  // sameGroup = bodyPartSelected;
                  // sameGroup.slug = "chest";
                  break;

                case "chest":
                  // Chest
                  setBodyPartSelected({ slug: e.slug, intensity: 2 })
                  setUserSelection("Chest")
                  break;

                case "biceps":
                case "triceps":
                case "forearm":
                  // Arm
                  setBodyPartSelected({ slug: e.slug, intensity: 2 })
                  setUserSelection("Arm")
                  break;

                case "abs":
                case "obliques":
                  // Core
                  setBodyPartSelected({ slug: e.slug, intensity: 2 })
                  setUserSelection("Core")
                  break;

                case "quadriceps":
                case "adductors":
                case "hamstring":
                  // Upper leg
                  setBodyPartSelected({ slug: e.slug, intensity: 2 })
                  setUserSelection("Upper leg")
                  break;

                case "tibialis":
                case "calves":
                  // Lower leg
                  setBodyPartSelected({ slug: e.slug, intensity: 2 })
                  setUserSelection("Lower leg")
                  break;

                case "trapezius":
                  // Conflit with upper back
                  // Go with the figma design
                  // Upper back
                  setBodyPartSelected({ slug: e.slug, intensity: 2 })
                  setUserSelection("Upper back")
                  break;

                case "upper-back":
                  // Lat
                  setBodyPartSelected({ slug: e.slug, intensity: 2 })
                  setUserSelection("Lat")
                  break;

                case "lower-back":
                  // Lower back
                  setBodyPartSelected({ slug: e.slug, intensity: 2 })
                  setUserSelection("Lower back")
                  break;

                case "gluteal":
                  // Glute
                  setBodyPartSelected({ slug: e.slug, intensity: 2 })
                  setUserSelection("Glute")
                  break;

                default:
                  // Do Nothing
                  // Not supported
                  setUserSelection("")
                  break;
              }

              // Get out
              // setBodyPartSelected({ slug: e.slug, intensity: 2 })
            }
          }


          data={
          [
            /*
          { slug: "chest", intensity: 1 },
          { slug: "abs", intensity: 2 },
          { slug: "upper-back", intensity: 1 },
          { slug: "lower-back", intensity: 2 },*/
            // tmp1,
            bodyPartSelected
          ]}

          gender={isMale ? "male" : "female"}
          side={isBackSideEnabled ? "back" : "front"}
          scale={maxScale}
        />
      </View>


      {/* Bottom section */}
        <View className="flex flex-row"
              style={{gap: 0.1 * screenWidth, position: "absolute", bottom: 11}}>

          <View className="flex-1"
                style={{alignItems: "center", justifyContent: "center"}}>

            <View className={"p-1"}>
              <Text style={{ color: '#CACACA', fontSize: 20 }}>
                Muscle Group Selected: {userSelection}
              </Text>
            </View>

            <View className={"flex flex-row p-1"}>
              <Text style={{ color: '#CACACA', fontSize: 20 }}>
                Currently Selecting: {isMale ? "Male  " : "Female  "}
              </Text>

              <Toggle onValueChange={toggleGenderSwitch} value={isMale} />
            </View>

            {/*<Text style={{ color: '#CACACA', fontSize: 20 }}>
              {maxScale}
            </Text>*/}

            <FrontBackSwitch
              onValueChange={toggleSwitch}
              value={isBackSideEnabled}
              label={""}
            />

          </View>
        </View>

    </SafeAreaView>
  )
}

