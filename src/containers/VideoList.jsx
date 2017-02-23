import React, {Component} from 'react'
import styles from './VideoList.css'
import {VideoEntry} from './VideoEntry'

export class VideoList extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={styles.title}>
        <VideoEntry />
      </div>
    )
  }
}

