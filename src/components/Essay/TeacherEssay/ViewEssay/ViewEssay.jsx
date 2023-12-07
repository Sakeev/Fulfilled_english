import Mistakes from 'components/Essay/Mistakes/Mistakes'
import { useEssay } from 'contexts/EssayContextProvider'
import { useState, useEffect, useRef } from 'react'
import { highlightSelection } from 'helpers/essay'
import { useParams } from 'react-router-dom'
import { Button } from 'components/ui'

import cancelled from 'assets/images/cancelled.png'

import styles from './ViewEssay.module.scss'
import StaticMistakes from 'components/Essay/Mistakes/StaticMistakes'

const ViewEssay = () => {
    const { updateEssay, loading, getLesson, lesson, setEssayGrade } =
        useEssay()
    const [studentEssay, setStudentEssay] = useState(null)
    const [selection, setSelection] = useState(null)
    const [edit, setEdit] = useState(false)
    const [grade, setGrade] = useState(0)
    const [essay, setEssay] = useState(null)
    const colorFillsRef = useRef()
    const essayRef = useRef()
    const params = useParams()

    useEffect(() => {
        getLesson(params.studentId)
    }, [])

    useEffect(() => {
        if (lesson) {
            const essay = lesson.essay[0]
            setEssay(essay)
            if (essay) {
                setStudentEssay(essay.user_essay[0])
            }
        }
    }, [lesson])

    useEffect(() => {
        if (essayRef.current && studentEssay.id) {
            essayRef.current.innerHTML = studentEssay.html_text
            setGrade(+studentEssay.score)
        }
    }, [essayRef.current, studentEssay])

    const onSend = async () => {
        await updateEssay(studentEssay.id, {
            checked: true,
        })
        setEssayGrade(
            +studentEssay?.score,
            lesson.id,
            studentEssay.id,
            params.studentId
        )
        getLesson(params.studentId)
    }

    const onMouseUp = (event) => {
        const userSelection = window.getSelection()
        const s = userSelection.toString()

        if (s.trim() === '') {
            return
        }

        setSelection(userSelection.getRangeAt(0))

        colorFillsRef.current.style.left = event.clientX + 'px'
        colorFillsRef.current.style.top = `calc(${event.clientY}px - 3rem`
        colorFillsRef.current.style.opacity = 1
    }

    const colorFillHandler = (class_) => {
        highlightSelection(selection, class_)
        colorFillsRef.current.style.left = 0
        colorFillsRef.current.style.top = 0
        colorFillsRef.current.style.opacity = 0
    }

    if (loading || !essay) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        )
    }

    return (
        <div className={styles.essayContainer}>
            <div
                onMouseLeave={() => {
                    colorFillsRef.current.style.opacity = 0
                }}
                ref={colorFillsRef}
                className={styles.colorFills}
            >
                <div
                    onClick={() => colorFillHandler(styles.highlightOrange)}
                    className={styles.colorFill}
                ></div>
                <div
                    onClick={() => colorFillHandler(styles.highlightRed)}
                    className={styles.colorFill}
                ></div>
                <div
                    onClick={() => colorFillHandler(styles.highlightGreen)}
                    className={styles.colorFill}
                ></div>
                <img
                    onClick={() => colorFillHandler(styles.highlightWhite)}
                    src={cancelled}
                    alt="cancel selection"
                />
            </div>
            <div className={styles.essay}>
                <div className={styles.essayHeader}>
                    <div className={styles.studentInfo}>
                        <h2>Essay</h2>
                        <span>
                            Student: <a href="#">{lesson?.user.username}</a>
                        </span>
                    </div>
                    <div className={styles.subject}>
                        <span>subject: </span>
                        <p>{essay.title}</p>
                        {/* <audio
                            src={essay ? `${API}${essay?.audio}` : ''}
                            controls
                        ></audio> */}
                    </div>
                </div>
                <div className={styles.description}>
                    {essay.description.split('\r\n').map((line) => (
                        <p>{line}</p>
                    ))}
                </div>
                <div className={styles.windows}>
                    {/* <Mistakes
                        essay={essay}
                        studentEssayHook={[studentEssay, setStudentEssay]}
                        studentEssay={studentEssay}
                    /> */}
                    <StaticMistakes essay={essay} studentEssay={studentEssay} />
                    <div
                        ref={essayRef}
                        onMouseUp={(event) => onMouseUp(event)}
                        className={`${edit ? '' : styles.unactive} ${
                            styles.essayWindow
                        }`}
                    />
                </div>
                <div className={styles.buttons}>
                    <Button disabled={studentEssay?.checked} onClick={onSend}>
                        Send
                    </Button>
                    <div className={styles.editButtons}>
                        <div className={`${!edit ? styles.editUnactive : ''}`}>
                            <input
                                disabled={!edit}
                                type="text"
                                value={grade}
                                onChange={(event) => {
                                    const value = event.target.value

                                    if (!isNaN(value - parseFloat(value))) {
                                        if (
                                            parseFloat(value) <= 10 &&
                                            parseFloat(value) >= 0
                                        )
                                            if (value.length <= 3)
                                                setGrade(value)
                                    } else if (value === '') setGrade(value)
                                }}
                            />
                            <span>/10</span>
                        </div>
                        <Button
                            disabled={studentEssay?.checked}
                            onClick={async () => {
                                if (edit) {
                                    await updateEssay(studentEssay.id, {
                                        html_text: essayRef.current.innerHTML,
                                        score: grade,
                                    })

                                    getLesson(params.studentId)
                                }
                                setEdit((prev) => {
                                    return !prev
                                })
                            }}
                        >
                            {edit ? 'Save' : 'Edit'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEssay
