import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { twMerge as tw } from 'tailwind-merge'

interface ModuleProps {
  accountType: string
  accountNumber: string | number
  id: number | string
  className?: string
}

/**
 * @param accountType - (mandatory) Type: string. value: any text, for this case it's the account type
 * @param accountNumber - (mandatory): Type: string or number. value: any number. ex: 56465454645 or '6565561651'
 * @param id - (mandatory): Type: string or number. value: any value to identify de account. ex: '11536ADG' or 156153
 * @param className - (optional): Type: string. value: may use any css class, in this case we're using tailwindcss. ex: 'flex'
 */

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
