import { formatPeriod } from 'src/utils'
import { utils } from 'ethers'
import Image from 'next/image'
import styles from 'styles/Product.module.css'
import { useSendMintTokens } from 'src/hooks'
import { useEthers } from '@usedapp/core'
import {useEffect, useState} from "react";


function ipfsToGateway(ipfsUri) {
  const cid = ipfsUri.substring(7)
  return `https://ipfs.io/ipfs/${cid}`
}

// product supposed to be non-null
const Product = ({ product }) => {
  const token = process.env.tokens[product.payableToken]

  const { account } = useEthers()

  const name = product.name
  const price = `${utils.formatUnits(product.amount, token.decimals)} ${token.symbol}`
  const period = formatPeriod(product.period.toNumber())
  const [error, setError] = useState(null)
  const [metadata, setMetadata] = useState(metadata)

  const metadataUrl = ipfsToGateway(product.uri)
  const imageUrl = metadata ? ipfsToGateway(metadata.image) : undefined

  const { state: mintState, send: sendMint } = useSendMintTokens(token.address)
  const mintClick = () => {
    if (account) {
      const amount = utils.parseUnits('25000', token.decimals)
      sendMint(account, amount)
    }
  }

  useEffect(() => {
    fetch(metadataUrl)
        .then(res => res.json())
        .then(
            (metadata) => {
              // setIsLoaded(true)
              setMetadata(metadata)
            },
            (error) => {
              // setIsLoaded(true)
              setError(error)
            }
        )
  }, [product])

  return (
    <div className={styles.container}>
      <div className={styles.subscribe}>Subscribe to</div>
      <div className={styles.product}>
        <Image
          src='/product-logo.png' alt='Product logo'
          width={24} height={24}
        />
        <div className={styles.name}>{name}</div>
      </div>

      <div className={styles.pricebox} style={{ marginTop: '15px' }}>
        <div className={styles.price}>{price}</div>
        <div className={styles.period}>{`per ${period}`}</div>
      </div>

      {imageUrl && <div>
        <img src={imageUrl} className={styles.nftImage} alt='NFT image'/>
        { metadata.description && <div className={styles.nftDescription}> {metadata.description} </div> }
      </div>}


      <p className={styles.mint} style={{ marginTop: imageUrl ? '50px' : '400px' }} onClick={mintClick}>{`Mint ${token.symbol} tokens`}</p>
      <a href='https://andsub.com' target='_blank noreferrer'>
        <p className={styles.powered} >Powered by Andsub</p>
      </a>
    </div>
  )
}

export default Product