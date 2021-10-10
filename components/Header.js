import { useEthers } from '@usedapp/core'
import { networkNameById } from 'src/utils'
import styles from 'styles/Header.module.css'

const Account = () => {
  const { activateBrowserWallet, account, chainId, active } = useEthers()
  const connected = !!chainId
  // console.log('chainId =', chainId, 'account =', account, 'active =', active, 'library =', library)

  return (
    <div className={styles.container}>
      {connected && <div className={styles.whiteNetwork}>{networkNameById(chainId)}</div>}
      {/* {!networkCorrect && account  && <div className={styles.network}>{`Swtich to Ropsten`}</div>} */}
      {connected && account && <div className={styles.account}>{account}</div>}
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