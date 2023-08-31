import { FC } from 'react'
import { Link, useRouteError } from 'react-router-dom'

type ErrorPageProps = {
  statusText?: string | undefined
  error?: {
    message?: string | undefined
  }
  status?: number | undefined
}

const NotFound: FC = () => {
  const error = useRouteError()

  if (typeof error === 'object') {
    const errorVerified = error as ErrorPageProps
    return (
      <div
        id='error-page'
        className='flex flex-col justify-center items-center gap-4 pt-5'
      >
        <h1 className='text-3xl font-semibold'>Oops!</h1>
        <p className='text-lg'>Sorry, an unexpected error has occurred.</p>
        <div className='text-xl'>
          <p className='flex items-baseline gap-2'>
            {errorVerified?.statusText && (
              <span className='text-4xl text-red-600'>
                {errorVerified?.status}
              </span>
            )}{' '}
            {errorVerified?.statusText || errorVerified?.error?.message}
          </p>
        </div>
        <button className='bg-slate-300 py-2 px-4 rounded-md transition-colors hover:bg-slate-400'>
          <Link to='/'>Volver al Home</Link>
        </button>
      </div>
    )
  }
}

export default NotFound

