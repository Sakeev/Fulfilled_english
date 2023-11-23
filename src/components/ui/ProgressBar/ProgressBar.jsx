import React from 'react'
import styles from './ProgressBar.module.scss'

const ProgressBar = ({ percent, height, color }) => {
    const style = {
        width: `${percent}%`,
        backgroundColor: color || '#83C5BE',
        transition: 'width 0.5s ease-in-out',
    }

    return (
        <div className={styles.progress_bar_container}>
            <div className={styles.progress_bar} style={style}>
                {percent ? `${percent}%` : null}
            </div>
        </div>
    )
}

export default ProgressBar
