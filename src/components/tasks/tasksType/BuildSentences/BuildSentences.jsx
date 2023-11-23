import BuildSentence from './BuildSentence/BuildSentence'
import { Button } from 'components/ui'
import { useState } from 'react'

import styles from './BuildSentences.module.scss'

const BuildSentences = ({ taskDetails, handleAnswer, ids, nextTask }) => {
    const [results, setResults] = useState({})

    const formResults = () => {
        return Object.values(results).map((result) => result.join(' '))
    }

    return (
        <div className={styles.buildSentencesContainer}>
            {taskDetails?.description.map((sentence, index) => {
                return (
                    <BuildSentence
                        key={index}
                        id={index}
                        sentence={sentence}
                        setResults={setResults}
                    />
                )
            })}
            <Button
                disabled={
                    !taskDetails ||
                    taskDetails.answers[taskDetails.answers.length - 1]?.passed
                }
                className={styles.submit}
                onClick={() => {
                    handleAnswer(
                        { answers: formResults() },
                        taskDetails.id,
                        ids
                    )
                    nextTask()
                }}
            >
                Submit
            </Button>
        </div>
    )
}

export default BuildSentences
