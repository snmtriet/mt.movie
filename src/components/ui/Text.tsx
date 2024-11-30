import { cn } from '@/utils'
import { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  bold?: boolean
  ellipsis?: boolean
  style?: CSSProperties
}

const Text = (props: Props) => {
  const { children, className, size, bold, ellipsis, style } = props
  const sizeClass = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
  }[size || 'md']

  return (
    <span
      className={cn(
        'block transition-all duration-150',
        { 'font-bold': bold, 'truncate whitespace-nowrap': ellipsis },
        sizeClass,
        className,
      )}
      style={style}
    >
      {children}
    </span>
  )
}

export default Text
