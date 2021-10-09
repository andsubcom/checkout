import React from 'react'
import PropTypes from 'prop-types'
import { useEthers, shortenIfAddress } from '@usedapp/core'

import BoxIcon from './BoxIcon'
import BoxDropdown from './BoxDropdown'

import styles from 'styles/Widget.module.css'

function AccountSelect(props) {
  const { account } = useEthers()

  return (
    <div>
      <div className={styles.accountbox}>
        <BoxIcon src='/metamask.svg' alt='Metamask logo' />
        <div className={styles.account}>{account ? shortenIfAddress(account) : 'Connect wallet'}</div>
        <BoxDropdown />
      </div>
    </div>
  )
}

AccountSelect.propTypes = {

}

export default AccountSelect

