import styles from '../../tasksType/BuildDialog/BuildDialog.module.scss'

const BuildDialog = ({ taskDetails, answer, displayDataType }) => {
    const answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer

    return (
        <div className={styles.buildDialogContainer}>
            <div className={styles.taskBox}>
                <div className={styles.answerBlock}>
                    {answers.map((word, ind) => (
                        <p
                            className={`${styles.pickedSentence} ${styles.results}`}
                            key={ind}
                        >
                            {word}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BuildDialog
