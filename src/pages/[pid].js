import { useEthers } from '@usedapp/core'
import Widget from 'components/Widget'
import Subscribed from 'components/Subscribed'
import { useRouter } from 'next/router'
import { useIsSubscribed, useSubscriptionInfo } from 'src/hooks'


const Checkout = () => {
  const router = useRouter()
  const { pid } = router.query
  // console.log(`query = ${JSON.stringify(router.query)}, pid = ${pid}`)

  var isSubscribed = useIsSubscribed(pid)
  console.log('isSubscribed =', isSubscribed)

  const product = useSubscriptionInfo(pid)
  const loading = typeof isSubscribed === 'undefined' || !product

  // TODO: check by id/slug/something
  const productNotFound = product && product.amount == 0

  // TODO: testing subscribed layout
  // if (typeof isSubscribed !== 'undefined') {
  //   isSubscribed = true
  // }

  return <>
    {loading && <span></span>}
    {!loading && productNotFound && 
      <p>Product <span className='highlightSpan'>{pid}</span> not found</p>
    }
    {!loading && !productNotFound && 
      (isSubscribed
        ? <Subscribed pid={pid} product={product} />
        : <Widget pid={pid} product={product} />
      )
    }
  </>
}

export default Checkout
