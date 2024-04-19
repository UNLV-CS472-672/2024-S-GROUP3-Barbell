import * as React from 'react'
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'

import { IActionButtonProps } from '~/components/ui/picker-modal/action-button/action-button'
import styles from '~/components/ui/picker-modal/picker-modal.style'

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>

export interface IPickerModalProps {
  title: string
  subTitle?: string
  isVisible: boolean
  onBackdropPress: () => void
  children: React.ReactNode
  modalProps?: ModalProps
}

const PickerModal: React.FC<IPickerModalProps> = ({
  title,
  subTitle,
  isVisible,
  modalProps,
  onBackdropPress,
  children,
  ...rest
}) => {
  const Picker = () => (
    <View style={[styles.mainContent]}>
      <Text className='py-6 text-center text-xl font-bold text-white'>{title}</Text>
      {subTitle && (
        <Text className='py-6 text-center text-lg font-bold text-white'>{subTitle}</Text>
      )}
      <View>{children}</View>
    </View>
  )

  return (
    <Modal
      isVisible={isVisible}
      {...modalProps}
      style={[
        {
          marginBottom: 300,
          marginLeft: 20,
        },
        modalProps?.style,
      ]}
      animationIn='slideInUp'
      animationInTiming={300}
      animationOut='slideOutDown'
      animationOutTiming={200}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.5}
    >
      <View style={[styles.container]}>
        <Picker />
      </View>
    </Modal>
  )
}

export default PickerModal
