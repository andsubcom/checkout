import { useEthers, shortenIfAddress } from '@usedapp/core'
import { networkNameById } from 'src/utils'
import styles from 'styles/Header.module.css'

import Image from 'next/image'

import { Wallet } from 'react-iconly'

const Account = () => {
  const { activateBrowserWallet, account, chainId, active, library } = useEthers()
  const connected = !!chainId
  // console.log('chainId =', chainId, 'account =', account, 'active =', active, 'library =', library)

  return (
    <div className={styles.container}>
      {connected && <div className={styles.whiteNetwork}>{ chainId === 3 ? networkNameById(chainId) : <span className='error'>Switch to Ropsten</span>}</div>}
      {/* {!networkCorrect && account  && <div className={styles.network}>{`Swtich to Ropsten`}</div>} */}
      {connected && account && <div className={styles.account}>{account}</div>}
      {connected && account && <div className={styles.accountMobile}>{shortenIfAddress(account)}</div>}
      {!account && <button className={styles.button} onClick={() => { activateBrowserWallet() }}><Image src='/metamask-fox.svg' width="30px" height="30px" alt=""/> Connect MetaMask</button>}
      {!account && <div className={styles.walletIcon}>
        <Image src='/metamask-fox.svg' width="30px" height="30px" alt="" />
      </div>}
    </div>
  )
}

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}><Image src='/logo-text-white.png' width="130px" height="39px" alt="" /></div>
      <Account />
    </div>
  )
}

export default Header