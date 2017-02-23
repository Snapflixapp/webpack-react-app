import React, {Component} from 'react'
import styles from './SplashPage.css'

export class SplashPage extends Component {
  constructor (props) {
    super(props)

    this.handlePageClick = this.handlePageClick.bind(this)
  }

  handlePageClick () {
    console.log('page clicked')
  }

  render () {
    return (
      <div className={styles.main} onClick={this.handlePageClick}>
        <h3 className={styles.title}>Snapflixapp</h3>
        <img
          className={styles.splashImage} src={'http://i.giphy.com/9EQ43fJGgRaFi.gif'} />
      </div>
    )
  }
}
