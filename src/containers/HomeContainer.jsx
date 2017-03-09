import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from './HomeContainer.css'

import VideoList from '../components/VideoList'

const GetVideosQuery = gql`
  query GetVideos {
    videos {
      id
      title
      url
      user {
        username
        comments {
          content
        }
      }
    }
  }
`
const VideosListWithData = graphql(GetVideosQuery)(VideoList)

class Home extends Component {
  render () {
    return (
      <div className={styles.home}>
        <VideosListWithData />
      </div>
    )
  }
}

export default Home
