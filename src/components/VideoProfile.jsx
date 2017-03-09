import React, { Component } from 'react'
import Modal from 'react-modal'
import styles from './VideoProfile.css'
import Comment from '../containers/CommentContainer'

const customStyles = {
  content: {
    top: '20%',
    left: '15%',
    width: '70%',
    height: '60%',
    padding: '0',
    boxShadow: '0 20px 20px rgba(0, 0, 0, 0.2)',
    border: '0',
    borderRadius: '0'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
}

class VideoProfile extends Component {

  playVideo () {
    this.refs.video.play()
  }

  render () {
    if (this.props.video) {
      console.log('video: ', this.props.video)
      return (
        <div className={styles.container}>
          <Modal
            isOpen={this.props.isOpen}
            contentLabel='onRequestClose Example'
            onRequestClose={this.props.closeModal}
            style={customStyles}
            shouldCloseOnOverlayClick={true} // eslint-disable-line
            >
            <div className={styles.profile}>
              <div onClick={this.playVideo.bind(this)} className={styles.video}>
                <video className={styles.videoInsert} ref='video' onClick={() => {}} style={{width: '100%', height: '100%'}}>
                  <source src={this.props.video.url} type='video/webm' />
                </video>
              </div>
              <div className={styles.comments}>
                {console.log('this is the current video: ', this.props.video)}
                <div className={styles.title}>Title: {decodeURI(this.props.video.title)}</div>
                <div className={styles.user}>Uploaded by: {this.props.video.user.username}</div>
                <div>
                  {this.props.video.comments.map((comment) => (
                    <div key={comment.id} className={styles.item}>
                      <div>
                        Name: {comment.user.username}
                        <br />
                        Content: {comment.content}
                      </div>
                    </div>
                  ))
                  }
                </div>
                <Comment videoId={this.props.video.id} userId={this.props.video.user.id} />
              </div>
            </div>
          </Modal>
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }
}

export default VideoProfile
