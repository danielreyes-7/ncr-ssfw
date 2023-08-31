import { Outlet } from 'react-router-dom'
import { NCRLogo } from '../components'

export const Layout = () => {
  return (
    <div>
      <nav className='w-full bg-primary'>
        <NCRLogo fill='white' size={100} />
      </nav>
      <main className='container min-h-full'>
        <Outlet />
      </main>
    </div>
  )
}

