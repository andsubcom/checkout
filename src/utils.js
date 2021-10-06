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