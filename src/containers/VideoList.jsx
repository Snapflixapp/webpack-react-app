import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './VideoList.css'

import VideoEntry from './VideoEntry'

class VideoList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      videos: []
    }

    // this.handleVideoClick = this.handleVideoClick.bind(this)
  }

  componentWillReceiveProps (newProps) {
    const videos = newProps.data.videos

    this.setState({
      videos: videos
    })
  }

  handleVideoClick (video) {
    // TODO: handle click...
    // this.props.selectVideo(video)
  }

  render () {
    return (
      <div className={styles.container}>
        {this.state.videos.map((video) => (
          <div key={video.id} className={styles.item}>
            <Link to={`/video/${video.id}`} onClick={() => (this.handleVideoClick(video))}>
              <VideoEntry video={video} />
            </Link>
          </div>
        ))
        }
      </div>
    )
  }
}

export default VideoList
