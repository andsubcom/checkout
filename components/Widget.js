import { shortenIfAddress, useEthers } from '@usedapp/core'
import { useSubscriptionInfo } from 'src/hooks'
import { formatPeriod } from 'src/utils'
import { utils } from 'ethers'
import Image from 'next/image'
import styles from 'styles/Widget.module.css'


// TODO: tokens data going to be hardcoded
// TODO: add actual address of token on Ropsten
// TODO: ideally retreive token data from Ropsten statically on build
const TOKEN = {
  address: '0x0',
  name: 'Tether',
  symbol: 'USDT',
  decimals: 18,
}


const Product = ({ pid }) => {
  const product = useSubscriptionInfo(pid)
  console.log(`product = ${JSON.stringify(product)}`)

  // TODO: remove filling empty data when contract updates
  if (product.amount) {
    product['name'] = 'Hodler Pro – Monthly'
  }
  
  var name = product.name ? product.name : ''
  var price = product.amount ? `${utils.formatUnits(product.amount, TOKEN.decimals)} ${TOKEN.symbol}` : ''
  var period = product.period ? formatPeriod(product.period.toNumber()) : ''

  return (
    <>
      <div className={styles.subscribe}>Subscribe to</div>
      <div className={styles.product}>
        {name && <BoxIcon src='/product-logo.png' alt='Product logo' />}
        <div className={styles.name}>{name}</div>
      </div>

      <Space size='35px' />

      <div className={styles.pricebox}>
        <div className={styles.price}>{price}</div>
        <div className={styles.period}>per {period}</div>
      </div>
    </>
  )
}

const BoxTitle = ({ text }) => <div className={styles.boxtitle}>{text}</div>

const BoxIcon = ({ src, alt }) => <Image
  className={styles.boxicon}
  src={src} alt={alt}
  width={24} height={24}
/>

const BoxDropdown = () => <Image
  className={styles.dropdown}
  src='/arrow-down.svg' alt='Coin list dropdown'
  width={28} height={28}
/>

const Separator = ({ text }) => {
  return (
    <div style={{
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'stretch',
      alignItems: 'center',
      padding: '0px 0px 0px 0px'
    }}>
      <div style={{ height: '1px', background: '#4e6180', flexGrow: '1' }} />
      <div style={{ padding: '0px 15px', color: '#4e6180', fontSize: '16px' }}>{text}</div>
      <div style={{ height: '1px', background: '#4e6180', flexGrow: '1' }} />
    </div>
  )
}

const Space = ({ size }) => <div style={{ height: `${size}` }} />


const Widget = ({ pid }) => {
  const { account } = useEthers()

  return (
    <div className={styles.widget}>
      <Product pid={pid} />
      <Space size='45px' />

      <Separator text='Connect wallet' />
      <Space size='20px' />

      <BoxTitle text='Account' />
      <div className={styles.accountbox}>
        <BoxIcon src='/metamask.svg' alt='Metamask logo' />
        <div className={styles.account}>{account ? shortenIfAddress(account) : 'Connect wallet'}</div>
        <BoxDropdown />
      </div>

      <Space size='25px' />

      <BoxTitle text='Network' />
      <div className={styles.nextworkbox}>
        <BoxIcon src='/eth-logo.svg' alt='Ethereum logo' />
        <div className={styles.networkname}>Ethereum</div>
        <BoxDropdown />
      </div>

      <Space size='50px' />
      <Separator text='Subscribe with crypto' />
      <Space size='20px' />

      <BoxTitle text='Pay with' />
      <div className={styles.coinbox}>
        <BoxIcon src='/coin-logo.png' alt='Coin logo' />
        <div className={styles.coincontent}>
          <div className={styles.coinsymbol}>USDT</div>
          <div className={styles.coinname}>Tether</div>
        </div>
        <div className={styles.coinbalance}>1,402.00</div>
        <BoxDropdown />
      </div>

      <button className={styles.button}>Subscribe</button>
      <div className={styles.hint}>By confirming your subscription you allow Company to charge you for this payment and future payments. Payments processed on-chain.</div>
    </div>
  )
}

export default Widget