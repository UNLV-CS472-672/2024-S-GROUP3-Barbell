// BottomSheetContext.tsx
import { Context, createContext, RefObject } from 'react'

import BottomSheet from '@gorhom/bottom-sheet'

interface BottomSheetContextType {
  bottomSheetRef: RefObject<BottomSheet> | null
  openBottomSheet: () => void
  closeBottomSheet: () => void
}

const defaultValue: BottomSheetContextType = {
  bottomSheetRef: null, 
  openBottomSheet: () => {},
  closeBottomSheet: () => {},
}

const BottomSheetContext: Context<BottomSheetContextType> = createContext(defaultValue)

export default BottomSheetContext
