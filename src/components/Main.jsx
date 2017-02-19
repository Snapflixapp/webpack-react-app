import React from 'react'
import styles from './Main.css'

const Main = (props) => (
  <div className={styles.main}>
    <div className={styles.container} {...props} />
  </div>
)

export default Main
