import { useEssay } from 'contexts/EssayContextProvider'
import { useEffect, useState, useRef } from 'react'
import { Button } from 'components/ui'
import { API } from 'helpers/consts'
import api from 'http'

import styles from './StudentEssay.module.scss'

const StudentEssay = () => {
    const { getLesson, lesson, loading } = useEssay()
    const [essayTemplate, setEssayTemplate] = useState(null)
    const [essayText, setEssayText] = useState('')
    const [essay, setEssay] = useState(null)
    const [noEssay, setNoEssay] = useState(false)
    const highlightedText = useRef()

    useEffect(() => {
        getLesson()
    }, [])

    useEffect(() => {
        if (lesson?.essay) {
            if (lesson.essay.length === 0) setNoEssay(true)
            else setEssayTemplate(lesson.essay[0])
        }
    }, [lesson])

    useEffect(() => {
        if (essayTemplate) {
            if (essayTemplate.user_essay[0]) {
                setEssay(essayTemplate.user_essay[0])
                setEssayText(essayTemplate.user_essay[0].text)
                if (highlightedText.current) {
                    highlightedText.current.innerHTML =
                        essayTemplate.user_essay[0].html_text
                }
            }
        }
    }, [essayTemplate])

    const sendEssay = async () => {
        const data = {
            text: essayText,
            html_text: essayText,
            essay: essayTemplate.id,
        }

        await api.post(`${API}room/essa/`, data)
        getLesson()
    }

    if (noEssay) {
        return <h3 className={styles.noEssay}>You haven't essay</h3>
    }

    if (!essayTemplate || loading) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        )
    }

    return (
        <div className={styles.essayContainer}>
            <div className={styles.essay}>
                <div className={styles.essayHeader}>
                    <div className={styles.studentInfo}>
                        <h2>Essay</h2>
                        <span>
                            Status: {essay?.checked ? '' : ' not'} checked
                        </span>
                    </div>
                    <div className={styles.subject}>
                        <span>subject: </span>
                        <p>{essayTemplate?.title}</p>
                        {/* <audio
                            src={essay ? `${API}${essay?.audio}` : ''}
                            controls
                        ></audio> */}
                    </div>
                </div>
                <div className={styles.windows}>
                    {essay?.checked && (
                        <div className={styles.mistakesWindow}>
                            <p>Here is the teachers corrections:</p>
                            <ul>
                                {essay?.mistakes.map((mistake, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={styles.mistake}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor:
                                                        mistake.color,
                                                }}
                                            ></div>
                                            <p>{mistake.description}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                    {essay?.checked ? (
                        <div
                            ref={highlightedText}
                            className={`${styles.essayWindow} ${styles.unactive}`}
                        ></div>
                    ) : (
                        <textarea
                            className={`${essay ? 'unactive' : ''} ${
                                styles.essayTextarea
                            }`}
                            readOnly={essay?.accepted}
                            onChange={(e) => setEssayText(e.target.value)}
                            value={essayText}
                        />
                    )}
                </div>
                <div className={styles.studentEssayBtns}>
                    <Button
                        disabled={essay?.accepted}
                        onClick={() => sendEssay(essayText)}
                    >
                        Send
                    </Button>
                    {essay?.checked ? <span>{essay?.score}/10</span> : null}
                </div>
            </div>
        </div>
    )
}

export default StudentEssay
