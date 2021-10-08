import { utils } from 'ethers'
import { formatPeriod } from 'src/utils'
import Image from 'next/image'
import styles from 'styles/Subscribed.module.css'


const Subscribed = ({ pid, product }) => {
  const token = process.env.token
  const account = '0x66814090cCA5f4cFf0262720DC82F640e6E0663f'
  const network = 'Ropsten'
  const name = 'Hodler Pro – Monthly'
  const symbols = 18

  const cost = utils.formatUnits(product.amount, token.decimals)
  const period = formatPeriod(product.period.toNumber())

  return (
    <div className={styles.content}>
      <div style={{ marginLeft: '-5px' }}>
        <Image src='/success.svg' width='70px' height='70px' alt='Success' />
      </div>

      <p className={styles.title}>Subscription success</p>

      <p className={styles.text}>
        {'You\'re charged '}
        <span className={styles.highlightSpan}>{`${cost} ${token.symbol} `}</span>
        per
        <span className={styles.highlightSpan}>{` ${period}`}</span>
        .
      </p>

      <p className={styles.text}>
        {'You\'re subscribed to '}
        <span className={styles.highlightSpan}>{name}</span>
        {' on '}
        <span className={styles.highlightSpan}>{network} network</span>
        {' from '}
        <span className={styles.codeSpan}>{account}</span>
        {'. '}
        <a
          className={styles.highlightSpan} style={{ cursor: 'pointer' }}
          href={`https://ropsten.rarible.com/user/${account}?tab=owned`}
          rel="noopener noreferrer" target='_blank' >
          Check
        </a>
        {' a subscription NFT in your wallet.'}
      </p>

      <p className={styles.cancel}>Cancel your subscription</p>
    </div>
  )
}

export default Subscribed
