import axios from 'axios'
import { NCR_API } from '../../config/general'
import { Account } from '../utils/types'
import { toast } from 'react-hot-toast'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface AccountsContextType {
  accounts?: Account[]
  loadingData?: boolean
  setIsLoadingData?: React.Dispatch<React.SetStateAction<boolean>>
  formatedAccounts?: Account[]
  setFormatedAccounts?: React.Dispatch<React.SetStateAction<Account[]>>
}

export const AccountsContext = createContext<AccountsContextType | undefined>(
  undefined
)

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loadingData, setIsLoadingData] = useState<boolean>(false)

  useEffect(() => {
    setIsLoadingData(true)
    axios
      .get(NCR_API as string)
      .then((response) => {
        if (response.status === 200) {
          const { cuentas } = response.data
          const newAccounts = cuentas.map(
            (account: Account, index: number) => ({
              ...account,
              n:
                typeof account.n === 'string' && account.n.trim() === ''
                  ? 2173393999
                  : account.n,
              id: index + 1,
            })
          )
          setAccounts(newAccounts)
        } else {
          toast.error('Hubo un error al cargar los datos')
        }
      })
      .finally(() => setIsLoadingData(false))
  }, [])

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        loadingData,
        setIsLoadingData,
      }}
    >
      {children}
    </AccountsContext.Provider>
  )
}

