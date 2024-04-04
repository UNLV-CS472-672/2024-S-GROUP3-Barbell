import type { Dispatch, SetStateAction } from 'react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { useClerk } from '@clerk/clerk-expo'

import { api } from '~/utils/api'
import { generateUsername } from '~/utils/usernameGenerator'

// TODO: Finish defining user data
export interface IUserData {
  id: number
  clerkId: string
  username: string
  name: string
  // status: 'ACTIVE' | 'INACTIVE'
  // streak: number
}

export type TGlobalContext = {
  isWorkingOut: boolean
  setIsWorkingOut: Dispatch<SetStateAction<boolean>>
  userData: IUserData | null
  setUserData: Dispatch<SetStateAction<IUserData | null>>
}

export const GlobalContext = createContext<TGlobalContext | null>(null)

interface IGlobalContextProviderProps {
  children: React.ReactNode
}

const GlobalContextProvider = ({ children }: IGlobalContextProviderProps) => {
  const [isWorkingOut, setIsWorkingOut] = useState(false)
  const [userData, setUserData] = useState<IUserData | null>(null)
  const { user: clerkUserData } = useClerk()
  const createUser = api.user.create.useMutation()

  const getUserData = useCallback(async () => {
    if (clerkUserData) {
      console.log('Calling create user mutation')

      const response = await createUser.mutateAsync({
        clerkId: clerkUserData.id,
        username: clerkUserData.username ? clerkUserData.username : generateUsername(),
        name: clerkUserData.fullName ? clerkUserData.fullName : 'User',
      })

      setUserData({
        id: response.id,
        clerkId: response.clerkId,
        username: response.username,
        name: response.name!,
      })
    }
  }, [clerkUserData])

  useEffect(() => {
    getUserData()
  }, [getUserData])

  const globalContextValue: TGlobalContext = {
    isWorkingOut,
    setIsWorkingOut,
    userData,
    setUserData,
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
