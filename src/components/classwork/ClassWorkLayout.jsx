import React, { useState } from 'react'
import {
    BtnBold,
    BtnItalic,
    BtnRedo,
    BtnStrikeThrough,
    BtnUnderline,
    BtnUndo,
    Editor,
    EditorProvider,
    Separator,
    Toolbar,
} from 'react-simple-wysiwyg'
import { ReadyState } from 'react-use-websocket'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { isTeacher } from '../../helpers/funcs'
import { Button, Link } from '@mui/material'
import ClassTasks from './ClassTasks'
import { useClassWork } from '../../contexts/ClassWorkContextProvider'
import MarkCW from './MarkCW'
import Vocabulary from './tasks/Vocabulary'
import './ClassWorkLayout.css'

const request_id = new Date().getTime()

function isDocumentEvent(message) {
    let evt = JSON.parse(message.data)
    return evt.type === 'contentchange'
}
const ClassWorkLayout = () => {
    const { room_pk, postNote, sendMark } = useClassWork()
    const [socketUrl] = useState(
        `wss://www.fluentenglish.site/ws/chat/?token=${
            JSON.parse(localStorage.getItem('token')).access
        }`
    )
    const [isLesson, setIsLesson] = useState(false)
    const [lesson, setLesson] = useState({})
    const [inps, setInps] = useState({ chat: '' })
    const [playing, setPlaying] = useState({
        unit1: { id: 0, task: { is_playing: false } },
        unit2: { id: 0, task: { is_playing: false } },
    })
    const [current_time, set_current_time] = useState({
        unit1: { id: 0, task: { seeked: 0 } },
        unit2: { id: 0, task: { seeked: 0 } },
    })
    const [tablePlaying, setTablePlaying] = useState({
        unit1: { id: 0, task: { is_playing: false } },
        unit2: { id: 0, task: { is_playing: false } },
    })
    const [table_current_time, set_table_current_time] = useState({
        unit1: { id: 0, task: { seeked: 0 } },
        unit2: { id: 0, task: { seeked: 0 } },
    })

    const [fillinpsPlaying, setFillinpsPlaying] = useState({
        unit1: { id: 0, task: { is_playing: false } },
        unit2: { id: 0, task: { is_playing: false } },
    })
    const [fillinps_current_time, set_fillinps_current_time] = useState({
        unit1: { id: 0, task: { seeked: 0 } },
        unit2: { id: 0, task: { seeked: 0 } },
    })
    const [note_id, setNote] = useState(0)
    const [userId, setUserId] = useState(0)
    const [user, setUser] = useState('')
    const [grade, setGrade] = useState({})
    const [vocabulary, setVocabulary] = useState([])
    const [showVocab, setShowVocab] = useState(false)
    const [zoomLink, setZoomLink] = useState('#')

    const tasks = (data) => {
        if (data.case_tasks) {
            setLesson(data)
            setVocabulary(
                data.case_tasks.unit1
                    .concat(data.case_tasks.unit2)
                    .filter(({ title }) => title === 'vocabulary')
            )
            setIsLesson(true)
        }
    }
    const { sendJsonMessage, readyState } = useWebSocket(socketUrl, {
        onOpen: (e) => {
            console.log('WebSocket connection established.')
            const joinRoom = {
                pk: room_pk,
                action: 'join_room',
                request_id: request_id,
            }
            sendJsonMessage(joinRoom)
            const retrieveMessage = {
                pk: room_pk,
                action: 'retrieve',
                request_id: request_id,
            }
            sendJsonMessage(retrieveMessage)
            const subscribeMessage = {
                pk: room_pk,
                action: 'subscribe_to_messages_in_room',
                request_id: request_id,
            }
            sendJsonMessage(subscribeMessage)
            const subscribeInstanceMessage = {
                pk: room_pk,
                action: 'subscribe_instance',
                request_id: request_id,
            }
            sendJsonMessage(subscribeInstanceMessage)
            const subscribeLessonActivity = {
                action: 'subscribe_lesson_activity',
                request_id: request_id,
            }
            sendJsonMessage(subscribeLessonActivity)
            const getLessonInRoom = {
                pk: 1,
                action: 'get_lesson',
                room_pk: room_pk,
                request_id: request_id,
            }
            sendJsonMessage(getLessonInRoom)
        },
        onMessage: (e) => {
            const data = JSON.parse(e.data)
            switch (data.action) {
                case 'retrieve':
                    setZoomLink(data.data.host.zoom_link)
                    setNote(data.data.lesson.notes?.id)
                    tasks(data.data.lesson)
                    setUserId(data.data.student.id)
                    setUser(data.data.user)
                    setInps({ ...data.data.last_message.body })

                    break
                case 'create':
                    data.data.body.user !== user &&
                        setInps({ ...data.data.body })
                    break
                case 'get_listening':
                    setPlaying({
                        ...playing,
                        ['unit' + data?.listening.unit]: {
                            task: data?.listening.tasks[0],
                            id: data?.listening.id,
                        },
                    })
                    break
                case 'get_current_time':
                    set_current_time({
                        ...playing,
                        ['unit' + data?.listening.unit]: {
                            task: data?.listening.tasks[0],
                            id: data?.listening.id,
                        },
                    })
                    break
                case 'get_listening_te':
                    setTablePlaying({
                        ...tablePlaying,
                        ['unit' + data?.listening.unit]: {
                            task: data?.listening.tasks[0],
                            id: data?.listening.id,
                        },
                    })
                    break
                case 'get_current_time_te':
                    set_table_current_time({
                        ...table_current_time,
                        ['unit' + data?.listening.unit]: {
                            task: data?.listening.tasks[0],
                            id: data?.listening.id,
                        },
                    })
                    break
                case 'get_listening_fl':
                    setFillinpsPlaying({
                        ...fillinpsPlaying,
                        ['unit' + data?.listening.unit]: {
                            task: data?.listening.tasks[0],
                            id: data?.listening.id,
                        },
                    })
                    break
                case 'get_current_time_fl':
                    set_fillinps_current_time({
                        ...fillinps_current_time,
                        ['unit' + data?.listening.unit]: {
                            task: data?.listening.tasks[0],
                            id: data?.listening.id,
                        },
                    })
                    break

                default:
                    break
            }
        },
        share: true,
        filter: isDocumentEvent,
        retryOnError: false,
        onClose: (e) => console.log(e),
        shouldReconnect: () => false,
    })

    const checkTab = (e) => {
        if (e.keyCode === 9) {
            // Добавляем отступ к инпуту или текстовой области
            e.preventDefault() // Предотвращаем дефолтное поведение Tab (переключение фокуса)
            // Вы можете установить свой собственный отступ
            const updatedValue = inps.chat + '\u00A0\u00A0\u00A0\u00A0' // Например, два пробела
            setInps({ ...inps, chat: updatedValue })
            chatRender({ ...inps, chat: updatedValue })
        }
    }

    const chatRender = (inps) => {
        sendJsonMessage({
            message: { ...inps, user },
            action: 'create_message',
            request_id: request_id,
        })
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState]

    const handleHtmlChange = (e) => {
        setInps({ ...inps, chat: e.target.value })
        chatRender({ ...inps, chat: e.target.value })
    }

    function sendNote() {
        let obj = Object.assign({
            body: inps.chat,
        })
        postNote(obj, note_id)
    }

    function handleMark(e) {
        let newValue = parseInt(e.target.value)
        const obj = {
            grade: newValue,
            user: userId,
            lesson: lesson.id,
        }
        setGrade(obj)
    }

    function checkMark(mark, handleOpen) {
        if (!mark.grade || mark.grade <= 0 || mark.grade > 10) {
            alert('Выставьте оценку от 1 до 10')
            return
        }
        sendMark(mark, handleOpen)
    }

    return (
        <>
            {connectionStatus === 'Closed' ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        width: '100%',
                        height: '70vh',
                    }}
                >
                    <div className="loader-wrapper" style={{ height: '60%' }}>
                        <div className="loader"></div>
                    </div>
                    <Button
                        onClick={() => {
                            window.location.reload()
                        }}
                        sx={{ width: '200px' }}
                        variant="contained"
                        color="success"
                    >
                        Retry
                    </Button>
                </div>
            ) : (
                <div
                    style={{
                        height: '95vh',
                        margin: '40px 20px 0 30px',
                        display: 'flex',
                    }}
                >
                    {!isLesson ? (
                        <div
                            style={{
                                width: '50vw',
                                height: '100%',
                                paddingRight: '25px',
                            }}
                        >
                            <div
                                className="loader-wrapper"
                                style={{ height: '80%' }}
                            >
                                <div className="loader"></div>
                            </div>
                        </div>
                    ) : (
                        <div
                            style={{
                                margin: '0 30px',
                                width: '70%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                overflowY: 'scroll',
                                paddingRight: '25px',
                            }}
                            className="cwScroll"
                        >
                            <Vocabulary
                                showVocab={showVocab}
                                setShowVocab={setShowVocab}
                                vocabTasks={vocabulary}
                            />
                            <ClassTasks
                                request_id={request_id}
                                lesson={lesson}
                                playing={playing}
                                sendJsonMessage={sendJsonMessage}
                                inps={inps}
                                setInps={setInps}
                                chatRender={chatRender}
                                current_time={current_time}
                                tablePlaying={tablePlaying}
                                table_current_time={table_current_time}
                                fillinpsPlaying={fillinpsPlaying}
                                fillinps_current_time={fillinps_current_time}
                                setShowVocab={setShowVocab}
                            />
                            {isTeacher() && (
                                <MarkCW
                                    checkMark={checkMark}
                                    handleMark={handleMark}
                                    grade={grade}
                                />
                            )}
                        </div>
                    )}
                    <div
                        style={{
                            width: '40%',
                            height: '100%',
                            minWidth: '300px',
                            marginRight: '20px',
                        }}
                    >
                        <div
                            style={{
                                height: '34%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Link
                                href={zoomLink}
                                target="_blank"
                                underline="none"
                            >
                                <Button color="warning">Zoom link</Button>
                            </Link>
                        </div>
                        <span>
                            The class is currently:{' '}
                            <span style={{ color: '#e29578' }}>
                                {connectionStatus}
                            </span>
                        </span>

                        <EditorProvider>
                            <Editor
                                containerProps={{
                                    style: {
                                        height: '40vh',
                                        maxHeight: '500px',
                                        width: '100%',
                                        maxWidth: '400px',
                                        overflowY: 'auto',
                                        position: 'relative',
                                    },
                                }}
                                value={inps.chat}
                                onKeyDown={checkTab}
                                onChange={handleHtmlChange}
                                disabled={!isTeacher()}
                            >
                                {isTeacher() && (
                                    <Toolbar
                                        style={{
                                            position: 'sticky',
                                            top: 0,
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                        }}
                                    >
                                        <BtnUndo />
                                        <BtnRedo />
                                        <Separator />
                                        <BtnBold />
                                        <BtnItalic />
                                        <BtnUnderline />
                                        <BtnStrikeThrough />
                                        <Separator />
                                        <Button
                                            sx={{ width: '29%' }}
                                            onClick={sendNote}
                                            color="success"
                                        >
                                            Send Note
                                        </Button>
                                    </Toolbar>
                                )}
                            </Editor>
                        </EditorProvider>
                    </div>
                </div>
            )}
        </>
    )
}

export default ClassWorkLayout
