import React, { Component } from 'react'
import styles from './UploadForm.css'

export default class UploadForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      content: ''
    }

    this.handleComment = this.handleComment.bind(this)
    this.handleContent = this.handleContent.bind(this)
  }

  handleComment () {
    this.props.onSubmit(this.state)
  }

  handleContent (e) {
    this.setState({
      content: e.target.value
    })
  }

  render () {
    return (

      <div>
        <div><input type='text' placeholder='Write a comment...' className={styles.content} onChange={this.handleContent} /></div>
        <br />
        <div><button onClick={this.handleComment}>Submit Comment</button></div>
      </div>
    )
  }
}
