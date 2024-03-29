import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useEthers, shortenIfAddress } from '@usedapp/core'

import BoxIcon from './BoxIcon'
import BoxDropdown from './BoxDropdown'

import styles from 'styles/Widget.module.css'
import dropdownStyles from 'styles/Dropdown.module.css'

import { useOnClickOutside } from 'src/utils'

function AccountSelect(props) {
  const { account, activateBrowserWallet } = useEthers()
  const ref = useRef()
  const [isOpen, setIsOpen] = useState(false)

  useOnClickOutside(ref, () => setIsOpen(false))

  const handleConnectClick = () => {
    activateBrowserWallet()
  }

  const handleSelectClick = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = () => {
    setIsOpen(false)
  }

  return (
    <div className={dropdownStyles.wrapper} ref={ref}>
      <div className={styles.accountbox} onClick={ account ? handleSelectClick : handleConnectClick }>
        <BoxIcon src='/metamask.svg' alt='Metamask logo' />
        <div className={styles.account}>{account ? shortenIfAddress(account) : 'Connect wallet'}</div>
        <BoxDropdown />
      </div>
      <div className={dropdownStyles.container} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className={dropdownStyles.item} onClick={handleItemClick}>
          <BoxIcon src='/metamask.svg' alt='Metamask logo' />
          <div className={styles.account}>{ shortenIfAddress(account) }</div>
        </div>
        <div className={dropdownStyles.item} onClick={handleItemClick} style={{paddingTop: '8px', paddingBottom: '14px'}}>
          <div className={styles.account}><Icon style={{marginLeft: '-10px', position: 'relative', top: '5px'}} /> Connect another wallet</div>
        </div>
      </div>
    </div>
  )
}

AccountSelect.propTypes = {

}

export default AccountSelect

const Icon = ({...props}) => <svg width="24" height="24" fill="none" {...props}><path d="M12 3.85A1.15 1.15 0 0010.85 5v5.85H5a1.15 1.15 0 000 2.3h5.85V19a1.15 1.15 0 002.3 0v-5.85H19a1.15 1.15 0 000-2.3h-5.85V5A1.15 1.15 0 0012 3.85z" fill="currentColor"></path></svg>

