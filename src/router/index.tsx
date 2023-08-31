import NotFound from '../pages/Notfound'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Layout } from '../layout/Layout'
import { AccountDetail, AccountsList } from '../pages'

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
