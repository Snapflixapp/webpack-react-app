import React, { Component } from 'react'
import styles from './Comment.css'

class CommentForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      author: '',
      comment: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    const author = this.refs.author.value + ':'
    const comment = this.refs.comment.value
    this.setState({
      author,
      comment
    })
    this.refs.CommentForm.reset()
  }

  render () {
    return (
      <div>
        <div className={styles.main}><strong>{this.state.author}</strong>{this.state.comment}</div>
        <form ref='CommentForm'>
          <label>Author</label>
          <input type='text' ref='author' placeholder='Author' />
          <label>Comment</label>
          <input type='text' ref='comment' placeholder='Comment' />
          <button type='submit' onClick={this.handleSubmit} >Submit</button>
        </form>
      </div>
    )
  }
}

export default CommentForm

