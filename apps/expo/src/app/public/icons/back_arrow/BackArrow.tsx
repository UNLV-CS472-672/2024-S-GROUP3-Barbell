import { Image } from "react-native"

export default function BackArrow(){
  return (
    <Image source={require('./back_arrow_icon.png')}
    style={{width: 30, height: 30}}/>
  )
}