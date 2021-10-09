import { formatPeriod } from 'src/utils'
import { utils } from 'ethers'
import Image from 'next/image'
import styles from 'styles/Product.module.css'


// product supposed to be non-null
const Product = ({ product }) => {
  // TODO: get token address from product
  const payableToken = '0x6ef6f7ca5fb523c0cf8f793cd9c3eef228e86679'
  const token = process.env.tokens[payableToken]

  const name = 'Hodler Pro – Monthly' // TODO: remove filling empty data when contract updated
  const price = `${utils.formatUnits(product.amount, token.decimals)} ${token.symbol}`
  const period = formatPeriod(product.period.toNumber())

  return (
    <div className={styles.container}>
      <div className={styles.subscribe}>Subscribe to</div>
      <div className={styles.product}>
        {name && <Image
          src='/product-logo.png' alt='Product logo'
          width={24} height={24}
        />}
        <div className={styles.name}>{name}</div>
      </div>

      <div className={styles.pricebox} style={{ marginTop: '35px' }}>
        <div className={styles.price}>{price}</div>
        <div className={styles.period}>{`per ${period}`}</div>
      </div>

      <p>Powered by Andsub</p>
    </div>
  )
}

export default Product