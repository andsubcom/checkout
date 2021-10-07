import { useContractCall } from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import SUBSCRIPTION_HUB_ABI from 'public/abi/SubscriptionsHub.json'

const ANDSUB_HUB_ADDRESS = process.env.andsubHubAddress
const XTOKEN_ADDRESS = process.env.xTokenAddress


export const useSubscriptionInfo = (productId) => {
  const [amount, payableToken, period, organizationId] = useContractCall({
    abi: new Interface(SUBSCRIPTION_HUB_ABI),
    address: ANDSUB_HUB_ADDRESS,
    method: 'getSubscriptionInfo',
    args: [productId]
  }) ?? []
  return {
    amount,
    payableToken,
    period,
    organizationId
  }
}

export const useIsAccountSubscribed = (account, productId) => {
  const [isSubscribed] = useContractCall({
    abi: new Interface(SUBSCRIPTION_HUB_ABI),
    address: ANDSUB_HUB_ADDRESS,
    method: 'checkUserHasActiveSubscription',
    args: [account, productId]
  }) ?? []
  return isSubscribed
}