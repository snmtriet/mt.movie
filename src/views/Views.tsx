import { AppRoute } from '@/components/route'
import { Loading } from '@/components/shared'
import appsRoute from '@/configs/appsRoute'
import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'

const AllRoutes = () => {
  const location = useLocation()
  const pathSegments = location.pathname?.split('/') ?? []
  return (
    <AnimatePresence
      mode="wait"
      initial={true}
      onExitComplete={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0 })
        }
      }}
    >
      <Routes location={location} key={pathSegments[1]}>
        <Route path="/" element={<Outlet />}>
          {appsRoute.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<AppRoute component={route.component} />}
              />
            )
          })}
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

const Views = () => {
  return (
    <Suspense
      fallback={
        <div className="loading-center bg-dark">
          <Loading loading />
        </div>
      }
    >
      <AllRoutes />
    </Suspense>
  )
}

export default Views
