import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import styles from './VideoList.css'

import VideoEntry from './VideoEntry'

const customStyles = {
  content: {
    top: '15%',
    left: '20%',
    width: '60%',
    height: '60%',
    padding: '0',
    boxShadow: '0 20px 20px rgba(0, 0, 0, 0.2)',
    border: '0',
    borderRadius: '0'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }
}

class VideoList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      videos: [],
      showModal: false,
      currentVideo: {}
    }

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  componentWillReceiveProps (newProps) {
    const videos = newProps.data.videos

    this.setState({
      videos: videos
    })
  }

  handleOpenModal (video) {
    this.setState({
      showModal: true,
      currentVideo: video
    })
  }

  handleCloseModal () {
    this.setState({
      showModal: false,
      currentVideo: {}
    })
  }

  playVideo () {
    this.refs.video.play()
  }

  render () {
    const currentVideo = this.state.currentVideo
    return (
      <div className={styles.container}>
        <Modal
          isOpen={this.state.showModal}
          contentLabel='onRequestClose Example'
          onRequestClose={this.handleCloseModal}
          style={customStyles}
          shouldCloseOnOverlayClick={true} // eslint-disable-line
        >
          <div className={styles.profile}>
            <div onClick={this.playVideo.bind(this)} className={styles.video}>
              <video ref='video' onClick={() => {}} style={{width: '100%', height: '100%'}}> <source src={currentVideo.url} type='video/webm' /></video>
            </div>
            <div className={styles.comments}>
              <div>{decodeURI(currentVideo.title)}</div>
            </div>
          </div>
        </Modal>
        {this.state.videos.map((video) => (
          <div key={video.id} className={styles.item}>
            <div onClick={() => { this.handleOpenModal(video) }}>
              <VideoEntry video={video} />
            </div>
          </div>
        ))
        }
      </div>
    )
  }
}

export default VideoList

// class ExampleApp extends React.Component {
//   constructor () {
//     super()
//     this.state = {
//       showModal: false
//     }
//
//     this.handleOpenModal = this.handleOpenModal.bind(this)
//     this.handleCloseModal = this.handleCloseModal.bind(this)
//   }
//
//   handleOpenModal () {
//     this.setState({ showModal: true })
//   }
//
//   handleCloseModal () {
//     this.setState({ showModal: false })
//   }
//
//   render () {
//     return (
//       <div>
//         <button onClick={this.handleOpenModal}>Trigger Modal</button>
//         <Modal
//            isOpen={this.state.showModal}
//            contentLabel='onRequestClose Example'
//            onRequestClose={this.handleCloseModal}
//            shouldCloseOnOverlayClick={true}
//         >
//           <p>Modal text!</p>
//           <button onClick={this.handleCloseModal}>Close Modal</button>
//         </Modal>
//       </div>
//     )
//   }
// }
