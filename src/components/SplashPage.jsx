import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './SplashPage.css'

export class SplashPage extends Component {

  render () {
    return (
      <Link to='/' className={styles.main}>
        <h3 className={styles.title}>Snapflixapp</h3>
        <img className={styles.splashImage} src={'http://i.giphy.com/9EQ43fJGgRaFi.gif'} />
      </Link>
    )
  }
}
