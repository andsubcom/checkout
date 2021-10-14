
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import BoxIcon from './BoxIcon'
import BoxDropdown from './BoxDropdown'

import styles from 'styles/Widget.module.css'
import dropdownStyles from 'styles/Dropdown.module.css'

import { useOnClickOutside } from 'src/utils'

function NetworkSelect(props) {
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
        <BoxIcon src='/ethereum.svg' alt='Ethereum logo' />
        <div className={styles.networkname}>Ropsten</div>
        <BoxDropdown />
      </div>
      <div className={dropdownStyles.container} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className={dropdownStyles.item} onClick={handleItemClick}>
          <BoxIcon src='/ethereum.svg' alt='Ethereum logo' />
          <div className={styles.networkname}>Ropsten</div>
        </div>
        <div className={dropdownStyles.disabledItem} onClick={handleItemClick}>
          <BoxIcon src='/bsc.svg' alt='Ethereum logo' />
          <div className={styles.networkname}>BSC Mainnet</div>
          <div className={dropdownStyles.soon2}>soon</div>
        </div>
        <div className={dropdownStyles.disabledItem} onClick={handleItemClick}>
          <BoxIcon src='/polygon.svg' alt='Ethereum logo' />
          <div className={styles.networkname}>Polygon</div>
          <div className={dropdownStyles.soon2}>soon</div> 
        </div>
        <div className={dropdownStyles.disabledItem} onClick={handleItemClick}>
          <BoxIcon src='/optimism.svg' alt='Ethereum logo' />
          <div className={styles.networkname}>Optimism</div>
          <div className={dropdownStyles.soon2}>soon</div> 
        </div>
        <div className={dropdownStyles.disabledItem} onClick={handleItemClick}>
          <BoxIcon src='/arbitrum.svg' alt='Ethereum logo' />
          <div className={styles.networkname}>Arbitrum</div>
          <div className={dropdownStyles.soon2}>soon</div> 
        </div>
      </div>
    </div>
  )
}

NetworkSelect.propTypes = {

}

export default NetworkSelect
