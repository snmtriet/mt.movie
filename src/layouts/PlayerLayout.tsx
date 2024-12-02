import Views from '@/views/Views'
import { useEffect } from 'react'

const PlayerLayout = () => {
  useEffect(() => {
    setTimeout(() => {
      document.body.style.overflow = 'hidden'
    }, 1000)
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="relative overflow-hidden">
      <Views />
    </div>
  )
}

export default PlayerLayout
