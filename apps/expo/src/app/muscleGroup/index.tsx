import React, { useState } from 'react'
import { Dimensions, Image, Text, View, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import tailwind from '@/tooling/tailwind'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import Body from 'react-native-body-highlighter'
import ToggleSwitch from '~/components/toggle/Toggle'
import FrontBackSwitch from '~/components/muscleGroup/FrontBackSwitch'

export type muscleSelect =
  | "abs"
  | "adductors"
  | "ankles"
  | "biceps"
  | "calves"
  | "chest"
  | "deltoids"
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

export default function NewWorkoutMuscleGroup() {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  const vmin70 = Math.min(screenWidth, screenHeight) * 0.7

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
            style = {{alignItems: "center", justifyContent: "center"}}>

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
          scale={1.7}
        />

        <View>
          <Text style={{ color: '#CACACA', fontSize: 20 }}>
            Muscle Group Selected: {userSelection}
          </Text>
        </View>


        <View className="flex flex-row"
              style={{gap: 0.1 * screenWidth}}>

          <View className="flex-1"
                style={{alignItems: "center", justifyContent: "center"}}>

            <Text style={{ color: '#CACACA', fontSize: 20 }}>
              {isMale ? "Male" : "Female"}
            </Text>

            <ToggleSwitch onValueChange={toggleGenderSwitch} value={isMale} />
          </View>
        </View>


        <View className="flex flex-row"
              style={{gap: 0.1 * screenWidth, position: "absolute", bottom: 15}}>

          <View className="flex-1"
                style={{alignItems: "center", justifyContent: "center"}}>

            <FrontBackSwitch
              onValueChange={toggleSwitch}
              value={isBackSideEnabled}
              label={""}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

