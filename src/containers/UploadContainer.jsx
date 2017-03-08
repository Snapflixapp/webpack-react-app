import React, { Component, PropTypes } from 'react' // eslint-disable-line
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { S3Upload } from '../utils'

import UploadForm from '../components/UploadForm'

import styles from './UploadContainer.css'

class UploadContainer extends Component {
  constructor (props) {
    super(props)

    this.upload = this.upload.bind(this)
  }

  upload (video) {
    this.props.mutate({ variables: { title: video.title, contentType: video.contentType } })
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
            console.log('S3 upload successful: ', success)
            // TODO: redirect to home page
          })
          .catch(e => console.error('Error occured. Cannot upload data to AWS S3: ', e))
      }).catch((error) => {
        console.error('There was an error sending the query', error)
      })
  }

  render () {
    return (
      <div className={styles.container}>
        <h1>Upload</h1>
        <UploadForm onSubmit={this.upload} />
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
