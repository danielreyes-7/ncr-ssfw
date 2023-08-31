import { Account } from '../../utils/types'
import { AccountsContext } from '../../context/accountsContext'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { FC, useContext } from 'react'

export const AccountDetail: FC = () => {
  const contextAccounts = useContext(AccountsContext)
  const navigate = useNavigate()
  const { id } = useParams()

  if (!contextAccounts) {
    return toast.error('Hubo un error al mostrar los datos')
  }

  const { accounts } = contextAccounts

  const selectedAccount: Account | undefined =
    accounts && accounts.find((account) => account.id === Number(id))

  return (
    <>
      {selectedAccount && (
        <div className='flex flex-col justify-center items-center p-5'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <h3>Consulta de Saldo</h3>
            <h1 className='text-3xl font-medium'>Este es tu saldo actual</h1>
          </div>
          <div className='w-3/4 md:w-1/2 xl:w-1/3 mx-auto py-10 mt-[8%] mb-[50px] rounded-md shadow-lg shadow-black/30'>
            <div className='w-fit flex flex-col justify-center mx-auto gap-4 text-md md:text-lg '>
              <p>Saldo de la cuenta: {selectedAccount.saldo}</p>
              <p>
                Tipo de cuenta:{' '}
                {(selectedAccount.tipo_letras === 'CC' && 'Cuenta Corriente') ||
                  (selectedAccount.tipo_letras === 'CA' && 'Cuenta de Ahorro')}
              </p>
              <p>Número de cuenta: {selectedAccount.n}</p>
            </div>
          </div>
          <button
            className='w-[220px] bg-primary text-primary-foreground py-5 px-5 text-xl text-center rounded-md shadow-lg shadow-black/30 transition-colors duration-300 hover:bg-primary/90'
            onClick={() => navigate(-1)}
          >
            Volver al listado de cuentas
          </button>
        </div>
      )}
    </>
  )
}
