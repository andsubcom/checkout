import { useEthers } from '@usedapp/core'
import { networkNameById } from 'src/utils'
import styles from 'styles/Header.module.css'

const Account = () => {
  const { activateBrowserWallet, account, chainId } = useEthers()
  const networkCorrect = chainId === 3

  return (
    <div className={styles.container}>
      <div>{networkNameById(chainId)}</div>
      {/* {!networkCorrect && account  && <div className={styles.network}>{`Swtich to Ropsten`}</div>} */}
      {account && <div className={styles.account}>{account}</div>}
      {!account && <button className={styles.button} onClick={() => { activateBrowserWallet() }}>Connect Wallet</button>}
    </div>
  )
}

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>Andsub Checkout</div>
      <Account />
    </div>
  )
}

export default Header