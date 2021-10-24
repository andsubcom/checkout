import { utils } from 'ethers'
import { formatPeriod } from 'src/utils'
import Image from 'next/image'
import styles from 'styles/Subscribed.module.css'
import { useSendCancel } from 'src/hooks'
import { useEthers } from '@usedapp/core'


const Subscribed = ({ pid, product }) => {
  const token = process.env.tokens[product.payableToken]
  const { account } = useEthers()
  const network = 'Ropsten'
  const cost = utils.formatUnits(product.price, token.decimals)
  const period = formatPeriod(product.period.toNumber())

  const { state: cancelState, send: sendCancel } = useSendCancel()
  const cancelClick = () => {
    console.log('cancel')
    // TODO: show loader
    sendCancel(pid)
  }
  // TODO: hide loader, update data when cancel mined

  return (
    <div className={styles.content}>
      <div style={{ marginLeft: '-5px' }}>
        <Image src='/success.svg' width='70px' height='70px' alt='Success' />
      </div>

      <p className={styles.title}>Subscription success</p>

      <p className={styles.text}>
        {'You\'re charged '}
        <span className='highlightSpan'>{`${cost} ${token.symbol} `}</span>
        per
        <span className='highlightSpan'>{` ${period}`}</span>
        .
      </p>

      <p className={styles.text}>
        {'You\'re subscribed to '}
        <span className='highlightSpan'>{product.name}</span>
        {' on '}
        <span className='highlightSpan'>{network} network</span>
        {' from '}
        <span className={styles.codeSpan}>{account}</span>
        {'. '}
        <a
          className='highlightSpan' style={{ cursor: 'pointer' }}
          href={`https://ropsten.rarible.com/user/${account}?tab=owned`}
          rel="noopener noreferrer" target='_blank' >
          Check
        </a>
        {' a subscription NFT in your wallet.'}
      </p>

      <p className={styles.cancel} style={{marginTop: '12px'}}>Cancel your subscription</p>
    </div>
  )
}

export default Subscribed
