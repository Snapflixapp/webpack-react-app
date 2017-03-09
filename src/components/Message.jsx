// 'use strict'
//
// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import styles from './Message.css'
// import io from 'socket.io-client'
// import { saveComment } from '../actions/MessageAction'
//
// class CommentForm extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       user: '',
//       comments: [ ]
//     }
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }
//
//   componentDidMount () {
//     const context = this
//     this.socket = io.connect('http://localhost:3000')
//     this.socket.on('comment', (messageObj) => {
//       context.setState({
//         comments: [...context.state.comments, messageObj.comment]
//       })
//     })
//   }
//
//   handleSubmit (e) {
//     e.preventDefault()
//     const user = this.refs.user.value + ':'
//     const comment = this.refs.comment.value
//     const commentObj = {
//       user,
//       videoId: this.props.video.id,
//       comment
//     }
//
//     this.socket.emit('comment', commentObj)
//     this.props.saveComment(commentObj)
//
//     this.refs.CommentForm.reset()
//   }
//
//   render () {
//     return (
//       <div className={styles.inputs}>
//         <div>
//           <ul>
//             {this.state.comments.map((comment, index) => {
//               return (
//                 <li key={index} ><strong>{this.state.user}</strong>{comment}</li>
//               )
//             })}
//           </ul>
//         </div>
//         <form ref='CommentForm'>
//           <label>User</label>
//           <input type='text' ref='user' placeholder='Author' />
//           <label>Comment</label>
//           <input type='text' ref='comment' placeholder='Comment' />
//           <button type='submit' onClick={this.handleSubmit} >Submit</button>
//         </form>
//       </div>
//     )
//   }
// }
//
// function mapStateToProps (state) {
//   return {
//     video: state.activeVideoReducer,
//     user: state.userReducer
//   }
// }
//
// function mapDispatchToProps (dispatch) {
//   return bindActionCreators({
//     saveComment: saveComment
//   }, dispatch)
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
