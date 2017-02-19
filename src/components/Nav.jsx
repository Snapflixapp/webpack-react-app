import React from 'react'
import {Link} from 'react-router-dom'

import styles from './Nav.css'

const Nav = () => (
  <div className={styles.nav}>
    <div className={styles.container}>
      <h1 className={styles.title}><Link to='/'>SnapFlix</Link></h1>
      <ul>
        <li><Link to='/signin'>Sign in</Link></li>
        <li><Link to='/upload'>Upload</Link></li>
      </ul>
    </div>
  </div>
)

export default Nav
