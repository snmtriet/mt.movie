import { Routes } from '@/@types/routes'
import { lazy } from 'react'

const appsRoute: Routes = [
  {
    key: 'app.home',
    path: '/',
    component: lazy(() => import('@/views/Home')),
  },
  {
    key: 'app.player',
    path: '/player/:slug/:episode',
    component: lazy(() => import('@/views/Player')),
  },
]

export default appsRoute
