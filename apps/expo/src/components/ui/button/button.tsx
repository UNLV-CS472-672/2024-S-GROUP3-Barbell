import type { VariantProps } from 'class-variance-authority'
import React from 'react'
import { Pressable, PressableProps, Text } from 'react-native'
import { cva } from 'class-variance-authority'

import { cn } from '../../../utils/cn'

const buttonVariants = cva('active:opacity-30', {
  variants: {
    color: {
      primary: 'bg-dark-purple',
      light: 'bg-slate-200',
      trap: 'bg-[#717171]',
      dark: 'bg-slate-900',
      icon: 'bg-transparent',
    },
    size: {
      icon: 'p-1',
      medium: 'py-2',
      xl: 'py-1',
      full: 'w-11/12 py-3',
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
  children?: React.ReactNode
}

const textStylesMap = {
  icon: 'text-sm',
  medium: 'text-base',
  xl: 'text-xl font-semibold font-koulen',
  full: 'text-3xl font-semibold font-koulen',
}

const Button = ({
  value,
  color,
  size,
  rounded,
  className,
  children,
  ...props
}: ButtonProps) => {
  const textColor = color == 'light' ? 'text-slate-900' : 'text-white'

  return (
    <Pressable
      {...props}
      className={cn(buttonVariants({ color, size, rounded }), className)}
      testID={props.testID}
    >
      {value && (
        <Text
          className={`text-center  ${textColor} ${
            textStylesMap[size ? size : 'medium']
          }`}
          testID="button-text"
        >
          {value}
        </Text>
      )}
      {children}
    </Pressable>
  )
}

export default Button
