import React, { Component, PropTypes } from 'react' // eslint-disable-line
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { S3Upload } from '../utils'

import UploadForm from '../components/UploadForm'

import styles from './UploadContainer.css'

class UploadContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      uploadSuccessful: false
    }

    this.upload = this.upload.bind(this)
  }

  upload (video) {
    this.props.mutate({ variables: { title: video.title, contentType: video.contentType }, forceFetch: true })
      .then(({ data }) => {
        console.log('Data: ', data)
        const v = data.createVideo
        const params = {
          type: v.contentType,
          data: video.data,
          title: v.title,
          signedUrl: v.signedUrl
        }

        S3Upload(params)
          .then(success => {
            this.setState({
              uploadSuccessful: true
            })
          })
          .catch(e => console.error('Error occured. Cannot upload data to AWS S3: ', e))
      }).catch((error) => {
        console.error('There was an error sending the query', error)
      })
  }

  render () {
    if (this.state.uploadSuccessful) {
      window.location.reload()
      return <Redirect to='/' />
    }

    return (
      <div className={styles.container}>
        <div className={styles.header}><h1>Upload</h1></div>
        <div className={styles.uploadForm}><UploadForm onSubmit={this.upload} /></div>
      </div>
    )
  }
}

UploadContainer.propTypes = {
  mutate: PropTypes.func.isRequired
}

const createVideo = gql`
  mutation createVideo($title: String!, $contentType: String!) {
    createVideo(title: $title, contentType: $contentType) {
      title
      contentType
      signedUrl
    }
  }
`

const UploadContainerWithData = graphql(createVideo)(UploadContainer)

export default UploadContainerWithData
