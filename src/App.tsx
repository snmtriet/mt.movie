import { lazy, Suspense, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Loading } from './components/shared'
import {
  LAYOUT_TYPE_DEFAULT,
  LAYOUT_TYPE_PLAYER,
} from './constants/theme.constant'
import { useAppSelector } from './store'
import { cn } from './utils'

const layouts = {
  default: lazy(() => import('./layouts/MainLayout')),
  player: lazy(() => import('./layouts/PlayerLayout')),
}

function App() {
  const { pathname } = useLocation()
  const { theme } = useAppSelector((state) => state.setting)

  const AppLayout = useMemo(() => {
    if (pathname.includes('/player')) {
      return layouts[LAYOUT_TYPE_PLAYER]
    }
    return layouts[LAYOUT_TYPE_DEFAULT]
  }, [pathname])

  return (
    <Suspense
      fallback={
        <div
          className={cn(
            'loading-center',
            theme === 'dark' ? 'bg-dark' : 'bg-light',
          )}
        >
          <Loading loading />
        </div>
      }
    >
      <AppLayout />
    </Suspense>
  )
}

export default App
