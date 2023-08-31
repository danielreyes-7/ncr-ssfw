import { Home } from '../pages'
import { Layout } from '../layout/Layout'
import { NotFound } from '../pages'
import { AccountDetail, AccountsList } from '../pages'
import { Navigate, createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Navigate to='/home' />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/accounts',
        element: <AccountsList />,
      },
      {
        path: '/accounts/:id',
        element: <AccountDetail />,
      },
    ],
  },
])
