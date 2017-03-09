import React, { Component, PropTypes } from 'react' // eslint-disable-line
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import CommentForm from '../components/CommentForm'

import styles from './CommentContainer.css'

class CommentContainer extends Component {
  constructor (props) {
    super(props)

    this.submitComment = this.submitComment.bind(this)
  }

  submitComment (comment) {
    console.log('trying to submit comment: ', comment)
    console.log('trying to submit comment.content: ')
    this.props.mutate({ variables: { content: comment.content, videoId: this.props.videoId, userId: this.props.userId } })
      .then(({ data }) => {
        console.log('Data, and it works!: ', data)
      }).catch((error) => {
        console.error('There was an error sending the comment', error)
      })
  }

  render () {
    return (
      <div className={styles.container}>
        <div>
          Comment: <CommentForm onSubmit={this.submitComment} />
        </div>
      </div>
    )
  }
}

CommentContainer.propTypes = {
  mutate: PropTypes.func.isRequired
}

const createComment = gql`
  mutation createComment($content: String!, $videoId: String!, $userId: String!) {
    createComment(content: $content, videoId: $videoId, userId: $userId) {
      content
      user {
        username
      }
    }
  }
`

const CommentContainerWithData = graphql(createComment)(CommentContainer)

export default CommentContainerWithData
