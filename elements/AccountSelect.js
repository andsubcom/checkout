import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useEthers, shortenIfAddress } from '@usedapp/core'

import BoxIcon from './BoxIcon'
import BoxDropdown from './BoxDropdown'

import styles from 'styles/Widget.module.css'
import dropdownStyles from 'styles/Dropdown.module.css'

import { useOnClickOutside } from 'src/utils'

function AccountSelect(props) {
  const { account } = useEthers()
  const ref = useRef()
  const [isOpen, setIsOpen] = useState(false)

  useOnClickOutside(ref, () => setIsOpen(false))

  const handleSelectClick = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = () => {
    setIsOpen(false)
  }

  return (
    <div className={dropdownStyles.wrapper} ref={ref}>
      <div className={styles.accountbox} onClick={handleSelectClick}>
        <BoxIcon src='/metamask.svg' alt='Metamask logo' />
        <div className={styles.account}>{account ? shortenIfAddress(account) : 'Connect wallet'}</div>
        <BoxDropdown />
      </div>
      <div className={dropdownStyles.container} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className={dropdownStyles.item} onClick={handleItemClick}>
          <BoxIcon src='/metamask.svg' alt='Metamask logo' />
          <div className={styles.account}>{ shortenIfAddress(account) }</div>
        </div>
      </div>
    </div>
  )
}

AccountSelect.propTypes = {

}

export default AccountSelect

