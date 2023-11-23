import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React, { useEffect, useRef, useState } from 'react'
import { API } from '../../../helpers/consts'
import { isTeacher } from 'helpers/funcs'

const FlInps = ({
    task,
    inps,
    setInps,
    chatRender,
    taskId,
    sendJsonMessage,
    request_id,
    listeningId,
    fillinpsPlaying,
    fillinps_current_time,
}) => {
    const [str, setStr] = useState('')
    const [condition, setCondition] = useState('')

    useEffect(() => {
        setStr(task[0]?.description)
        setCondition(task[0]?.condition)
    }, [])

    const inputCount = str?.split('__inp__').length - 1

    const handleInputChange = (e, index, type, i = 0) => {
        if (type === 'textarea') {
            setInps({ ...inps, [`inp${task[0].id}_${index}`]: e.target.value })
            chatRender({
                ...inps,
                [`inp${task[0].id}_${index}`]: e.target.value,
            })
        } else if (type === 'input') {
            setInps({
                ...inps,
                [`inp${task[0].id}_${index}_${i}`]: e.target.value,
            })
            chatRender({
                ...inps,
                [`inp${task[0].id}_${index}_${i}`]: e.target.value,
            })
        }
    }

    // Audio
    const audioRef = useRef()

    const handleTogglePlayback = (booli = false) => {
        sendJsonMessage({
            action: 'is_playing',
            booli: booli,
            request_id: request_id,
            task_id: taskId,
        })
        sendJsonMessage({
            pk: listeningId,
            action: 'get_listening_fl',
            request_id: request_id,
        })
    }

    useEffect(() => {
        const { unit1, unit2 } = fillinpsPlaying
        if (listeningId === unit1.id) {
            const timeout = setTimeout(() => {
                audioRef.current[unit1.task.is_playing ? 'play' : 'pause']()
            }, 200)
            return () => clearTimeout(timeout)
        } else if (listeningId === unit2.id) {
            const timeout = setTimeout(() => {
                audioRef.current[unit2.task.is_playing ? 'play' : 'pause']()
            }, 200)
            return () => clearTimeout(timeout)
        }
    }, [fillinpsPlaying, listeningId])

    const changeTime = (currentTime) => {
        sendJsonMessage({
            action: 'set_current_time',
            current_time: currentTime,
            request_id: request_id,
            task_id: taskId,
        })
        sendJsonMessage({
            pk: listeningId,
            action: 'get_current_time_fl',
            request_id: request_id,
        })
    }

    useEffect(() => {
        if (listeningId === fillinps_current_time.unit1.id) {
            const timeout = setTimeout(() => {
                audioRef.current.currentTime =
                    +fillinps_current_time.unit1.task?.seeked
            }, 200)
            return () => clearTimeout(timeout)
        }
    }, [fillinps_current_time.unit1.task?.seeked, listeningId])

    useEffect(() => {
        if (listeningId === fillinps_current_time.unit2.id) {
            const timeout = setTimeout(() => {
                audioRef.current.currentTime =
                    +fillinps_current_time.unit2.task?.seeked
            }, 200)
            return () => clearTimeout(timeout)
        }
    }, [fillinps_current_time.unit2.task?.seeked, listeningId])

    return (
        <div className="fillinps">
            <h2>Fill inputs below</h2>
            {task[0]?.audio && (
                <Accordion
                    sx={{
                        boxShadow: 'none',
                        border: '1px solid #ef9042',
                        padding: '0 4px',
                        margin: '20px 0 15px',
                        borderRadius: '5px',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ padding: '0' }}
                    >
                        <h4
                            style={{
                                color: '#ef9042',
                                margin: '10px 24px 6px',
                            }}
                        >
                            Audio player
                        </h4>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: '0 8px 24px' }}>
                        <audio
                            src={API + task[0]?.audio}
                            controls={isTeacher() ? 'controls' : ''}
                            style={{ margin: '15px 0', width: '80%' }}
                            preload="auto"
                            ref={audioRef}
                            onPause={() => handleTogglePlayback(false)}
                            onPlay={() => handleTogglePlayback(true)}
                            onSeeked={(e) => {
                                changeTime(e.target.currentTime)
                            }}
                        />
                    </AccordionDetails>
                </Accordion>
            )}

            {task[0]?.images?.map((img, index) => (
                <img
                    key={index}
                    src={API + img.image}
                    style={{ width: img.size }}
                />
            ))}
            {condition?.split('\r\n').map((cond, index) => (
                <h4 style={{ margin: '12px 0' }} key={index}>
                    {cond}
                </h4>
            ))}

            {task[0].implemented_case === 'continue sentence' ? (
                <div className="fillinps__block">
                    {str?.split('\r\n').map((value, i) => {
                        return (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                }}
                            >
                                {value.split(' ').map((elem, index) => {
                                    if (elem === '__inp__') {
                                        return (
                                            <input
                                                key={index}
                                                style={{
                                                    marginRight: '4px',
                                                    width: 'auto',
                                                    paddingLeft: '8px',
                                                }}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        index,
                                                        'input',
                                                        i
                                                    )
                                                }
                                                value={
                                                    inps[
                                                        `inp${task[0].id}_${index}_${i}`
                                                    ] || ''
                                                }
                                            />
                                        )
                                    } else {
                                        return (
                                            <p
                                                key={index}
                                                style={{ margin: ' 4px' }}
                                            >
                                                {elem}
                                            </p>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>
            ) : (
                str?.split('__inp__').map((value, index) => {
                    if (str?.split('__inp__').length - 1 !== index) {
                        return (
                            <div className="fillinps__block" key={index}>
                                <p>{value}</p>
                                {index < inputCount && (
                                    <textarea
                                        onChange={(e) =>
                                            handleInputChange(
                                                e,
                                                index,
                                                'textarea'
                                            )
                                        }
                                        value={
                                            inps[`inp${task[0].id}_${index}`] ||
                                            ''
                                        }
                                    />
                                )}
                            </div>
                        )
                    }
                })
            )}
        </div>
    )
}
export default FlInps
