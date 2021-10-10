import SUBSCRIPTION_HUB_ABI from 'public/abi/ProductsHub.json'
import { Contract } from 'ethers'

const ANDSUB_ADDRESS = process.env.NEXT_PUBLIC_ANDSUB_ADDRESS

export const fetchSubscription = async function (provider, productId) {
  const contract = new Contract(ANDSUB_ADDRESS, SUBSCRIPTION_HUB_ABI, provider)
  return await contract.getProductInfo(productId)
}