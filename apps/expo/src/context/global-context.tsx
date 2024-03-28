import type { Dispatch, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

export type TGlobalContext = {
  isWorkingOut: boolean
  setIsWorkingOut: Dispatch<SetStateAction<boolean>>
  userData: any // TODO: define user data type
}

export const GlobalContext = createContext<TGlobalContext | null>(null)

interface IGlobalContextProviderProps {
  children: React.ReactNode
}

const GlobalContextProvider = ({ children }: IGlobalContextProviderProps) => {
  const [isWorkingOut, setIsWorkingOut] = useState(false)
  const globalContextValue: TGlobalContext = {
    isWorkingOut,
    setIsWorkingOut,
    userData: {
      // temporarily assign the provided user data
      id: 4,
      username: 'userTen',
      email: 'userten@example.com',
      name: 'User Ten',
      status: 'OFFLINE',
      streak: 6,
    },
  }
  // TODO: implement a fetchUserData function

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
