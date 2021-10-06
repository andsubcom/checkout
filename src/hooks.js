import { useContractCall } from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import SUBSCRIPTION_HUB_ABI from 'public/abi/SubscriptionsHub.json'


// TODO: read from config
const SUBSCRIPTION_HUB_ADDRESS = '0xF61C6cD6FEa4E407651d94837816aD0f8be350E5'
const XTOKEN_ADDRESS = '0x6ef6f7Ca5fb523C0Cf8F793cd9C3EEF228e86679'


export const useSubscriptionInfo = (productId) => {
  const [amount, payableToken, period, organizationId] = useContractCall({
    abi: new Interface(SUBSCRIPTION_HUB_ABI),
    address: SUBSCRIPTION_HUB_ADDRESS,
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
    address: SUBSCRIPTION_HUB_ADDRESS,
    method: 'checkUserHasActiveSubscription',
    args: [account, productId]
  }) ?? []
  return isSubscribed
}