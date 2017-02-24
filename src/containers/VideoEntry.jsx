import React, {Component} from 'react'
import styles from './VideoList.css'

export class VideoEntry extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <div className={styles.title}>

        {this.props.video.snippet.title}
      </div>
    )
  }
}
