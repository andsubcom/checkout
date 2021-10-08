import { shortenIfAddress, useEthers } from '@usedapp/core'
import { useSendSubscribe, useSendApproveUnlimited, useTokenAllowance } from 'src/hooks'
import { formatPeriod } from 'src/utils'
import { ethers, utils } from 'ethers'
import Image from 'next/image'
import styles from 'styles/Widget.module.css'
import ProgressBar from './ProgressBar'


const hubAddress = process.env.andsubHubAddress
const token = process.env.token


// product supposed to be non-null
const Product = ({ product }) => {
  var name = 'Hodler Pro – Monthly' // TODO: remove filling empty data when contract updated
  var price = `${utils.formatUnits(product.amount, token.decimals)} ${token.symbol}`
  var period = formatPeriod(product.period.toNumber())

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
        <div className={styles.period}>{`per ${period}`}</div>
      </div>
    </>
  )
}


const Button = ({ hasAllowance, subscribeClick, approveClick, selectedToken }) => {
  return (
    <button className={styles.button} onClick={hasAllowance ? subscribeClick : approveClick}>
      {!hasAllowance &&
        <>
          <Image src='/unlock.svg' width='20px' height='20px' alt='Unlock' />
          <span style={{ width: '6px' }} />
        </>
      }
      {hasAllowance ? 'Subscribe' : `Approve ${selectedToken.symbol}`}
      {!hasAllowance && <span style={{ width: '13px' }} />}
    </button>
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


const Widget = ({ pid, product }) => {
  const selectedToken = token
  const { account } = useEthers()

  const allowance = useTokenAllowance(selectedToken.address, account)
  const hasAllowance = allowance ? allowance.gt(product.amount) : false

  const { state: approveState, send: sendApprove } = useSendApproveUnlimited(selectedToken.address)
  
  const approveClick = () => {
    // TODO: show loader
    sendApprove(hubAddress, ethers.constants.MaxUint256)
  }
  
  const { state: subscribeState, send: sendSubscribe } = useSendSubscribe()
  const subscribeClick = () => {
    console.log('subscribe')
    // TODO: show loader
    sendSubscribe(pid, true)
  }

  // TODO: hide loader when createState.status gets value of 'Mined'
  // const hasPendingTransaction = state


  return (
    <div className={styles.widget}>
      <Product product={product} />
      <Space size='45px' />

      <Separator text='Connect wallet' />
      <Space size='20px' />

      <BoxTitle text={'Account'} />
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={styles.coinsymbol}>USDT</div>
            <span style={{ width: '4px' }} />
            {!hasAllowance && <Image src='/lock.svg' width='14px' height='14px' alt='No allowance' />}
          </div>
          <div className={styles.coinname}>Tether</div>
        </div>
        <div className={styles.coinbalance}>1,402.00</div>
        <BoxDropdown />
      </div>

      <Button hasAllowance={hasAllowance} subscribeClick={subscribeClick} approveClick={approveClick} selectedToken={selectedToken} />

      <div className={styles.hint}>
        {
          hasAllowance
            ? 'By confirming your subscription you allow Company to charge you for this payment and future payments. Payments processed on-chain.'
            : `By apprving you allow Andsub contract to charge ${selectedToken.symbol} from your account. The contract can\'t transfer more than a subscription rate per period.`
        }
      </div>
    </div>
  )
}

export default Widget