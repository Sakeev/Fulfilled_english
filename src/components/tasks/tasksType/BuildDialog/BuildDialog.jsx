import { useState, useEffect } from 'react'
import { Button } from 'components/ui'

import styles from './BuildDialog.module.scss'

const BuildDialog = ({ taskDetails, handleAnswer, ids, nextTask }) => {
    const [sentences, setSentences] = useState([])
    const [answer, setAnswer] = useState([])

    useEffect(() => {
        setSentences(
            taskDetails?.description.trim().replaceAll('\r\n', '').split('|')
        )
    }, [])

    const handleSentence = (ind) => {
        const newSentences = [...sentences]
        const pickedSentence = newSentences.splice(ind, 1)[0]

        setSentences(newSentences)
        setAnswer((answer) => [...answer, pickedSentence])
    }

    const handleSentenceBack = (ind) => {
        const newSentences = [...sentences]
        newSentences.splice(ind, 0, answer[ind])
        const newAns = [...answer]
        newAns.splice(ind, 1)
        setSentences(newSentences)
        setAnswer(newAns)
    }

    const formRequest = () => {
        return { answers: answer.length ? answer : ['No answer'] }
    }

    return (
        <div className={styles.buildDialogContainer}>
            <div className={styles.taskBox}>
                <div className={styles.sentences}>
                    {sentences.map((sentence, ind) => (
                        <span
                            key={ind}
                            className={styles.sentence}
                            onClick={() => {
                                handleSentence(ind)
                            }}
                        >
                            {sentence}
                        </span>
                    ))}
                </div>
                <div className={styles.answerBlock}>
                    {answer?.map((item, ind) => (
                        <p
                            className={styles.pickedSentence}
                            key={ind}
                            onClick={() => {
                                handleSentenceBack(ind)
                            }}
                        >
                            {item}
                        </p>
                    ))}
                </div>
            </div>
            <Button
                disabled={
                    !taskDetails ||
                    taskDetails.answers[taskDetails.answers.length - 1]?.passed
                }
                className={styles.submit}
                onClick={() => {
                    handleAnswer(formRequest(), taskDetails.id, ids)
                    nextTask()
                }}
            >
                Submit
            </Button>
        </div>
    )
}

export default BuildDialog
