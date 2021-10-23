import { useCallback, useEffect, useReducer } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { providers } from 'ethers'
import { useEthers } from '@usedapp/core'
import Web3Modal from 'web3modal'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'
const rpc_url =  'https://mainnet.infura.io/v3/60ab76e16df54c808e50a79975b4779f'
const rpc_url3 =  'https://ropsten.infura.io/v3/60ab76e16df54c808e50a79975b4779f'

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: rpc_url, 3: rpc_url3 },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 12000
})

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
}

let web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet',
    // network: 'ropsten',
    cacheProvider: true,
    providerOptions,
  })
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:

  }
}


const Test = () => {
  const pid = 'andsub_demo'
  const { library, activate } = useEthers()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId } = state

  const connect = useCallback(async function () {
    activate(walletconnect)
  }, [])

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
    },
    [provider]
  )

  // Auto connect to the cached provider
  // useEffect(() => {
  //   if (web3Modal.cachedProvider) {
  //     connect()
  //   }
  // }, [connect])

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
      }

      const handleChainChanged = (accounts) => {
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
      }

      const handleDisconnect = (error) => {
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  // const chainData = getChainData(chainId)

  console.log('address', address)

  return (
    <div>
      { web3Provider ? (
          <button className="button" type="button" onClick={disconnect}>
            Disconnect
          </button>
        ) : (
          <button className="button" type="button" onClick={connect}>
            Connect
          </button>
        )}
    </div>
  )
}

Test.getInitialProps = () => {
  return {
    
  }
}

export default Test
