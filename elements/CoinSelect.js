import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useEthers, useTokenBalance } from '@usedapp/core'
import { utils } from 'ethers'

import BoxIcon from './BoxIcon'
import BoxDropdown from './BoxDropdown'

import styles from 'styles/Widget.module.css'
import dropdownStyles from 'styles/Dropdown.module.css'

import { useOnClickOutside } from 'src/utils'

function CoinSelect({selectedToken, hasAllowance}) {
  const { account } = useEthers()
  const tokenBalance = useTokenBalance(selectedToken.address, account)
  const tokenBalanceFormatted = tokenBalance ? utils.formatUnits(tokenBalance, selectedToken.decimals) : undefined

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
      <div className={styles.coinbox} onClick={handleSelectClick}>
        <BoxIcon src='/coin-logo.png' alt='Coin logo' />
        <div className={styles.coincontent}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={styles.coinsymbol}>{selectedToken.symbol}</div>
            <span style={{ width: '4px' }} />
            {!hasAllowance && <Image src='/lock.svg' width='14px' height='14px' alt='No allowance' />}
          </div>
          <div className={styles.coinname}>{selectedToken.name}</div>
        </div>
        <div className={styles.coinbalance}>{tokenBalanceFormatted}</div>
        <BoxDropdown />
      </div>
      <div className={dropdownStyles.container} style={{ display: isOpen ? 'block' : 'none', top: '64px' }}>
        <div className={dropdownStyles.item} onClick={handleItemClick}>
          <BoxIcon src='/coin-logo.png' alt='Coin logo' />
          <div className={styles.networkname}>USDX</div>
        </div>
        <div className={dropdownStyles.disabledItem} onClick={handleItemClick}>
        <BoxIcon src='/coin-logo.png' alt='Coin logo' />
          <div className={styles.networkname}>USDY</div>
          <div className={styles.soon}>soon</div>
        </div>
        <div className={dropdownStyles.disabledItem} onClick={handleItemClick}>
        <BoxIcon src='/coin-logo.png' alt='Coin logo' />
          <div className={styles.networkname}>USDZ</div>
          <div className={styles.soon}>soon</div> 
        </div>
      </div>
    </div>
  )
}

CoinSelect.propTypes = {

}

export default CoinSelect
