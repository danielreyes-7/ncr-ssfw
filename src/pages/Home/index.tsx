import { AccountsContext } from '../../context/accountsContext'
import { ImSpinner10 } from 'react-icons/im'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()
  const contextAccount = useContext(AccountsContext)

  if (!contextAccount) {
    return null
  }
  const { setIsLoadingData, loadingData } = contextAccount
  return (
    <div className='flex justify-center items-center'>
      <button
        onClick={async () => {
          setIsLoadingData && setIsLoadingData(true)
          await new Promise((resolve) => setTimeout(resolve, 1000))
          setIsLoadingData && setIsLoadingData(false)
          navigate('/accounts')
        }}
        className='relative bg-primary text-primary-foreground py-5 px-5 w-[20%] mt-[18%] text-xl font-semibold text-center rounded-md shadow-lg shadow-black/30 transition-colors duration-300 hover:bg-primary/90'
      >
        {loadingData && (
          <ImSpinner10 className='animate-spin absolute top-6 left-16' />
        )}{' '}
        Entra
      </button>
    </div>
  )
}
