import Image from 'next/image'
import styles from 'styles/Widget.module.css'

const BoxDropdown = () => <Image
  className={styles.dropdown}
  src='/arrow-down.svg' alt='Coin list dropdown'
  width={28} height={28}
/>

export default BoxDropdown