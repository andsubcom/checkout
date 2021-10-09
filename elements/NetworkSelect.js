import React from 'react'
import PropTypes from 'prop-types'

import BoxIcon from './BoxIcon'
import BoxDropdown from './BoxDropdown'

import styles from 'styles/Widget.module.css'

function NetworkSelect(props) {
  return (
    <div>
      <div className={styles.nextworkbox}>
        <BoxIcon src='/eth-logo.svg' alt='Ethereum logo' />
        <div className={styles.networkname}>Ethereum</div>
        <BoxDropdown />
      </div>
    </div>
  )
}

NetworkSelect.propTypes = {

}

export default NetworkSelect