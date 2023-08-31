import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { AccountsProvider } from './context/accountsContext.tsx'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { ToasterContext } from './context/toasterContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AccountsProvider>
      <ToasterContext />
      <RouterProvider router={router} />
    </AccountsProvider>
  </React.StrictMode>
)
