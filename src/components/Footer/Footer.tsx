import { FC, LegacyRef } from 'react'
import styles from './Footer.module.css'

interface Props {
  ref: LegacyRef<HTMLDivElement>
}

const Footer: FC<Props> = ({ ref }) => {
  return (
    <footer ref={ref} className={styles.footer}>
      <p>All rights reserved © 2024</p>
    </footer>
  )
}
export default Footer
