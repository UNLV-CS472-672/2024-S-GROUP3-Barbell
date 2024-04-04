// useBottomSheetControl.ts
import { RefObject, useCallback, useContext, useRef, useState } from 'react'

import BottomSheet from '@gorhom/bottom-sheet'

import BottomSheetContext from '../context/bottom-sheet.context'

export const useTBottomSheet = () => {
  const context = useContext(BottomSheetContext)

  const bottomSheetRef = useRef<BottomSheet>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openBottomSheet = () => {
    setIsOpen(true)
    bottomSheetRef.current?.expand()
  }

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close()
    setIsOpen(false)
  }

  return {
    isOpen,
    bottomSheetRef,
    closeBottomSheet,
    openBottomSheet,
  }
}
