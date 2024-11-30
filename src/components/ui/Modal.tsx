import { cn } from '@/utils'
import { useEffect, useRef, forwardRef } from 'react'
import ReactDOM from 'react-dom'
import { IoCloseSharp } from 'react-icons/io5'
import { CSSTransition } from 'react-transition-group'

type Props = {
  open: boolean
  className?: string
  children: React.ReactNode
  noScroll?: boolean
  onClose?: () => void
  onRequestClose?: () => void
  isTransparent?: boolean
  hideCloseButton?: boolean
}

const Modal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    className,
    children,
    open,
    noScroll,
    onClose,
    onRequestClose,
    hideCloseButton = false,
  } = props
  const nodeRef = useRef(null)

  useEffect(() => {
    if (open && noScroll) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }
  }, [open, noScroll])

  return ReactDOM.createPortal(
    <>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={open}
        timeout={400}
        nodeRef={nodeRef}
        classNames="fade"
      >
        <div
          ref={nodeRef}
          className="fixed inset-0 z-[100] m-auto flex items-center justify-center"
          style={{ boxShadow: 'rgba(0,0,0,0.75) 0px 3px 10px' }}
        >
          <div
            className={cn(
              'z-10 flex w-full max-w-7xl flex-col overflow-hidden rounded-md bg-dark',
              className,
            )}
            ref={ref}
          >
            <div className="relative z-20 flex justify-end">
              {!hideCloseButton && (
                <button
                  type="button"
                  className="group absolute right-4 top-4 flex items-center justify-center rounded-full bg-dark p-2 hover:bg-dark-6"
                  onClick={onClose}
                >
                  <IoCloseSharp
                    size={20}
                    className="text-white transition-colors group-hover:text-red-700"
                  />
                </button>
              )}
            </div>
            {children}
          </div>
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onRequestClose}
          />
        </div>
      </CSSTransition>
    </>,

    document.body,
  )
})

Modal.displayName = 'Modal'

export default Modal
