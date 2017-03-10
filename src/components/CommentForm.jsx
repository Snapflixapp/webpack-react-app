import React, {Component} from 'react'
import styles from './Comment.css'

class CommentForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: [],
      author: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    const oldComments = this.state.comments
    this.setState({
      comments: [...oldComments, this.refs.comment.value],
      author: this.refs.author.value
    })
    this.refs.CommentForm.reset()
  }

  render () {
    return (
      <div>
        {this.state.comments.map((comment, index) => (
          <div key={index} >
            <p><strong>{`${this.state.author}: `}</strong> {comment}</p>
          </div>
        ))}
        <form ref='CommentForm'>
          <input className={styles.inputs} type='text' ref='author' placeholder='author' />
          <input className={styles.inputs} type='text' ref='comment' placeholder='Comment' />
          <button type='submit' onClick={this.handleSubmit} >Submit</button>
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
