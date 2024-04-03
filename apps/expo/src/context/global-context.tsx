import type { Dispatch, SetStateAction } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import { api } from '~/utils/api'

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
