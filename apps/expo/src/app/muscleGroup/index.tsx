import type { BodyPart } from 'react-native-body-highlighter'
import React, { useState } from 'react'
import { Dimensions, Pressable, Text, View } from 'react-native'
import Body from 'react-native-body-highlighter'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'

import FilteredExercises from '~/app/filteredExercises'
import FrontBackSwitch from '~/components/muscleGroup/FrontBackSwitch'
import GenderSwitch from '~/components/muscleGroup/GenderSwitch'
import Label from '~/components/ui/label/Label'
import NavBar from '~/components/ui/nav-bar/NavBar'
import { Gender, useGlobalContext } from '~/context/global-context'

export type muscleSelectDev =
  | 'abs'
  | 'adductors'
  | 'ankles'
  | 'biceps'
  | 'calves'
  | 'chest'
  | 'deltoids'
  | 'feet'
  | 'forearm'
  | 'gluteal'
  | 'hamstring'
  | 'hands'
  | 'hair'
  | 'head'
  | 'knees'
  | 'lower-back'
  | 'neck'
  | 'obliques'
  | 'quadriceps'
  | 'tibialis'
  | 'trapezius'
  | 'triceps'
  | 'upper-back'

export enum muscleSelectUser {
  Shoulder,
  Chest,
  Arm,
  Core,
  Leg,
  Back,
  NoSelection,
}

//{ 'Shoulder' | 'Chest' | 'Arm' | 'Core' | 'Leg' | 'Back' }

