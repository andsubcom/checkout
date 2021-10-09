
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useEthers, shortenIfAddress } from '@usedapp/core'

import BoxIcon from './BoxIcon'
import BoxDropdown from './BoxDropdown'

import styles from 'styles/Widget.module.css'
import dropdownStyles from 'styles/Dropdown.module.css'

import { useOnClickOutside } from 'src/utils'

function NetworkSelect(props) {
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
      <div className={styles.nextworkbox} onClick={handleSelectClick}>
        <BoxIcon src='/eth-logo.svg' alt='Ethereum logo' />
        <div className={styles.networkname}>Ethereum</div>
        <BoxDropdown />
      </div>
      <div className={dropdownStyles.container} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className={dropdownStyles.item} onClick={handleItemClick}>
          <BoxIcon src='/eth-logo.svg' alt='Ethereum logo' />
          <div className={styles.networkname}>Ethereum 1</div>
        </div>
        <div className={dropdownStyles.disabledItem} onClick={handleItemClick}>
          <BoxIcon src='/eth-logo.svg' alt='Ethereum logo' />
          <div className={styles.networkname}>Ethereum 2</div>
          <div className={styles.soon}>soon</div>
        </div>
        <div className={dropdownStyles.disabledItem} onClick={handleItemClick}>
          <BoxIcon src='/eth-logo.svg' alt='Ethereum logo' />
          <div className={styles.networkname}>Ethereum 3</div>
          <div className={styles.soon}>soon</div> 
        </div>
      </div>
    </div>
  )
}

NetworkSelect.propTypes = {

}

export default NetworkSelect
