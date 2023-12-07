import React from 'react'
import styles from './ProgressBar.module.scss'

const ProgressBar = ({ percent, height, color }) => {
    const style = {
        width: `${percent}%`,
        backgroundColor: color || '#83C5BE',
        transition: 'width 0.5s ease-in-out',
    }
    console.log(percent)

    return (
        <div className={styles.progress_bar_container}>
            <div className={styles.progress_bar} style={style}>
                {percent === 0 || percent < 0 ? null : `${percent}%`}
            </div>
        </div>
    )
}

export default ProgressBar
