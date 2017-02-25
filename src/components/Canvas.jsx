import React from 'react'
import styles from './Canvas.css'

const Canvas = (props) => (
  <div className={styles.main}>
    <canvas width={props.width} height={props.height} />
  </div>
)

export default Canvas
