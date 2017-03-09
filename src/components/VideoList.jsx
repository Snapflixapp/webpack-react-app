import React, { Component } from 'react'
import styles from './VideoList.css'

import VideoEntry from './VideoEntry'
import VideoProfile from './VideoProfile'

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

  render () {
    return (
      <div className={styles.container}>
        <VideoProfile
          video={this.state.currentVideo}
          isOpen={this.state.showModal}
          openModal={this.handleOpenModal}
          closeModal={this.handleCloseModal}
         />
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
