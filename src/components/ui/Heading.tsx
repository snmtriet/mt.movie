import { cn } from '@/utils'
import { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  bold?: boolean
  style?: CSSProperties
}

const Heading = (props: Props) => {
  const { children, className, as: Component = 'h3', bold, style } = props
  return (
    <Component className={cn({ 'font-bold': bold }, className)} style={style}>
      {children}
    </Component>
  )
}

export default Heading
