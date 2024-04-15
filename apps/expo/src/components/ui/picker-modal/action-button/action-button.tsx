import * as React from 'react'
import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native'

/**
 * ? Local Imports
 */
import styles, {
  _dynamicBorderStyle,
} from '~/components/ui/picker-modal/action-button/action-button.style'
import Divider from '~/components/ui/picker-modal/divider/divider'

type CustomViewStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>

export interface IActionButtonProps {
  actionButtonUnderlayColor?: string
  actionButtonStyle?: CustomViewStyleProp
  dividerStyle?: CustomViewStyleProp
  actionButtonTextStyle?: CustomTextStyleProp
  text?: string | number
  TouchableComponent?: any
  isLastItem?: boolean
  onActionPress?: () => void
}

const ActionButton: React.FC<IActionButtonProps> = ({
  text,
  isLastItem = false,
  dividerStyle,
  actionButtonStyle,
  actionButtonTextStyle,
  TouchableComponent,
  actionButtonUnderlayColor = 'rgba(255,255,255,0.2)',
  onActionPress,
}) => {
  return (
    <>
      <TouchableComponent
        underlayColor={actionButtonUnderlayColor}
        style={[styles.actionButtonStyle, actionButtonStyle, _dynamicBorderStyle(isLastItem)]}
        onPress={onActionPress}
      >
        <Text style={[styles.actionButtonTextStyle, actionButtonTextStyle]} className='font-koulen'>
          {text}
        </Text>
      </TouchableComponent>
      {!isLastItem && <Divider style={dividerStyle} />}
    </>
  )
}

export default ActionButton
