import React, { useEffect, useRef, useState } from 'react';
import { API } from '../../../helpers/consts';
import './Tasks.css';
import { isTeacher } from 'helpers/funcs';

const Table = ({
    task,
    inps,
    setInps,
    chatRender,
    tablePlaying,
    table_current_time,
    sendJsonMessage,
    request_id,
    listeningId,
    taskId,
}) => {
    const [tableProps, setTableProps] = useState({
        rows: task[0]?.description.split('\r\n')[0].split('x')[1],
        cells: task[0]?.description.split('\r\n')[0].split('x')[0],
    });

    const fillData = (data) => {
        while (data.length < tableProps.rows) {
            data.push('');
        }
        const res = data.map((elem) => {
            let temp = elem.split(' ');
            while (temp.length < tableProps.cells) {
                temp.push('');
            }
            return temp;
        });
        return res;
    };

    const [table, setTable] = useState({
        data: fillData(task[0]?.description.split('\r\n').slice(1)),
    });

    // Audio
    const audioRef = useRef();

    const handleTogglePlayback = (booli = false) => {
        sendJsonMessage({
            action: 'is_playing',
            booli: booli,
            request_id: request_id,
            task_id: taskId,
        });
        sendJsonMessage({
            pk: listeningId,
            action: 'get_listening_te',
            request_id: request_id,
        });
    };

    useEffect(() => {
        const { unit1, unit2 } = tablePlaying;
        if (listeningId === unit1.id) {
            const timeout = setTimeout(() => {
                audioRef.current[unit1.task.is_playing ? 'play' : 'pause']();
            }, 200);
            return () => clearTimeout(timeout);
        } else if (listeningId === unit2.id) {
            const timeout = setTimeout(() => {
                audioRef.current[unit2.task.is_playing ? 'play' : 'pause']();
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [tablePlaying, listeningId]);

    const changeTime = (currentTime) => {
        sendJsonMessage({
            action: 'set_current_time',
            current_time: currentTime,
            request_id: request_id,
            task_id: taskId,
        });
        sendJsonMessage({
            pk: listeningId,
            action: 'get_current_time_te',
            request_id: request_id,
        });
    };

    useEffect(() => {
        if (listeningId === table_current_time.unit1.id) {
            const timeout = setTimeout(() => {
                audioRef.current.currentTime =
                    +table_current_time.unit1.task?.seeked;
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [table_current_time.unit1.task?.seeked, listeningId]);

    useEffect(() => {
        if (listeningId === table_current_time.unit2.id) {
            const timeout = setTimeout(() => {
                audioRef.current.currentTime =
                    +table_current_time.unit2.task?.seeked;
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [table_current_time.unit2.task?.seeked, listeningId]);

    return (
        <>
            <h2>Table exercise</h2>
            <div className="table">
                {task[0]?.condition && (
                    <p style={{ margin: '10px 0' }}>{task[0]?.condition}</p>
                )}

                {task[0]?.audio && (
                    <audio
                        src={API + task[0]?.audio}
                        ref={audioRef}
                        controls={isTeacher() ? 'controls' : ''}
                        style={{ margin: '15px 0', width: '80%' }}
                        preload="auto"
                        onPause={() => handleTogglePlayback(false)}
                        onPlay={() => handleTogglePlayback(true)}
                        onSeeked={(e) => {
                            changeTime(e.target.currentTime);
                        }}
                    >
                        Your browser does not support the audio element.
                    </audio>
                )}

                {task[0].images?.map((image, index) => (
                    <img
                        key={index}
                        src={API + image.image}
                        style={{ width: '450px', margin: '4px 0' }}
                        alt=""
                    />
                ))}

                <table className="table_exercise">
                    <thead>
                        <tr>
                            {table.data[0].map((elem, index) => (
                                <th
                                    key={index}
                                    style={{
                                        height: '30px',
                                        wordWrap: 'break-word',
                                        maxHeight: '40px',
                                    }}
                                >
                                    {elem ? (
                                        elem.split('_').join(' ')
                                    ) : (
                                        <input
                                            className="table_inp"
                                            value={inps[`th${index}`] || ''}
                                            onChange={(e) => {
                                                setInps({
                                                    ...inps,
                                                    [`th${index}`]: `${e.target.value}`,
                                                });
                                                chatRender({
                                                    ...inps,
                                                    [`th${index}`]:
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.data.slice(1).map((elem, rowIndex) => (
                            <tr key={rowIndex}>
                                {elem.map((item, cellIndex) => (
                                    <td key={cellIndex}>
                                        {item ? (
                                            item.split('_').join(' ')
                                        ) : (
                                            <input
                                                className="table_inp"
                                                value={
                                                    inps[
                                                        `table_${task[0]?.id}`
                                                    ]?.[
                                                        `td${rowIndex}_${cellIndex}`
                                                    ] || ''
                                                }
                                                onChange={(e) => {
                                                    setInps({
                                                        ...inps,
                                                        [`table_${task[0]?.id}`]:
                                                            {
                                                                ...inps[
                                                                    `table_${task[0]?.id}`
                                                                ],
                                                                [`td${rowIndex}_${cellIndex}`]: `${e.target.value}`,
                                                            },
                                                    });
                                                    chatRender({
                                                        ...inps,
                                                        [`table_${task[0]?.id}`]:
                                                            {
                                                                ...inps[
                                                                    `table_${task[0]?.id}`
                                                                ],
                                                                [`td${rowIndex}_${cellIndex}`]: `${e.target.value}`,
                                                            },
                                                    });
                                                }}
                                            />
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;
