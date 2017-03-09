import { connect } from 'react-redux'
import { signOut } from '../actions'

import NavBar from '../components/Navbar'

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  logout () {
    dispatch(signOut())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
