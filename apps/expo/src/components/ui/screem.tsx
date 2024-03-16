// import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { Anchor, Paragraph } from 'tamagui'

export function HomeScreen() {
  return (
    <Paragraph ta="center" className='font-koulen'>
      Made by{' '}
      <Anchor href="" target="_blank" className='font-koulen'>
        thienguen
      </Anchor>
      ,{' '}
      <Anchor href="" target="_blank" rel="noreferrer" className='font-koulen'>
        what chu gonna do about it
      </Anchor>
    </Paragraph>
  )
}
