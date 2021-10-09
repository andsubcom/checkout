import Widget from 'components/Widget'
import Subscribed from 'components/Subscribed'
import { useRouter } from 'next/router'
import { useIsSubscribed, useSubscriptionInfo } from 'src/hooks'
import styles from 'styles/Page.module.css'
import Product from 'components/Product'


const Checkout = () => {
  const router = useRouter()
  const { pid } = router.query

  const product = useSubscriptionInfo(pid)
  // TODO: doesn't work for string pid; usedapp returns undefined (wrong pid argument type)
  const loading = typeof product === 'undefined'
  // TODO: check by id/slug/something
  const productNotFound = !!product && product.amount == 0
  console.log('product =', product, 'loading =', loading, 'productNotFound =', productNotFound)

  var isSubscribed = useIsSubscribed(pid)
  // TODO: uncomment to test subscribed layout
  // if (typeof isSubscribed !== 'undefined') {
  //   isSubscribed = true
  // }

  return <div className={styles.layout}>
    {loading && <span></span>}
    {!loading && productNotFound &&
      <p style={{ padding: '40px', fontSize: '20px' }}>Subscription product <span className='highlightSpan'>{pid}</span> not found</p>
    }
    {!loading && !productNotFound &&
      <>
        <div className={`${styles.side} ${styles.left}`}>
          <Product product={product} />
        </div>
        <div className={styles.divider} />
        <div className={`${styles.side} ${styles.right}`}>
          {isSubscribed
            ? <Subscribed pid={pid} product={product} />
            : <Widget pid={pid} product={product} />}
        </div>
      </>
    }
  </div>
}

export default Checkout
