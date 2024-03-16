import { forwardRef, useCallback, useMemo } from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'

export type CustomBottomSheetModalRef = BottomSheetModal
export interface CustomBottomSheetModalProps {
  children: React.ReactNode
  customSnapPoints: (string | number)[]
  startIndex: number
  enablePanDownToClose?: boolean
  renderBackdrop?: boolean
}

const CustomBottomSheetModal = forwardRef<
  CustomBottomSheetModalRef,
  CustomBottomSheetModalProps
>(
  (
    {
      children,
      customSnapPoints,
      startIndex,
      enablePanDownToClose,
      renderBackdrop,
    },
    ref,
  ) => {
    const snapPoints = useMemo(() => customSnapPoints, [])

    const backdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop disappearsOnIndex={-1} {...props} />
      ),
      [],
    )

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={startIndex}
        enablePanDownToClose={enablePanDownToClose ?? true}
        backdropComponent={renderBackdrop ? backdrop : undefined}
      >
        {children}
      </BottomSheetModal>
    )
  },
)

export default CustomBottomSheetModal
