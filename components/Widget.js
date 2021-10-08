import { shortenIfAddress, useEthers, useTokenBalance } from '@usedapp/core'
import { useSendSubscribe, useSendApproveUnlimited, useTokenAllowance } from 'src/hooks'
import { useState } from 'react'
import { formatPeriod } from 'src/utils'
import { ethers, utils } from 'ethers'
import Image from 'next/image'
import styles from 'styles/Widget.module.css'
import ProgressBar from 'components/ProgressBar'


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


const Button = ({ hasAllowance, subscribeClick, approveClick, selectedToken, loading }) => {
  const click = loading ? null : (hasAllowance ? subscribeClick : approveClick)

  return (
    <button className={`${styles.button} ${loading && styles.buttonLoading}`} onClick={click}>
      {loading && <ProgressBar className={styles.progressBar} color={'#FFFFFF'} />}
      {!loading && !hasAllowance &&
        <>
          <Image src='/unlock.svg' width='20px' height='20px' alt='Unlock' />
          <span style={{ width: '6px' }} />
        </>
      }
      {!loading && 
        (hasAllowance ? 'Subscribe' : `Approve ${selectedToken.symbol}`)
      }
      {!loading && !hasAllowance && <span style={{ width: '13px' }} />}
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

  const [hasPendingTransaction, setHasPendingTransaction] = useState(false)

  const allowance = useTokenAllowance(selectedToken.address, account)
  const hasAllowance = allowance ? allowance.gt(product.amount) : undefined

  const { state: approveState, send: sendApprove } = useSendApproveUnlimited(selectedToken.address)
  const approveClick = () => { sendApprove(hubAddress, ethers.constants.MaxUint256) }

  const { state: subscribeState, send: sendSubscribe } = useSendSubscribe()
  const subscribeClick = () => { sendSubscribe(pid, true) }

  // 'None' | 'Mining' | 'Success' | 'Fail' | 'Exception'
  const pendingStatuses = ['Mining']
  const newHasPendingTransaction = pendingStatuses.includes(approveState.status) || pendingStatuses.includes(subscribeState.status)
  console.log('newHasPendingTransaction =', newHasPendingTransaction)
  if (hasPendingTransaction != newHasPendingTransaction) {
    setHasPendingTransaction(newHasPendingTransaction)
  }
  console.log('approveState.status =', approveState.status, 'subscribeState.status =', subscribeState.status)

  const tokenBalance = useTokenBalance(selectedToken.address, account)
  const tokenBalanceFormatted = tokenBalance ? utils.formatUnits(tokenBalance, selectedToken.decimals) : undefined

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
            <div className={styles.coinsymbol}>{selectedToken.symbol}</div>
            <span style={{ width: '4px' }} />
            {!hasAllowance && <Image src='/lock.svg' width='14px' height='14px' alt='No allowance' />}
          </div>
          <div className={styles.coinname}>{selectedToken.name}</div>
        </div>
        <div className={styles.coinbalance}>{tokenBalanceFormatted}</div>
        <BoxDropdown />
      </div>

      <Button hasAllowance={hasAllowance} subscribeClick={subscribeClick} approveClick={approveClick} selectedToken={selectedToken} loading={newHasPendingTransaction} />

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