import SUBSCRIPTION_HUB_ABI from 'public/abi/SubscriptionsHub.json'
import { Contract } from 'ethers'

const ANDSUB_HUB_ADDRESS = process.env.andsubHubAddress
const XTOKEN_ADDRESS = process.env.xTokenAddress

export const fetchSubscription = async function (provider, productId) {
  const contract = new Contract(ANDSUB_HUB_ADDRESS, SUBSCRIPTION_HUB_ABI, provider)
  return await contract.getSubscriptionInfo(productId)
}

export const fetchSubscriptions = async function (provider, organizationId) {
  const contract = new Contract(ANDSUB_HUB_ADDRESS, SUBSCRIPTION_HUB_ABI, provider)
  const productIds = await contract.getAllsubscriptionsForOrganization(organizationId)
  const requests = productIds.map((productId) => contract.getSubscriptionInfo(productId))
  return await Promise.all(requests)
}