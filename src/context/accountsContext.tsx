import axios from 'axios'
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

// Creamos el contexto con un valor por defecto undefined
export const AccountsContext = createContext<AccountsContextType | undefined>(
  undefined
)

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loadingData, setIsLoadingData] = useState<boolean>(false)

  // Ejecutamos un useEffect al momento de iniciar el proyecto
  useEffect(() => {
    // Iniciamos en true el estado setIsLoadingData en caso de querer agregar un loader al proyecto
    setIsLoadingData(true)
    // Hacemos petición con axios al endpoint para tener la data
    axios
      .get(import.meta.env.VITE_NCR_API_ENDPOINT as string)
      .then((response) => {
        // Solo si la respuesta a la petición tiene un status 200, continuaremos
        if (response.status === 200) {
          // Desestructuramos la data y la almacenamos en una constante
          const { cuentas } = response.data
          // Usamos esa data para crear el Array que necesitamos
          const newAccounts = cuentas.map(
            (account: Account, index: number) => ({
              ...account,
              // Acá ya que habia una cuenta que no tenía un número asignamo, se lo aginamos
              n:
                typeof account.n === 'string' && account.n.trim() === ''
                  ? 2173393999
                  : account.n,
              // Asignamos un id unico para identificar cada cuenta
              id: index + 1,
            })
          )
          // Almacenamos nuestro Array modificado en nuestro estado, el cual manejaremos en el proyecto
          setAccounts(newAccounts)
        } else {
          // Si la respuesta petición a la petición tiene un status diferente a 200
          // Mandamos un flag para avisar q no se pudieron cargar los datos
          toast.error('Hubo un error al cargar los datos')
        }
      })
      // Finalmente al terminar el proyecto pasamos a false el estado para el loader (de llegar a necesitar alguno)
      .finally(() => setIsLoadingData(false))
  }, [])

  return (
    <AccountsContext.Provider
      // Pasamos todos los estados y métodos que necesitaremos en el proyecto
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

