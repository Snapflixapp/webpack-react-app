import React, { Component } from 'react'

class CommentForm extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log('comment submitted with ---=>', this.refs.author.value)
  }

  render () {
    return (
      <div>
        <form>
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
