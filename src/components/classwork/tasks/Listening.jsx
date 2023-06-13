import React, { useEffect, useState } from 'react';
import { API } from '../../../helpers/consts';
import Audio from './Audio';

const Listening = ({
    task = [],
    playing,
    setPlaying,
    setAudioId,
    audioId,
    sendJsonMessage,
    request_id,
}) => {
    const [duration, setDuration] = useState(0);
    const [appTime, setAppTime] = useState(0);
    useEffect(() => {
        setAudioId((prev) => ({ ...prev, [task[0]?.id]: task[0]?.id }));
    }, []);
    return (
        <>
            <h2>Listening</h2>
            <div className="listening-box">
                <Audio
                    audioSource={API + task[0]?.audio}
                    playing={playing}
                    setPlaying={setPlaying}
                    sendJsonMessage={sendJsonMessage}
                    request_id={request_id}
                    task={task[0]}
                    is_playing={task[0].is_playing}
                />
                <div>
                    <p className="listening-text">{task[0].condition}</p>
                    {task[0].images?.map((image, index) => (
                        <img
                            key={index}
                            src={API + image.image}
                            width={image.size}
                            alt=""
                        />
                    ))}
                </div>
                {task[0]?.description.split('\r\n').map((text, index) => (
                    <p className="listening-text" key={index}>
                        {text}
                    </p>
                ))}
            </div>
        </>
    );
};

export default Listening;
