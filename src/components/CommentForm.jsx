import React, {Component} from 'react'
import styles from './Comment.css'

class CommentForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      commentObjs: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.scrollDiv = document.getElementById('commentDiv')
  }

  scrollToBottom () {
    this.scrollDiv.scrollTop = this.scrollDiv.scrollHeight
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  handleSubmit (e) {
    e.preventDefault()
    const msgObj = {
      comment: this.refs.comment.value,
      author: this.refs.author.value
    }
    console.log(msgObj.comment)
    console.log(msgObj.author)
    this.setState({
      commentObjs: [...this.state.commentObjs, msgObj]
    })
    this.refs.CommentForm.reset()
  }

  render () {
    // this.scrollDiv.scrollTop = this.scrollDiv.scrollHeight
    return (
      <div>
        <div id='commentDiv' className={styles.container}>
          {this.state.commentObjs.map((comment, index) => (
            <div className={styles.comment} key={index} >
              <p><strong>{comment.author + ': '}</strong> {comment.comment}</p>
            </div>
          ))}
        </div>
        <form ref='CommentForm'>
          <input className={styles.inputs} type='text' ref='author' placeholder='Author' />
          <input className={styles.inputs} type='text' ref='comment' placeholder='Comment' />
          <button className={styles.button} type='submit' onClick={this.handleSubmit} >Submit</button>
        </form>
      </div>
    )
  }
}

export default CommentForm

// class CommentForm extends Component {
//  constructor(props) {
//    super(props)
//    this.state = {
//      comments: ['first comment!', 'jasmine is awesome', 'this is cool!'],
//       localComments: []
//       current:comment
//    }
//     this.handleLocalComments = this.handleLocalComments.bind(this)
//  }

//   handleLocalComments (e) {
//     console.log(e.target)
//     e.preventDefault()
//     let currentComments = this.state.localComments
//     this.setState({
//       localComments: [...currentComments, e.target.value]
//     })
//     console.log(this.state.localComments)
//     // this.form.ref.reset()
//   }
//   render () {
//     return (
//         <div>
//           <div>
//             List of Comments:
//               {this.state.localComments.map((comment, index) => {
//                 return <p key={index} >{comment}</p>
//               })}
//           </div>
//           <div>
//               <input type="text" ref="comment" placeholder="write a comment..."></input>
//               <button type="submit" onClick={this.handleLocalComments}>post</button>
//           </div>
//         </div>
//       )
//   }
// }
