import React, {Component} from 'react'
import styles from './SignIn.css'

export class Upload extends Component {

  render () {
    return (
      <div style={styles.title}>
        Test Sign In
        {console.log('in upload component')}
      </div>
    )
  }
}
