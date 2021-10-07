import Widget from 'components/Widget'
import { useRouter } from 'next/router'


const Checkout = () => {
  const router = useRouter()
  const { pid } = router.query
  console.log(`query = ${JSON.stringify(router.query)}, pid = ${pid}`)

  return <Widget pid={pid} />
}

export default Checkout
