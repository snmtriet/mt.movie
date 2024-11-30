import { cn } from '@/utils'
import React, { useState } from 'react'

type Props = {
  className?: string
} & React.ImgHTMLAttributes<HTMLImageElement>

const Image = (props: Props) => {
  const { className, ...rest } = props
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative h-full w-full">
      <img
        className={cn(
          'opacity-0 blur-sm transition-opacity duration-300 ease-linear',
          {
            'opacity-100 blur-none': loaded,
          },
          className,
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        {...rest}
        loading="lazy"
      />
    </div>
  )
}

export default Image
