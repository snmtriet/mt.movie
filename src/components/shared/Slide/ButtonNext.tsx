import { Button } from '@/components/ui'
import { cn } from '@/utils'
import { IoIosArrowBack } from 'react-icons/io'

type Props = {
  className?: string
}

const ButtonNext = (props: Props) => {
  const { className } = props
  return (
    <Button
      className={cn(
        'rotate-180 border text-white hover:border-red-700',
        className,
      )}
      variant="secondary"
      style={{ background: 'hsla(0,0%,8%,.5)' }}
    >
      <IoIosArrowBack size={16} strokeWidth={20} />
    </Button>
  )
}

export default ButtonNext
