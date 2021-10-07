import { ChainId, DAppProvider } from '@usedapp/core'
import AppContent from 'components/AppContent'
import 'styles/globals.css'


const config = {
  readOnlyChainId: ChainId.Ropsten,
  supportedChains: [ChainId.Ropsten],
  readOnlyUrls: {
    [ChainId.Ropsten]: `https://eth-ropsten.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  },
}

function App({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <AppContent Component={Component} pageProps={pageProps}/>
    </DAppProvider>
  )
}

export default App