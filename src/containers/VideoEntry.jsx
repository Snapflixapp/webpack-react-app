import React, {Component} from 'react'
import styles from './VideoEntry.css'

export class VideoEntry extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    console.log('this is video', this.props.video.snippet.title)
    return (
      <div className={styles.entry}>
        <div>
          <iframe src={`https://www.youtube.com/embed/${this.props.video.id.videoId}`} allowFullScreen />
        </div>
        <div className={styles.videoInfo}>
          <div>
            {this.props.video.snippet.title}
          </div>
          <div>
            {this.props.video.snippet.description}
          </div>
        </div>
      </div>
    )
  }
}
