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

  // Función que maneja en useNavigate de react-router-dom, asi pasamos por props a cada modulo
  const handleNavigate = (url: string) => navigate(url)

  // Función que maneja el botón para pasar a la siguiente página
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  // Función que maneja el botón para regresar a la página anterior
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  // Función que manera cuántos modulos de cuentas se muestran por ṕagina
  const handleAccountsPerPage = (data: Account[]) => {
    if (data.length > 6) {
      setAccountsPerPage(5)
    } else if (data.length <= 6) {
      setAccountsPerPage(6)
    }
  }

  // Función encargada de filtrar solo las cuentas que tengan 'CC' y 'CA' con saldos en '$' y 'u$s'
  const filteredAccounts = (accounts: Account[]) => {
    return accounts.filter(
      (account) =>
        (account.tipo_letras === 'CA' &&
          (account.moneda === '$' || account.moneda === 'u$s')) ||
        (account.tipo_letras === 'CC' &&
          (account.moneda === '$' || account.moneda === 'u$s'))
    )
  }

  // Ejecutamos el useEffect al renderizar la página y al haber un cambio en el contexto
  useEffect(() => {
    // Nos aseguramos de que exista el contexto
    if (contextAccounts) {
      const { accounts } = contextAccounts

      // Nos aseguramos de que exista accounts
      if (accounts) {
        // Hacemos uso de función para filtrar las cuenta que queremos ver
        const newFilteredAccounts = filteredAccounts(accounts)
        // Ejecutamos el manejador para determinar la cantidad de cuentas que estarán por página
        handleAccountsPerPage(newFilteredAccounts)
        // Seteamos el estado de la página actual a 1
        setCurrentPage(1)
        // Seteamos el estado para tener la data filtrada que mapearemos en el render del componente
        setCurrentData(newFilteredAccounts)
      }
    }
  }, [contextAccounts])

  // Definimos el numero de la última cuenta de la página actual
  const indexOfLastAccount = currentPage * accountsPerPage
  // Definimos el numero de la primer cuenta de la página actual
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage
  // Definimos el total de páginas que habrán
  const totalPages = Math.ceil(currentData.length / accountsPerPage)
  // Tomamos las cuentas actuales a mostrar en la página actual
  const currentAccounts = currentData.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  )
  // Constante que define cuando mostrar el botón de Opciones anteriores
  const shouldShowPrevButton = currentPage > 1
  // Constante que define cuando mostrar el botón de Más opciones
  const shouldShowNextButton = currentPage < totalPages

  return (
    <div className='p-5'>
      {currentAccounts && (
        <>
          <div className='flex flex-col justify-center items-center gap-2'>
            <h3 className='text-xl'>Consulta de Saldo</h3>
            <h1 className='text-4xl font-medium'>
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
            {currentAccounts.map((account: Account) => {
              return (
                <Module
                  className={tw('h-[150px]')}
                  key={account.id}
                  accountType={account.tipo_letras}
                  accountNumber={account.n}
                  id={account.id}
                  navigate={handleNavigate}
                />
              )
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