export default function NewWorkoutMuscleGroup() {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  // <Svg viewBox={viewBox} height={400 * scale} width={200 * scale}>
  // Dynamically resize by reversing the work done in react-native-body-highlighter
  // const maxScale = (screenHeight - 96) / (400 + 96)
  const maxScale = (screenHeight - 96) / (400 + 64)
  const { userData } = useGlobalContext()
  // Is female: true, Else: false
  let genderTmp = false

  // Define the initial state with default values
  // intensity used as bool in lib
  // intensity == 0, use val at colors[index 0]
  const [bodyPartSelected, setBodyPartSelected] = useState<BodyPart>({
    color: 'defaultColor',
    slug: 'chest',
    intensity: 0,
    pathArray: [],
  })

  // Use FIFO order
  // Having a function seems too much
  // Make sure no junk data in same group
  // The merge function in react-native-body-highlighter will handle duplicates
  const [sameGroup1, setSameGroup1] = useState<BodyPart>({
    color: 'defaultColor',
    slug: 'chest',
    intensity: 0,
    pathArray: [],
  })

  const [sameGroup2, setSameGroup2] = useState<BodyPart>({
    color: 'defaultColor',
    slug: 'chest',
    intensity: 0,
    pathArray: [],
  })

  const [sameGroup3, setSameGroup3] = useState<BodyPart>({
    color: 'defaultColor',
    slug: 'chest',
    intensity: 0,
    pathArray: [],
  })

  const [sameGroup4, setSameGroup4] = useState<BodyPart>({
    color: 'defaultColor',
    slug: 'chest',
    intensity: 0,
    pathArray: [],
  })

  const [sameGroup5, setSameGroup5] = useState<BodyPart>({
    color: 'defaultColor',
    slug: 'chest',
    intensity: 0,
    pathArray: [],
  })

  const [isBackSideEnabled, setIsBackSideEnabled] = useState(false)

  // Use user data to decide if change view to female
  genderTmp = userData?.gender == Gender.FEMALE.toString()
  const [genderSelection, setGender] = useState(genderTmp)

  const toggleSwitch = () => setIsBackSideEnabled((previousState) => !previousState)

  const toggleGenderSwitch = () => setGender((previousState) => !previousState)

  const [userSelection, setUserSelection] = useState('')
  const [passNext, setPassNext] = useState<muscleSelectUser>(muscleSelectUser.NoSelection)

  // NavBar gives odd view
  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <NavBar center={'Select muscle group'} right={'Next'} />

      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Body
            onBodyPartPress={(e) => {
              switch (e.slug) {
                case 'deltoids':
                  // Shoulder
                  if (userSelection != 'Shoulder') {
                    setBodyPartSelected({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup1({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup2({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup3({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup4({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup5({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setUserSelection('Shoulder')
                  } else {
                    setBodyPartSelected({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup1({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup2({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup3({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup4({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup5({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setUserSelection('')
                  }
                  break

                case 'chest':
                  // Chest
                  if (userSelection != 'Chest') {
                    setBodyPartSelected({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup1({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup2({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup3({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup4({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup5({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setUserSelection('Chest')
                  } else {
                    setBodyPartSelected({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup1({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup2({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup3({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup4({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup5({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setUserSelection('')
                  }
                  break

                case 'biceps':
                case 'triceps':
                case 'forearm':
                  // Arm
                  if (userSelection != 'Arm') {
                    setBodyPartSelected({
                      slug: 'biceps',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup1({
                      slug: 'triceps',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup2({
                      slug: 'forearm',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup3({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup4({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup5({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setUserSelection('Arm')
                  } else {
                    setBodyPartSelected({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup1({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup2({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup3({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup4({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup5({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setUserSelection('')
                  }
                  break

                case 'abs':
                case 'obliques':
                  // Core
                  if (userSelection != 'Core') {
                    setBodyPartSelected({
                      slug: 'abs',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup1({
                      slug: 'obliques',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup2({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup3({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup4({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup5({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setUserSelection('Core')
                  } else {
                    setBodyPartSelected({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup1({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup2({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup3({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup4({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup5({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setUserSelection('')
                  }
                  break

                case 'quadriceps':
                case 'adductors':
                case 'hamstring':
                // Upper leg
                case 'tibialis':
                case 'calves':
                // Lower leg
                case 'gluteal':
                  // Glute
                  // Leg
                  if (userSelection != 'Leg') {
                    setBodyPartSelected({
                      slug: 'quadriceps',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup1({
                      slug: 'adductors',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup2({
                      slug: 'hamstring',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup3({
                      slug: 'tibialis',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup4({
                      slug: 'calves',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup5({
                      slug: 'gluteal',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setUserSelection('Leg')
                  } else {
                    setBodyPartSelected({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup1({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup2({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup3({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup4({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup5({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setUserSelection('')
                  }
                  break

                case 'trapezius':
                // Conflict with upper back
                // Go with the figma design
                // Upper back
                case 'upper-back':
                // Lat
                case 'lower-back':
                  // Lower back
                  // Back
                  if (userSelection != 'Back') {
                    setBodyPartSelected({
                      slug: 'trapezius',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup1({
                      slug: 'upper-back',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup2({
                      slug: 'lower-back',
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup3({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup4({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup5({
                      slug: e.slug,
                      intensity: 2,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setUserSelection('Back')
                  } else {
                    setBodyPartSelected({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup1({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup2({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup3({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup4({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setSameGroup5({
                      slug: e.slug,
                      intensity: 0,
                      color: 'defaultColor',
                      pathArray: e.pathArray,
                    })
                    setUserSelection('')
                  }
                  break

                default:
                  // Show Nothing, reset model
                  // Not supported
                  setBodyPartSelected({
                    slug: e.slug,
                    intensity: 0,
                    color: 'defaultColor',
                    pathArray: e.pathArray,
                  })
                  setSameGroup1({
                    slug: e.slug,
                    intensity: 0,
                    color: 'defaultColor',
                    pathArray: e.pathArray,
                  })
                  setSameGroup2({
                    slug: e.slug,
                    intensity: 0,
                    color: 'defaultColor',
                    pathArray: e.pathArray,
                  })
                  setSameGroup3({
                    slug: e.slug,
                    intensity: 0,
                    color: 'defaultColor',
                    pathArray: e.pathArray,
                  })
                  setSameGroup4({
                    slug: e.slug,
                    intensity: 0,
                    color: 'defaultColor',
                    pathArray: e.pathArray,
                  })
                  setSameGroup5({
                    slug: e.slug,
                    intensity: 0,
                    color: 'defaultColor',
                    pathArray: e.pathArray,
                  })
                  // Please Select Another
                  setUserSelection('')
                  break
              }

              // DO NOT SELECT
              // Get out
            }}
            data={[
              // The Body Part shown first overwrites what come after if slug field are the same
              bodyPartSelected,
              sameGroup1,
              sameGroup2,
              sameGroup3,
              sameGroup4,
              sameGroup5,
            ]}
            gender={genderSelection ? 'female' : 'male'}
            side={isBackSideEnabled ? 'back' : 'front'}
            scale={maxScale}
            frontOnly={false}
            backOnly={false}
            colors={['#454545', '#74b9ff']}
          />
        </View>
        <View className='absolute right-20 top-16'>
          <TouchableOpacity onPress={toggleGenderSwitch}>
            <View className='rounded-md bg-[#727272] p-1'>
              {!genderSelection && <Ionicons name='female' size={24} color='#000000' />}
              {genderSelection && <Ionicons name='male' size={24} color='#000000' />}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom section */}
      <View
        className='flex flex-1 flex-row'
        style={{ gap: 0.1 * screenWidth, position: 'absolute', bottom: 11 }}
      >
        <View className='w-full pb-5' style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View className='flex-1 items-center pb-2'>
            {userSelection && (
              <Label text={userSelection} backgroundColor={'#5BBBFF'} textColor={'white'} />
            )}
          </View>

          <FrontBackSwitch onValueChange={toggleSwitch} value={isBackSideEnabled} label={''} />
        </View>
      </View>
    </SafeAreaView>
  )
}
