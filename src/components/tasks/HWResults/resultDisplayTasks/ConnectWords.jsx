import './resultDisplayTasks.css'

import styles from '../../tasksType/ConnectWords/ConnectWords.module.scss'
import { Button } from 'components/ui'

const ConnectWords = ({ taskDetails, answer, displayDataType }) => {
    if (answer === null) return <h2>This task hasn't done yet</h2>

    let answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer

    if (displayDataType === 'teacher') {
        answers = answers
            .split(',')
            .map((wordPair) => wordPair.trim().split(' '))
    }

    return (
        <div className={styles.connectWords}>
            <div
                className={`${styles.columns} ${styles.results} ${
                    displayDataType === 'teacher' ? styles.teacherResults : ''
                }`}
            >
                <div className={styles.column}>
                    {answers?.map(([word], index) => (
                        <Button key={index} className={styles.button}>
                            {word.replaceAll('_', ' ')}
                        </Button>
                    ))}
                </div>
                <div className={styles.connections}>
                    {answers?.map((_, index) => (
                        <div key={index} className={styles.line}>
                            <div></div>
                        </div>
                    ))}
                </div>
                <div className={styles.column}>
                    {answers?.map(([, word], index) => (
                        <Button
                            key={index + answers?.length}
                            className={styles.button}
                        >
                            {word.replaceAll('_', ' ')}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ConnectWords
