import React, { useEffect, useState } from 'react';
import Vocabulary from './tasks/Vocabulary';
import Listening from './tasks/Listening';
import Table from './tasks/Table';
import { Box } from '@mui/system';
import FlInps from './tasks/FlInps';
import Describing from './tasks/Describing';

const ClassTasks = ({
    lesson,
    playing,
    setPlaying,
    handleInputsChange,
    sendJsonMessage,
    inps,
    setInps,
    setTyping,
    setAudioId,
    audioId,
    request_id,
}) => {
    const renderTask = (task) => {
        switch (task.title.toLowerCase()) {
            case 'listening':
                return (
                    <Listening
                        task={task.tasks}
                        playing={playing}
                        setPlaying={setPlaying}
                        audioId={audioId}
                        setAudioId={setAudioId}
                        sendJsonMessage={sendJsonMessage}
                        request_id={request_id}
                    />
                );
            case 'table_exercise':
                return (
                    <Table
                        task={task.tasks}
                        handleInputsChange={handleInputsChange}
                        lesson={lesson}
                        sendJsonMessage={sendJsonMessage}
                        inps={inps}
                        setInps={setInps}
                        setTyping={setTyping}
                    />
                );
            case 'flinps':
                return (
                    <FlInps
                        task={task.tasks}
                        inps={inps}
                        setInps={setInps}
                        setTyping={setTyping}
                    />
                );
            case 'describing':
                return <Describing task={task.tasks} />;
            default:
                return <></>;
        }
    };

    const [tasksQuan, setTasksQuan] = useState(1); // unit 2 also
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (lesson.case_tasks) {
            setTasks(
                lesson?.case_tasks?.unit1
                    ?.concat(lesson?.case_tasks?.unit2)
                    .filter(({ title }) => title.toLowerCase() !== 'vocabulary')
            );
        }
    }, [lesson]);

    useEffect(() => {
        if (tasks.length) {
            setTasksQuan(tasks.length);
        }
    }, [tasks]);

    const handlePaginationBtn = (direction) => {
        if (
            (tasksQuan <= activePage && direction !== -1) ||
            (activePage <= 1 && direction !== 1)
        ) {
            return;
        }
        setActivePage(activePage + direction);
    };

    const [activePage, setActivePage] = useState(1);
    return (
        <>
            <div className="slider__container">
                <div className="slider__pagination">
                    <button
                        onClick={() => handlePaginationBtn(-1)}
                        disabled={activePage === 1 ? true : false}
                    >
                        &#8249;&#8249;
                    </button>
                    <h5>{activePage}</h5>
                    <button
                        onClick={() => handlePaginationBtn(1)}
                        disabled={activePage === tasksQuan ? true : false}
                    >
                        &#8250;&#8250;
                    </button>
                </div>
                {tasks?.map((task, ind) => (
                    <div
                        style={{ margin: '20px 0', width: '100%' }}
                        className={
                            activePage === ind + 1
                                ? 'slider__page slider__page_active'
                                : 'slider__page'
                        }
                        key={ind}
                    >
                        {renderTask(task)}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ClassTasks;
