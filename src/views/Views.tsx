import { AppRoute } from '@/components/route'
import { Loading } from '@/components/shared'
import appsRoute from '@/configs/appsRoute'
import { Suspense } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'

const AllRoutes = () => {
  const location = useLocation()
  const pathSegments = location.pathname

  return (
    <Routes location={location} key={pathSegments}>
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
