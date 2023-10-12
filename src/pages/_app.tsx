import Navbar from '@components/Layout/Navbar'
import WalletContextProvider from '@components/WalletProvider'
import '@styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='relative'>
      <WalletContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </WalletContextProvider>
    </div>
  )
}
