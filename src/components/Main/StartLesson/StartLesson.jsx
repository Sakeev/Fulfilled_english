import CreateRoom from 'components/classwork/CreateRoom'
import { Modal } from 'components/ui'
import { API } from 'helpers/consts'
import api from 'http'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const StartLesson = ({ styles, startTime, isTeacher }) => {
    const [timeRemaining, setTimeRemaining] = useState(startTime - new Date())
    const [showStartButton, setShowStartButton] = useState(false)
    const [connectingLesson, setConnectingLesson] = useState(false)

    //Modal
    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()

    const minutes = Math.floor(timeRemaining / 60000)
    const seconds = Math.floor((timeRemaining % 60000) / 1000)

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date()
            const remaining = startTime - currentTime
            setTimeRemaining(remaining)
            if (remaining < 1000) {
                clearInterval(interval)
                setShowStartButton(true)
            }
        }, 1000) // Обновление каждую секунду
        return () => {
            clearInterval(interval)
        }
    }, [startTime])

    // Join to room
    const joinLesson = async () => {
        setConnectingLesson(true)
        const chatRoom = await api.get(`${API}chat/room/`)

        if (chatRoom.data.length) {
            localStorage.setItem('room_pk', chatRoom.data[0].pk)
            navigate('/classwork')
        }
        setConnectingLesson(false)
    }

    return (
        <>
            {minutes > -61 && minutes < 30 ? (
                showStartButton ? (
                    isTeacher && !localStorage.getItem('room_pk') ? (
                        <div className={styles.startlesson}>
                            <button
                                className={styles.btnstart}
                                onClick={() => {
                                    if (isTeacher) {
                                        setShowModal(true)
                                    }
                                }}
                            >
                                Create lesson
                            </button>
                            <div className={styles.timerBlock}>
                                Student is waiting for you
                            </div>
                        </div>
                    ) : !connectingLesson ? (
                        <div className={styles.startlesson}>
                            <button
                                className={styles.btnstart}
                                onClick={joinLesson}
                            >
                                Join the lesson
                            </button>
                            <div className={styles.timerBlock}>
                                You have unfinished lesson
                            </div>
                        </div>
                    ) : (
                        <div className={styles.startlesson}>
                            <div className={styles.loaderwrapper}>
                                <div className={styles.loader}></div>
                            </div>
                        </div>
                    )
                ) : seconds < 0 && minutes < 0 ? (
                    setShowStartButton(true)
                ) : (
                    <div className={styles.startlesson}>
                        <button className={styles.btnsoon}>
                            Will start soon
                        </button>
                        <div className={styles.timerBlock}>
                            <span className={styles.timerText}>
                                Before the start of class:
                            </span>
                            <span className={styles.timer}>
                                {minutes < 10 ? '0' + minutes : minutes}:
                                {seconds < 10 ? '0' + seconds : seconds}
                            </span>
                        </div>
                    </div>
                )
            ) : (
                <div className={styles.startlesson}>
                    <button className={styles.btncant}>You can't start</button>
                    <div className={styles.timerBlock}>
                        <span className={styles.timerText}>
                            Great job! Wait for your next lesson
                        </span>
                    </div>
                </div>
            )}
            <Modal useStateHook={[showModal, setShowModal]}>
                <CreateRoom />
            </Modal>
        </>
    )
}

export default StartLesson
