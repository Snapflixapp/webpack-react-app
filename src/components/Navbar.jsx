import React, { Component }from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signOut } from '../actions/UserAction'
import styles from './Navbar.css'

class Navbar extends Component {
  constructor (props) {
    super(props)

    this.signOutClick = this.signOutClick.bind(this)
  }

  signOutClick () {
    this.props.signOut()
  }

  render () {
    return(
      <div className={styles.nav}>
        <div className={styles.container}>
          <h1 className={styles.title}><Link to='/'>SNAPFLIX</Link></h1>
          <ul>
            <li><Link to='/upload'>Upload</Link></li>
            <li><Link to='/signin'>Sign In</Link></li>
            <li onClick={this.signOutClick} ><Link to='/'>Sign Out</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signOut: signOut
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
