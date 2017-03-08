import React, { Component } from 'react'
import Modal from 'react-modal'
import styles from './VideoProfile.css'

const customStyles = {
  content: {
    top: '20%',
    left: '15%',
    width: '70%',
    height: '60%',
    padding: '0',
    boxShadow: '0 20px 20px rgba(0, 0, 0, 0.2)',
    border: '0',
    borderRadius: '0'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
}

class VideoProfile extends Component {
  playVideo () {
    this.refs.video.play()
  }

  render () {
    return (
      <div className={styles.container}>
        <Modal
          isOpen={this.props.isOpen}
          contentLabel='onRequestClose Example'
          onRequestClose={this.props.closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick={true} // eslint-disable-line
        >
          <div className={styles.profile}>
            <div onClick={this.playVideo.bind(this)} className={styles.video}>
              <video className={styles.videoInsert} ref='video' onClick={() => {}} style={{width: '100%', height: '100%'}}>
                <source src={this.props.video.url} type='video/webm' />
              </video>
            </div>
            <div className={styles.comments}>
              <div>{decodeURI(this.props.video.title)}</div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default VideoProfile

// import React, { Component } from 'react'
// // import { connect } from 'react-redux'
// import VideoEntry from './VideoEntry'
// // import CommentForm from '../components/Comment'
// import styles from './VideoProfile.css'
// // import LikeVideo from '../components/LikeVideo'
//
// class VideoProfile extends Component {
//   // constructor (props) {
//   //   super(props)
//   // }
//
//   render () {
//     return (
//       <div className={styles.container}>
//         <div>
//           <div>
//             <VideoEntry video={this.props.activeVideo} />
//           </div>
//           <div>
//             {/* <LikeVideo /> */}
//             {/* <CommentForm {...this.props} /> */}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
//
// // const mapStateToProps = (state) => {
// //   return {
// //     activeVideo: state.activeVideoReducer
// //   }
// // }
// //
// // export default connect(mapStateToProps)(VideoProfile)
// export default VideoProfile
