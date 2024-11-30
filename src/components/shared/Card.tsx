import { cn } from '@/utils'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  border?: boolean
  onClick?: () => void
}

const Card = (props: Props) => {
  const { children, className, border = true, onClick } = props
  return (
    <div
      className={cn(
        'overflow-hidden rounded border-light-grey-3/10 bg-dark p-2 shadow-md transition-all duration-150',
        { border: border },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
