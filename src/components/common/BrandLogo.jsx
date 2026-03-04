import { LotusIcon } from '../desi/DesiMotifs.jsx'
import styles from './BrandLogo.module.css'

export default function BrandLogo({ size = 'md', onClick }) {
  const s = { sm: 0.8, md: 1, lg: 1.3 }[size] || 1
  return (
    <div className={styles.logo} onClick={onClick} style={{ fontSize: s + 'rem' }}>
      <div className={styles.icon}>
        <LotusIcon size={28 * s} color="#E8900A" />
      </div>
      <div className={styles.text}>
        <span className={styles.narayani}>Narayani</span>
        <span className={styles.realtors}>Realtors</span>
      </div>
    </div>
  )
}
