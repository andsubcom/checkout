import React from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEthers, useTokenBalance } from '@usedapp/core'
import { utils } from 'ethers'

import BoxIcon from './BoxIcon'
import BoxDropdown from './BoxDropdown'

import styles from 'styles/Widget.module.css'

function CoinSelect({selectedToken, hasAllowance}) {
  const { account } = useEthers()
  const tokenBalance = useTokenBalance(selectedToken.address, account)
  const tokenBalanceFormatted = tokenBalance ? utils.formatUnits(tokenBalance, selectedToken.decimals) : undefined

  return (
    <div>
      <div className={styles.coinbox}>
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
    </div>
  )
}

CoinSelect.propTypes = {

}

export default CoinSelect
