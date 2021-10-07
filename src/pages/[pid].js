import { useEthers } from '@usedapp/core'
import Widget from 'components/Widget'
import { useRouter } from 'next/router'
import { useIsSubscribed, useSubscriptionInfo } from 'src/hooks'


const Checkout = () => {
  const router = useRouter()
  const { pid } = router.query
  // console.log(`query = ${JSON.stringify(router.query)}, pid = ${pid}`)

  var isSubscribed = useIsSubscribed(pid)
  const product = useSubscriptionInfo(pid)
  const loading = typeof isSubscribed === 'undefined' || !product


  // TODO: testing subscribed layout
  // if (typeof isSubscribed !== 'undefined') {
  //   isSubscribed = true
  // }

  return <>
    {loading && <p>...</p>}
    {!loading &&
      (isSubscribed
        ? <p>Subscribed</p>
        : <Widget pid={pid} product={product}/>
      )
    }
  </>
}

export default Checkout
