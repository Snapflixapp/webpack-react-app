import React, { Component } from 'react'

class LikeVideo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      likes: 0,
      dislikes: 0
    }
    this.handleLikes = this.handleLikes.bind(this)
    this.handleDislikes = this.handleDislikes.bind(this)
  }
  handleLikes () {
    this.setState({likes: this.state.likes + 1})
  }
  handleDislikes () {
    this.setState({dislikes: this.state.dislikes + 1})
  }
  render () {
    return (
      <div>
        <button onClick={this.handleLikes}>&#x1F44D; &nbsp;<strong>{this.state.likes}</strong></button>
        <button onClick={this.handleDislikes}>&#x1F44E; &nbsp;<strong>{this.state.dislikes}</strong></button>
      </div>
    )
  }
}
export default LikeVideo
