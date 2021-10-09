import Image from 'next/image'
import styles from 'styles/Widget.module.css'

const BoxIcon = ({ src, alt }) => <Image
  className={styles.boxicon}
  src={src} alt={alt}
  width={24} height={24}
/>

export default BoxIcon