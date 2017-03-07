import React, { Component } from 'react'
import styles from './Comment.css'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { addComment } from '../actions/CommentAction'

class CommentForm extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    const commentObj = {
      oldComments: this.props.comments,
      comment: this.refs.comment.value
    }
    this.props.addComment(commentObj)
    this.refs.CommentForm.reset()
  }

  render () {
    return (
      <div className={styles.inputs}>
        {this.props.comments.map((comment, index) => (
          <div key={index} >
            <p>{this.props.user + ': '}</p>
            <p>{comment}</p>
          </div>
        ))}
        <form ref='CommentForm'>
          <label>Comment</label>
          <input type='text' ref='comment' placeholder='Comment' />
          <button type='submit' onClick={this.handleSubmit} >Submit</button>
        </form>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     user: state.commentReducer.user,
//     comments: state.commentReducer.comments
//   }
// }
// 
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     addComment: addComment
//   }, dispatch)
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)

export default CommentForm
