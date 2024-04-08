import React, { useState } from 'react'
<<<<<<< Updated upstream
import { Dimensions, Image, Text, View } from 'react-native'
=======
import { Dimensions, Image, Text, View, StyleSheet } from 'react-native'
>>>>>>> Stashed changes
import { router } from 'expo-router'
import tailwind from '@/tooling/tailwind'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import MuscleGroup from '~/components/muscleGroup/muscleGroup'
<<<<<<< Updated upstream

export default function NewWorkoutMuscleGroup() {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

  // vmin: CSS
  const vmin70 = Math.min(screenWidth, screenHeight) * 0.7

=======
import Body from 'react-native-body-highlighter'
import ToggleSwitch from '~/components/toggle/Toggle'
import FrontBackSwitch from '~/components/toggle/FrontBackSwitch'

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
  const [tmpS, settmpS] = useState({})

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        <Ionicons name="ellipsis-horizontal-sharp" size={24} color="#CACACA" />
      </View>

      <View className="flex flex-row items-center">
        <MuscleGroup />
      </View>
    </SafeAreaView>
  )
}
=======
        <Text></Text>
      </View>

      <View className="flex-1"
            style = {{alignItems: "center", justifyContent: "center"}}>

        <Body

          onBodyPartPress={(e) =>
            {
              switch (e.slug) {
                case "abs":
                  break;
                case "adductors":
                  break;
                case "ankles":
                  break;
                case "calves":
                  break;
                case "chest":
                  break;
                case "deltoids":
                  setBodyPartSelected({ slug: e.slug, intensity: 2 })
                  settmpS({ slug: "chest", intensity: 2 })
                  sameGroup = bodyPartSelected;
                  sameGroup.slug = "chest";
                  break;
                case "feet":
                  break;
                case "biceps":
                case "triceps":
                case "forearm":
                  break;
                case "gluteal":
                  break;
                case "hamstring":
                  break;
                case "hands":
                  break;
                case "hair":
                  break;
                case "head":
                  break;
                case "knees":
                  break;
                case "lower-back":
                  break;
                case "neck":
                  break;
                case "obliques":
                  break;
                case "quadriceps":
                  break;
                case "tibialis":
                  break;
                case "trapezius":
                  break;
                case "upper-back":
                  break;
                default:
                  // Do Nothing
                  // Not supported
                  break;
              }

              //if (e.slug != "abs")
              // setBodyPartSelected({ slug: e.slug, intensity: 2 })
            }
          }



          data={
          [

            tmpS,
            bodyPartSelected,

            /*
          { slug: "chest", intensity: 1 },
          { slug: "abs", intensity: 2 },
          { slug: "upper-back", intensity: 1 },
          { slug: "lower-back", intensity: 2 },*/
            bodyPartSelected
          ]}

          gender={isMale ? "male" : "female"}
          side={isBackSideEnabled ? "back" : "front"}
          scale={1.7}
        />

        <View>
          <Text style={{ color: '#CACACA', fontSize: 20 }}>
            Muscle Group Selected: {bodyPartSelected.slug}
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
>>>>>>> Stashed changes
