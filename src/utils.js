export const networkNameById = function (id) {
  switch (id) {
    case 1:
      return 'Ethereum mainnet'
    case 3:
      return 'Ropsten'
    case 4:
      return 'Rinkeby'
    case 5:
      return 'Goerli'
    case 42:
      return 'Kovan'
    case 56:
      return 'BSC'
    case 137:
      return 'Polygon'
    default:
      return 'Unknown network'
  }
}

export const formatAccount = (account) => account.slice(0, 6) + '...' + account.slice(-4)

// TODO: parse and return dymanic values
export const formatPeriod = function (period) {
  switch (period) {
    case 300:
      return '5 minutes'
    case 900:
      return '15 minutes'
    case 1800:
      return '30 minutes'
    case 86400:
      return 'day'
    case 604800:
      return 'week'
    case 2629743:
      return 'month'
    case 31556926:
      return 'year'
    default:
      return `${period} seconds`
  }
}