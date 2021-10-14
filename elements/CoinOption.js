import React from 'react'
import PropTypes from 'prop-types'
import { useEthers, useTokenBalance } from '@usedapp/core'
import { utils } from 'ethers'

import styles from 'styles/Widget.module.css'
import dropdownStyles from 'styles/Dropdown.module.css'
import BoxIcon from './BoxIcon'

function CoinOption({token, onClick}) {
  const { account } = useEthers()
  const tokenBalance = useTokenBalance(token.address, account)
  const tokenBalanceFormatted = tokenBalance ? utils.formatUnits(tokenBalance, token.decimals) : undefined

  return (
    <div key={token.address} className={dropdownStyles.disabledItem} onClick={onClick}>
      <BoxIcon src={token.icon} alt='Coin logo' />
      <div className={styles.networkname}>{token.symbol} <div className={dropdownStyles.soon}>exchange fee</div></div>
      <div className={dropdownStyles.amount}>{tokenBalanceFormatted}</div>
    </div>
  )
}

CoinOption.propTypes = {

}

export default CoinOption

