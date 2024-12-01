import { cn } from '@/utils'

type Props = {
  className?: string
}

const Skeleton = (props: Props) => {
  const { className } = props
  return (
    <div
      className={cn(
        'loader relative overflow-hidden rounded-lg bg-dark after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-dark-grey-3-alt/0 after:via-dark-grey-3-alt/25 after:to-dark-grey-3-alt/0',
        className,
      )}
    />
  )
}

export default Skeleton
