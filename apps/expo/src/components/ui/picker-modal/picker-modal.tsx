import * as React from 'react'
import { StyleProp, Text, TextStyle, TouchableHighlight, View, ViewStyle } from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'

import ActionButton, {
  IActionButtonProps,
} from '~/components/ui/picker-modal/action-button/action-button'
import Divider from '~/components/ui/picker-modal/divider/divider'
import styles from '~/components/ui/picker-modal/picker-modal.style'

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>

export interface IPickerModalProps {
  style?: CustomStyleProp
  dividerStyle?: CustomStyleProp
  cancelButtonStyle?: CustomStyleProp
  titleTextContainer?: CustomStyleProp
  titleTextStyle?: CustomTextStyleProp
  cancelButtonTextStyle?: CustomTextStyleProp
  modalProps?: ModalProps
  actionButtonProps?: IActionButtonProps
  data: string[] | number[]
  title: string
  isVisible: boolean
  TouchableComponent?: any
  cancelButtonUnderlayColor?: string
  onPress: (selectedItem: string | number, index: number) => void
  onCancelPress: () => void
  onBackdropPress: () => void
}

const PickerModal: React.FC<IPickerModalProps> = ({
  style,
  data,
  title,
  onPress,
  isVisible,
  modalProps,
  dividerStyle,
  titleTextStyle,
  cancelButtonStyle,
  titleTextContainer,
  cancelButtonTextStyle,
  actionButtonProps,
  cancelButtonUnderlayColor = 'rgba(200,200,200,0.1)',
  TouchableComponent = TouchableHighlight,
  onBackdropPress,
  onCancelPress,
  ...rest
}) => {
  // /* istanbul ignore next */
  // const Title = () => (
  //   <View style={[styles.titleTextContainer, titleTextContainer]}>
  //     <Text style={[styles.titleTextStyle, titleTextStyle]}>{title}</Text>
  //   </View>
  // )

  // /* istanbul ignore next */
  // const CancelButton = () => (
  //   <ActionButton
  //     TouchableComponent={TouchableComponent}
  //     actionButtonUnderlayColor={cancelButtonUnderlayColor}
  //     onActionPress={onCancelPress}
  //     actionButtonStyle={styles.cancelButtonStyle}
  //     actionButtonTextStyle={cancelButtonTextStyle}
  //     text='Cancel'
  //     isLastItem
  //     {...actionButtonProps}
  //   />
  // )

  const Picker = () => (
    <View style={[styles.mainContent, style]}>
      {/* <Title /> */}
      <Divider style={dividerStyle} />
      {data.map((item: string | number, index: number) => (
        <ActionButton
          key={index}
          TouchableComponent={TouchableComponent}
          isLastItem={index === data.length - 1}
          actionButtonStyle={{ paddingBottom: index === 0 ? 8 : 0 }}
          actionButtonTextStyle={{ fontSize: 24 }}
          {...actionButtonProps}
          text={item}
          onActionPress={() => {
            /* istanbul ignore next */
            onPress && onPress(item, index)
          }}
        />
      ))}
    </View>
  )

  return (
    <Modal
      isVisible={isVisible}
      {...modalProps}
      style={[
        {
          marginBottom: 200,
          marginLeft: 20,
        },
        modalProps?.style,
      ]}
      animationIn='slideInUp'
      animationInTiming={300}
      animationOut='slideOutDown'
      animationOutTiming={200}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0}
    >
      {/* Modal content remains unchanged */}
      <View style={[styles.container]}>
        <Picker />
        {/* <CancelButton /> */}
      </View>
    </Modal>
  )
}

export default PickerModal
