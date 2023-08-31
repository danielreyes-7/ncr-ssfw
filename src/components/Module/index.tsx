import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { twMerge as tw } from 'tailwind-merge'

interface ModuleProps {
  accountType: string
  accountNumber: string | number
  className?: string
  id?: number | string | null
  index?: number
}

export const Module: FC<ModuleProps> = ({
  accountType,
  accountNumber,
  className,
  id,
}) => {
  const navigate = useNavigate()

  return (
    <div
      className={tw(
        'bg-primary text-primary-foreground cursor-pointer rounded-md shadow-lg shadow-black/30 flex flex-col justify-center items-center gap-2 transition delay-50 duration-300 hover:scale-105',
        className
      )}
      onClick={() => navigate(`/accounts/${id}`)}
    >
      <p className='text-lg'>
        {(accountType === 'CC' && 'Cuenta Corriente') ||
          (accountType === 'CA' && 'Cuenta de Ahorro')}
      </p>
      <p className='text-lg'>Nro: {accountNumber}</p>
    </div>
  )
}
