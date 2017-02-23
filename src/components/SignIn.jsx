import React, {Component} from 'react'
import styles from './SignIn.css'

export class SignIn extends Component {

  render () {
    return (
      <div style={styles.title}>
        Test Sign In
        {console.log('in sign in component')}
      </div>
    )
  }
}
