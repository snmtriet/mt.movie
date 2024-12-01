import { cn } from '@/utils'
import { ImgHTMLAttributes, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Loading } from '../shared'

type Props = {
  className?: string
  loadingClassName?: string
  onError?: (error: boolean) => void
  onLoad?: (loaded: boolean) => void
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError' | 'onLoad'>

const Image = (props: Props) => {
  const { className, onError, onLoad, ...rest } = props
  const [loaded, setLoaded] = useState(false)
  const overlayRef = useRef(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [error, setError] = useState(false)

  function handleError() {
    if (imgRef.current) {
      imgRef.current.src = '/images/image-placeholder.png'
    }
    setLoaded(true)
    setError(true)
    onError?.(true)
  }

  function handleLoad() {
    setLoaded(true)
    onLoad?.(true)
  }

  return (
    <div className="relative h-full w-full">
      <CSSTransition
        classNames="fade"
        in={!loaded}
        timeout={400}
        unmountOnExit
        mountOnEnter
        nodeRef={overlayRef}
      >
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-dark"
        >
          <Loading loading />
        </div>
      </CSSTransition>
      <img
        ref={imgRef}
        className={cn(
          'opacity-0 transition-opacity duration-300 ease-linear',
          {
            loadingClassName: !loaded,
            'opacity-100': loaded,
            'opacity-60': error,
          },
          className,
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...rest}
      />
    </div>
  )
}

export default Image
