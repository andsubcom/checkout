import { useState, useEffect } from 'react'
import { useContractCall, useContractFunction, useEthers } from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import ANDSUB_HUB_ABI from 'public/abi/SubscriptionsHub.json'
import ERC20_ABI from 'public/abi/ERC20.json'
import { fetchSubscriptions } from './api'
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'


const ANDSUB_HUB_ADDRESS = process.env.andsubHubAddress


export const useSubscriptionInfo = (productId) => useContractCall({
  abi: new Interface(ANDSUB_HUB_ABI),
  address: ANDSUB_HUB_ADDRESS,
  method: 'getSubscriptionInfo',
  args: [productId]
})

export const useIsSubscribed = (productId) => {
  const { account } = useEthers()

  const [isSubscribed] = useContractCall(account && {
    abi: new Interface(ANDSUB_HUB_ABI),
    address: ANDSUB_HUB_ADDRESS,
    method: 'checkUserHasActiveSubscription',
    args: [account, productId]
  }) ?? []
  return isSubscribed
}

export const useSubscriptions = function (organizationId) {
  const { library } = useEthers()
  const [products, setProducts] = useState()

  useEffect(() => {
    if (library) {
      async function f() {
        const products = await fetchSubscriptions(library, organizationId)
        setProducts(products)
      }
      f()
    }
  }, [library, organizationId])

  return products
}

export const useTokenAllowance = function (tokenAddress, account) {
  const [allowance] = useContractCall(tokenAddress && account && {
    abi: new Interface(ERC20_ABI),
    address: tokenAddress,
    method: 'allowance',
    args: [account, ANDSUB_HUB_ADDRESS]
  }) ?? []

  return allowance
}

export const useSendApproveUnlimited = function (tokenAddress) {
  const abi = new utils.Interface(ERC20_ABI)
  const contract = new Contract(tokenAddress, abi)
  return useContractFunction(contract, 'approve', { transactionName: 'Approve'})
}

export const useSendSubscribe = function () {
  const abi = new utils.Interface(ANDSUB_HUB_ABI)
  const contract = new Contract(ANDSUB_HUB_ADDRESS, abi)
  return useContractFunction(contract, 'buySubscription', { transactionName: 'Subscribe'})
}

export const useSendCancel = function () {
  const abi = new utils.Interface(ANDSUB_HUB_ABI)
  const contract = new Contract(ANDSUB_HUB_ADDRESS, abi)
  return useContractFunction(contract, 'cancel', { transactionName: 'Cancel Subscription'})
}