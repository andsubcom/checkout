import { formatPeriod } from 'src/utils'
import { utils } from 'ethers'
import Image from 'next/image'
import styles from 'styles/Product.module.css'

const token = process.env.token

// product supposed to be non-null
const Product = ({ product }) => {
  var name = 'Hodler Pro – Monthly' // TODO: remove filling empty data when contract updated
  var price = `${utils.formatUnits(product.amount, token.decimals)} ${token.symbol}`
  var period = formatPeriod(product.period.toNumber())

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