import React from 'react'
import { Link } from 'react-router'
import styles from './SingleVideo.css'
//here we will import the videos from the video array in the main page
//we will also import comments from a comments array


const video = {
  kind: 'youtube#searchResult',
  etag: 'abQHWywil_AkNqdqji7_FqiK-u4/Ykxo_CqKu8F8kcm-iNgL332gQTY',
  id: {
    kind: 'youtube#video',
    videoId: '4ZAEBxGipoA'
  },
  snippet: {
    publishedAt: '2015-08-02T20:52:58.000Z',
    channelId: 'UCJbPGzawDH1njbqV-D5HqKw',
    title: 'React JS Tutorial for Beginners - 1 - Introduction',
    description: 'My website - https://www.thenewboston.com/videos.php Have questions about the tutorial or React? Ask them here ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/4ZAEBxGipoA/default.jpg',
        width: 120,
        height: 90
      },
      medium: {
        url: 'https://i.ytimg.com/vi/4ZAEBxGipoA/mqdefault.jpg',
        width: 320,
        height: 180
      },
      high: {
        url: 'https://i.ytimg.com/vi/4ZAEBxGipoA/hqdefault.jpg',
        width: 480,
        height: 360
      }
    },
    channelTitle: 'thenewboston',
    liveBroadcastContent: 'none'
  }
}

const SingleVideo = () => (
  <div className={styles.main}>
    <div className={styles.video}>
{//iframe source will be the video we capture from the upload page
      <iframe src={`https://www.youtube.com/embed/${video.id.videoId}`} allowFullScreen></iframe>
    }
    </div>
    <div>
      <div>
        {video.snippet.title}
      </div>
      <div>{video.snippet.description}</div>
    </div>
  </div>
);
    

export default SingleVideo
