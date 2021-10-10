import { useEthers, useTokenBalance } from '@usedapp/core'
import { useSendSubscribe, useSendApproveUnlimited, useTokenAllowance } from 'src/hooks'
import { useState } from 'react'
import { ethers, utils } from 'ethers'
import Image from 'next/image'
import styles from 'styles/Widget.module.css'
import ProgressBar from 'components/ProgressBar'

import { AccountSelect, CoinSelect, NetworkSelect } from 'elements'

const hubAddress = process.env.NEXT_PUBLIC_ANDSUB_ADDRESS


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
  // TODO: get token address from product
  const payableToken = '0x6ef6f7ca5fb523c0cf8f793cd9c3eef228e86679'
  const selectedToken = process.env.tokens[payableToken]

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

  return (
    <div className={styles.widget}>
      <Space size='45px' />

      <Separator text='Connect wallet' />
      <Space size='20px' />

      <BoxTitle text={'Account'} />
      <AccountSelect />

      <Space size='25px' />

      <BoxTitle text='Network' />
      <NetworkSelect />

      <Space size='50px' />
      <Separator text='Subscribe with crypto' />
      <Space size='20px' />

      <BoxTitle text='Pay with' />
      <CoinSelect selectedToken={selectedToken} hasAllowance={hasAllowance} />

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