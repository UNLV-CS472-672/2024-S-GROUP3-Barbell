import type { VariantProps } from 'class-variance-authority'
import { Pressable, PressableProps, Text } from 'react-native'
import { cva } from 'class-variance-authority'

import { cn } from '~/utils/cn'

const buttonVariants = cva('active:opacity-30', {
  variants: {
    color: {
      primary: 'bg-dark-purple',
      light: 'bg-slate-200',
      dark: 'bg-slate-900',
    },
    size: {
      icon: 'p-1',
      medium: 'py-2',
      xl: 'py-1',
    },
    rounded: {
      full: 'rounded-full',
      lg: 'rounded-lg',
      xxxl: 'rounded-3xl',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'medium',
    rounded: 'lg',
  },
})

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  value?: string
}

const textStylesMap = {
  icon: 'text-sm',
  medium: 'text-base',
  xl: 'text-xl font-semibold font-koulen',
}

const Button = ({ value, color, size, className, ...props }: ButtonProps) => {
  const textColor =
    color == 'light'
      ? 'text-slate-900'
      : color == 'dark' || ((color == 'primary' || !color) && size == 'xl')
        ? 'text-white'
        : 'text-slate-200'

  return (
    <Pressable
      {...props}
      className={cn(buttonVariants({ color, size }), className)}
    >
      {value && (
        <Text
          className={`text-center ${textColor} ${
            textStylesMap[size ? size : 'medium']
          }`}
        >
          {value}
        </Text>
      )}
    </Pressable>
  )
}

export default Button
