import Link from 'next/link'
import styles from 'styles/Index.module.css'

const Home = () => {
  return (
    <div className={styles.layout}>
      <Link href='/andsub_demo' passHref>
        <button className={styles.link}>Open demo checkout</button>
      </Link>
    </div>
  )
}

export default Home