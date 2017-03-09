import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.css'

export default (props) => {
  const logout = (e) => {
    e.preventDefault()
    props.logout()
  }

  const signInSignOut = (
    (props.authenticated)
    ? <li onClick={logout} ><Link to='/'>Sign Out</Link></li>
    : <li><Link to='/signin'>Sign In</Link></li>
  )

  return (
    <div className={styles.nav}>
      <div className={styles.container}>
        <h1 className={styles.title}><Link to='/'>SNAPFLIX</Link></h1>
        <ul>
          <li><Link to='/upload'>Upload</Link></li>
          {signInSignOut}
        </ul>
      </div>
    </div>
  )
}
