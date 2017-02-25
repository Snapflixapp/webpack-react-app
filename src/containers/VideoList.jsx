import React, {Component} from 'react'
import {Link} from 'react-router'
import styles from './VideoList.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import VideoEntry from './VideoEntry'
import {selectVideo} from '../actions/VideoAction'

class VideoList extends Component {
  constructor (props) {
    super(props)

    this.handleVideoClick = this.handleVideoClick.bind(this)
  }

  handleVideoClick (video) {
    console.log('video clicked', video)
    this.props.selectVideo(video)
  }

  render () {
    console.log(this.props)
    return (
      <div className={styles.main}>
        {this.props.videos.map((video, index) => (
          <div>
            <br />
            <Link to={`/video/${index}`} key={index + 20} onClick={() => (this.handleVideoClick(video))}>
              <VideoEntry video={video} key={index} />
            </Link>
            <br />
          </div>
        ))
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    videos: state.videoData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectVideo: selectVideo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList)
