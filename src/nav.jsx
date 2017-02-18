import React from 'react'
import {Link} from 'react-router-dom'

import styles from './nav.css'

const Nav = () => (
  <div className={styles.nav}>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/signin'>Signin</Link></li>
      <li><Link to='/upload'>Upload</Link></li>
    </ul>
  </div>
)

export default Nav
