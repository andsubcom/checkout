import { useState, useEffect } from 'react'
import { useContractCall, useContractFunction, useEthers } from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import ANDSUB_HUB_ABI from 'public/abi/ProductsHub.json'
import MINTABLE_ERC20_ABI from 'public/abi/MintableERC20.json'
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'


const ANDSUB_HUB_ADDRESS = process.env.NEXT_PUBLIC_ANDSUB_ADDRESS

// andsub

export const useProductInfo = (productId) => useContractCall({
  abi: new Interface(ANDSUB_HUB_ABI),
  address: ANDSUB_HUB_ADDRESS,
  method: 'getProductInfo',
  args: [productId]
})

export const useIsSubscribed = (productId) => {
  const { account } = useEthers()

  const tokenId = useContractCall(account && {
    abi: new Interface(ANDSUB_HUB_ABI),
    address: ANDSUB_HUB_ADDRESS,
    method: 'findTokenId',
    args: [productId, account]
  }) ?? 0
  return tokenId.toString() === '0' ? false : true
}

export const useSendSubscribe = function () {
  const abi = new utils.Interface(ANDSUB_HUB_ABI)
  const contract = new Contract(ANDSUB_HUB_ADDRESS, abi)
  return useContractFunction(contract, 'subscribe', { transactionName: 'Subscribe'})
}

export const useSendCancel = function () {
  const abi = new utils.Interface(ANDSUB_HUB_ABI)
  const contract = new Contract(ANDSUB_HUB_ADDRESS, abi)
  return useContractFunction(contract, 'cancel', { transactionName: 'Cancel Subscription'})
}

// token

export const useTokenAllowance = function (tokenAddress, account) {
  const [allowance] = useContractCall(tokenAddress && account && {
    abi: new Interface(MINTABLE_ERC20_ABI),
    address: tokenAddress,
    method: 'allowance',
    args: [account, ANDSUB_HUB_ADDRESS]
  }) ?? []

  return allowance
}

export const useSendApproveUnlimited = function (tokenAddress) {
  const abi = new utils.Interface(MINTABLE_ERC20_ABI)
  const contract = new Contract(tokenAddress, abi)
  return useContractFunction(contract, 'approve', { transactionName: 'Approve'})
}

export const useSendMintTokens = function (tokenAddress) {
  const abi = new utils.Interface(MINTABLE_ERC20_ABI)
  const contract = new Contract(tokenAddress, abi)
  return useContractFunction(contract, 'mint', { transactionName: 'Mint'})
}