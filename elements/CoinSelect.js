import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useEthers, useTokenBalance } from '@usedapp/core'
import { utils } from 'ethers'

import BoxIcon from './BoxIcon'
import BoxDropdown from './BoxDropdown'

import styles from 'styles/Widget.module.css'
import dropdownStyles from 'styles/Dropdown.module.css'

import { useOnClickOutside } from 'src/utils'
import CoinOption from './CoinOption'

// function tokenOption(token, onClick) {


//   return (
//     <div key={token.address} className={dropdownStyles.disabledItem} onClick={onClick}>
//       <BoxIcon src={token.icon} alt='Coin logo' />
//       <div className={styles.networkname}>{token.symbol}</div>
//       <div className={dropdownStyles.soon}>exchange fee</div>
//     </div>
//   )
// }

function CoinSelect({selectedToken, hasAllowance}) {
  const { account } = useEthers()
  const otherTokens = Object.keys(process.env.tokens).filter(key => key !== selectedToken.address).map((key) => {return process.env.tokens[key]})
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
        <BoxIcon src={selectedToken.icon} alt='Coin logo' />
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
          <BoxIcon src={selectedToken.icon} alt='Coin logo' />
          <div className={styles.networkname}>{selectedToken.symbol}</div>
          <div className={dropdownStyles.amount}>{tokenBalanceFormatted}</div>
        </div>
        { otherTokens.map( token => {
          return <CoinOption key={token.address} token={token} onClick={handleItemClick} />
        })}
      </div>
    </div>
  )
}

CoinSelect.propTypes = {

}

export default CoinSelect
