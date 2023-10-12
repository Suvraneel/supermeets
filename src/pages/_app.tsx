import Navbar from '@components/Layout/Navbar'
import WalletContextProvider from '@components/WalletProvider'
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Suspense } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <Navbar />
      <Suspense>
        <div className='mt-12'>
          <Component {...pageProps} />
        </div>
      </Suspense>
    </WalletContextProvider>
  )
}
