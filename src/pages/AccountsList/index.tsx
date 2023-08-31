import { Account } from '../../utils/types'
import { AccountsContext } from '../../context/accountsContext'
import { useContext, useEffect, useState } from 'react'
import { Module } from '../../components'
import { useNavigate } from 'react-router-dom'
import { twMerge as tw } from 'tailwind-merge'

export const AccountsList = () => {
  const contextAccounts = useContext(AccountsContext)
  const navigate = useNavigate()
  const [currentData, setCurrentData] = useState<Account[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [accountsPerPage, setAccountsPerPage] = useState<number>(5)

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleAccountsPerPage = (data: Account[]) => {
    if (data.length > 6) {
      setAccountsPerPage(5)
    } else if (data.length <= 6) {
      setAccountsPerPage(6)
    }
  }

  useEffect(() => {
    if (contextAccounts) {
      const { accounts } = contextAccounts
      if (accounts) {
        const filteredAccounts = accounts.filter(
          (account) =>
            (account.tipo_letras === 'CA' &&
              (account.moneda === '$' || account.moneda === 'u$s')) ||
            (account.tipo_letras === 'CC' &&
              (account.moneda === '$' || account.moneda === 'u$s'))
        )
        handleAccountsPerPage(filteredAccounts)
        setCurrentData(filteredAccounts)
      }
    }
  }, [contextAccounts])

  const indexOfLastAccount = currentPage * accountsPerPage
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage

  const totalPages = Math.ceil(currentData.length / accountsPerPage)

  const currentAccounts = currentData.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  )

  const shouldShowPrevButton = currentPage > 1
  const shouldShowNextButton = currentPage < totalPages

  return (
    <div className='p-5'>
      {currentAccounts && (
        <>
          <div className='flex flex-col justify-center items-center gap-2'>
            <h3>Consulta de Saldo</h3>
            <h1 className='text-3xl font-medium'>
              Selecciona la Cuenta a Consultar
            </h1>
          </div>
          <div className='my-6 grid grid-rows-2 h- grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center'>
            {shouldShowPrevButton && (
              <button
                className='h-[150px] bg-primary text-primary-foreground text-lg cursor-pointer rounded-md shadow-lg shadow-black/30 transition delay-50 duration-300 hover:scale-105'
                onClick={handlePrevPage}
              >
                &laquo; Opciones anteriores
              </button>
            )}
            {currentAccounts.map((account: Account, index: number) => {
              if (
                (account.tipo_letras === 'CA' &&
                  (account.moneda === '$' || account.moneda === 'u$s')) ||
                (account.tipo_letras === 'CC' &&
                  (account.moneda === '$' || account.moneda === 'u$s'))
              ) {
                return (
                  <Module
                    className={tw('h-[150px]')}
                    key={account.id}
                    accountType={account.tipo_letras}
                    accountNumber={account.n}
                    id={account.id}
                    index={index + 1}
                  />
                )
              }
            })}
            {shouldShowNextButton && (
              <button
                className='h-[150px] bg-primary text-primary-foreground cursor-pointer text-lg rounded-md shadow-lg shadow-black/30 transition delay-50 duration-300 hover:scale-105'
                onClick={handleNextPage}
              >
                Más opciones &raquo;
              </button>
            )}
          </div>
          <button
            className='bg-primary text-primary-foreground py-5 px-5 w-[160px] mt-auto text-xl font-se text-center rounded-md shadow-lg shadow-black/30 transition-colors duration-300 hover:bg-primary/90'
            onClick={() => navigate('/home')}
          >
            Salir
          </button>
        </>
      )}
    </div>
  )
}
