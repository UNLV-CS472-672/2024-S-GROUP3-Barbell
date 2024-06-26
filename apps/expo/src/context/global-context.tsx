import type { Dispatch, RefObject, SetStateAction } from 'react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { useClerk } from '@clerk/clerk-expo'

import { CustomBottomSheetModalRef } from '~/components/ui/bottom-sheet/custom-bottom-sheet-modal'
import { api } from '~/utils/trpc/api'
import { generateUsername } from '~/utils/usernameGenerator'

export enum Gender {
  MALE,
  FEMALE,
  PREFERNOTTOSAY,
}

// TODO: Finish defining user data
export interface IUserData {
  id: number
  clerkId: string
  username: string
  name: string
}

export type TGlobalContext = {
  isWorkingOut: boolean
  setIsWorkingOut: Dispatch<SetStateAction<boolean>>
  userData: IUserData | null
  isLoadingUserData: boolean
  bottomSheetRef: RefObject<CustomBottomSheetModalRef> | null
  setBottomSheetRef: Dispatch<SetStateAction<RefObject<CustomBottomSheetModalRef> | null>>
  workoutTemplateId: number | null
  setWorkoutTemplateId: Dispatch<SetStateAction<number | null>>
  selectedExercises: number[]
  setSelectedExercises: Dispatch<SetStateAction<number[]>>
}

export const GlobalContext = createContext<TGlobalContext | null>(null)

interface IGlobalContextProviderProps {
  children: React.ReactNode
}

const GlobalContextProvider = ({ children }: IGlobalContextProviderProps) => {
  const [isWorkingOut, setIsWorkingOut] = useState(false)
  const [userData, setUserData] = useState<IUserData | null>(null)
  const [bottomSheetRef, setBottomSheetRef] = useState<RefObject<CustomBottomSheetModalRef> | null>(
    null,
  )
  const [workoutTemplateId, setWorkoutTemplateId] = useState<number | null>(null)
  const [selectedExercises, setSelectedExercises] = useState<number[]>([])
  const { user: clerkUserData } = useClerk()
  const createUser = api.user.create.useMutation()

  const {
    data: userNineData,
    isFetched: userNineDataIsFetched,
    isLoading: isLoadingUserNine,
  } = api.user.byId.useQuery({ id: 9 })

  const createUserIfNotExist = useCallback(async () => {
    if (clerkUserData) {
      const response = await createUser.mutateAsync({
        clerkId: clerkUserData.id,
        username: clerkUserData.username ? clerkUserData.username : generateUsername(),
        name: clerkUserData.fullName ? clerkUserData.fullName : 'User',
      })
      setUserData({
        id: response.id,
        clerkId: response.clerkId!,
        username: response.username,
        name: response.name!,
      })
    }
  }, [clerkUserData])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (!userNineDataIsFetched) return

      setUserData({
        id: userNineData?.id!,
        clerkId: userNineData?.clerkId!,
        username: userNineData?.username!,
        name: userNineData?.name!,
      })
    } else createUserIfNotExist()
  }, [createUserIfNotExist, userNineDataIsFetched])

  const globalContextValue: TGlobalContext = {
    isWorkingOut,
    setIsWorkingOut,
    userData,
    isLoadingUserData: isLoadingUserNine,
    bottomSheetRef,
    setBottomSheetRef,
    workoutTemplateId,
    setWorkoutTemplateId,
    selectedExercises,
    setSelectedExercises,
  }

  return <GlobalContext.Provider value={globalContextValue}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider')
  }
  return context
}

export default GlobalContextProvider
